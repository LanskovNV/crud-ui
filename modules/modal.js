import { modalTemplate } from '../templates/modal.js';


function updateModalContent(employeeId, modalType) {

    console.log(modalType, employeeId);
    switch (modalType) {
        case 'auth':
            break;
        case 'create':
            break;
        case 'update':
            break;
        case 'delete':
            break;
    }
    $('#modal-content').replaceWith(_.template(modalTemplate)());
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