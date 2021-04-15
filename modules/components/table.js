import { getEmployees } from '../service.js';
import { tableHeaderTemplate } from '../../templates/table-header.js';
import { tableDataTemplate } from '../../templates/table-data.js';
import { actionsTemplate } from '../../templates/actions.js'
import { calculateIndex, renderTemplate } from '../utils.js';
import openModal from './modal.js';

function getTableHeaderValues(data) {
    const mainFields = Object.keys(data[0]).slice(1);
    return ['#', ...mainFields, 'actions'];
}

function createTableHeader(data) {
    const items = getTableHeaderValues(data);
    return renderTemplate(tableHeaderTemplate, { items });
}

function updateTableData(newData, pageNum = 1) {
    const htmlData = createTableBody(newData, pageNum);
    $('#table-body').replaceWith(htmlData);
}

function createTableBody(data, pageNum = 1) {
    const rows = data.map((item, index) => {
        item.index = calculateIndex(pageNum, index);
        item.actions = renderTemplate(actionsTemplate, { employeeId: item._id });
        return item;
    });
    return renderTemplate(tableDataTemplate, { rows });
}

export function updateTable(pageNum) {
    getEmployees({ page_num: pageNum || $('#page-number').text() })
        .then(data => {
            if (pageNum)
                $('#page-number').html(pageNum);
            sessionStorage.setItem('totalCount', data.totalCount);
            updateTableData(data.employees, pageNum);
        })
        .catch(err => {
            console.log(err);
        });
}

export default async function createTable() {
    const tableObj = $('#employee-table');

    const tableData = await getEmployees();
    sessionStorage.setItem('totalCount', tableData.totalCount);

    const tableHeader = createTableHeader(tableData.employees);
    const tableBody = createTableBody(tableData.employees);

    tableObj.append(tableHeader);
    tableObj.append(tableBody);

    $('#salary').html(`
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="salary-switch">
        <label class="form-check-label" for="salary-switch">salary</label>
    </div>`);

    tableObj.on('click', openModal);
}