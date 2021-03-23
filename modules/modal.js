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
        salary: Number.parseInt($('#modal-input-salary').val(), 10),
    };

    return data;
}

function updateTableData(pageNum) {
    getEmployees({ page_num: pageNum || $('#page-number').text() })
        .then(data => {
            updateTable(data);
            if (pageNum) {
                $('#page-number').html(pageNum);
            }
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
                updateTableData(1);
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

function updateModalContent(employeeData, modalType) {
    const token = localStorage.getItem('token');
    let confirmHandler = () => {};

    if (token) {
        let modalTemplate;
        const employeeId = employeeData && employeeData[0];

        const templateData = {
            id: employeeId,
            name: employeeData && employeeData[1] || '',
            surname: employeeData && employeeData[2] || '',
            birthday_date: employeeData && employeeData[3] || '',
            position: employeeData && employeeData[4] || '',
            salary: employeeData && employeeData[5] || '',
        };

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
        $('#modal-content').replaceWith(modalTemplate(templateData));
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
        let employeeData;

        if (tableRow) {
            employeeData = _.toArray(tableRow.children).slice(1, -1).map(ch => ch.innerHTML.trim());
            employeeData.unshift(targetButton.getAttribute('employee_id'));
        }

        updateModalContent(employeeData, modalType);
        showModal();
    }
}