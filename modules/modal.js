import { authModalTemplate } from '../templates/auth-modal.js';
import { confirmModalTemplate } from '../templates/confirm-modal.js';
import { employeeModalTemplate } from '../templates/employee-modal.js';
import { getToken, getEmployees, putEmployee, postEmployee, deleteEmployee } from './service.js';
import { updateTable } from './utils.js';


function auth() {
    console.log('auth');
    const username = $('#modal-input-username').val();
    const password = $('#modal-input-password').val();

    getToken(username, password);
}

function getInputData() {
    return null;
}

function updateTableData() {
    getEmployees()
        .then(data => {
            updateTable(data);
        })
        .catch(err => {
            console.log(err);
        });
}

function createConfirmHandler() {
    return () => {
        const payload = getInputData();

        postEmployee(payload)
            .then(res => {
                console.log('employee created successfully');
            })
            .catch(err => {
                console.log(err);
            });
        closeModal();
        updateTableData();
    };
}

function updateConfirmHandler(id) {
    return id => {
        const payload = getInputData();

        putEmployee(payload)
            .then(res => {
                console.log('employee updated successfully');
            })
            .catch(err => {
                console.log(err);
            });
        closeModal();
        updateTableData();
    };
}

function deleteConfirmHandler(id) {
    return id => {
        deleteEmployee(id)
            .then(res => {
                console.log('employee deleted successfully');
            })
            .catch(err => {
                console.log(err);
            });
        closeModal();
        updateTableData();
    }
}

function updateModalContent(employeeId, modalType) {
    const token = localStorage.getItem('token');
    let confirmHandler = () => {};

    if (token) {
        let modalTemplate;

        switch (modalType) {
            case 'create':
                modalTemplate = _.template(employeeModalTemplate);
                confirmHandler = createConfirmHandler();
                break;
            case 'update':
                modalTemplate = _.template(employeeModalTemplate);
                confirmHandler = updateConfirmHandler(employeeId);
                break;
            case 'delete':
                modalTemplate = _.template(confirmModalTemplate);
                confirmHandler = deleteConfirmHandler(employeeId);
                break;
        }
        $('#modal-content').replaceWith(modalTemplate());
    } else {
        confirmHandler = auth;
        $('#modal-content').replaceWith(_.template(authModalTemplate)());
    }
    $('#handle-confirm').on('click', confirmHandler);
}

function showModal() {
    new bootstrap.Modal($('#static-backdrop')[0], { backdrop: 'static' }).show();
}

export default function openModal(event) {
    const targetButton = event.target.closest('button');

    if (targetButton) {
        const modalType = targetButton.getAttribute('id');
        const tableRow = event.target.closest('tr');
        let employeeId;

        if (tableRow) {
            employeeId = tableRow.children[1].innerHTML;
        }

        updateModalContent(employeeId, modalType);
        showModal();
    }
}