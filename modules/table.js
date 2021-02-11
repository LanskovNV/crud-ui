import { BASE_URL } from './config.js';
import { createTableBody } from './utils.js';
import { tableHeaderTemplate } from '../templates/table-header.js';
import openModal from './modal.js';


function createTableHeader(data) {
    const headerTemplate = _.template(tableHeaderTemplate);
    const items = Object.keys(data[0]);

    return headerTemplate({
        items: ['#', ...items, 'actons']
    });
}

async function fetchTableData() {
    const url = `${BASE_URL}/employees`;
    const options = {
        method: 'GET',
    };

    const response = await fetch(url, options);
    const tableData = await response.json();

    return tableData;
}

export default async function createTable() {
    const tableObj = $('#employee-table');

    const tableData = await fetchTableData();

    const tableHeader = createTableHeader(tableData);
    const tableBody = createTableBody(tableData);

    tableObj.append(tableHeader);
    tableObj.append(tableBody);
    tableObj.on('click', openModal);
}