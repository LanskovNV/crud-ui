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
    const data = {
        name: $('#modal-input-name').val(),
        surname: $('#modal-input-surname').val(),
        birthday_date: $('#modal-input-birthday-date').val(),
        position: $('#modal-input-position').val(),
        salary: $('#modal-input-salary').val(),
    };

    return data;
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
                updateTableData();
            })
            .catch(err => {
                console.log(err);
            });
    };
}

function updateConfirmHandler(id) {
    return () => {
        const payload = getInputData();

        putEmployee(id, payload)
            .then(res => {
                console.log('employee updated successfully');
                updateTableData();
            })
            .catch(err => {
                console.log(err);
            });
    };
}

function deleteConfirmHandler(id) {
    return () => {
        deleteEmployee(id)
            .then(res => {
                console.log('employee deleted successfully');
                updateTableData();
            })
            .catch(err => {
                console.log(err);
            });
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
        $('#modal-content').replaceWith(modalTemplate({ id: employeeId }));
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