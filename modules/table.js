import { createTableBody } from './utils.js';
import { getEmployees } from './service.js';
import { tableHeaderTemplate } from '../templates/table-header.js';
import openModal from './modal.js';


function createTableHeader(data) {
    const headerTemplate = _.template(tableHeaderTemplate);
    const items = Object.keys(data[0]);

    return headerTemplate({
        items: ['#', ...items, 'actons']
    });
}

export default async function createTable() {
    const tableObj = $('#employee-table');

    const tableData = await getEmployees();

    const tableHeader = createTableHeader(tableData);
    const tableBody = createTableBody(tableData);

    tableObj.append(tableHeader);
    tableObj.append(tableBody);
    tableObj.on('click', openModal);
}