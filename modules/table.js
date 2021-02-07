import {BASE_URL} from './config.js';


function createTableHeader(data) {
    const headerTemplate = _.template(document.getElementById('table-header-template').innerHTML);
    const items = Object.keys(data[0]);

    return headerTemplate({ items });
}

function createTableBody(data) {
    const bodyTemplate = _.template(document.getElementById('table-data-template').innerHTML);
    const rows = data;

    return bodyTemplate({ rows });
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
}
