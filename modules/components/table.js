import { createTableBody } from '../utils.js';
import { getEmployees } from '../service.js';
import { tableHeaderTemplate } from '../../templates/table-header.js';
import openModal from './modal.js';


function createTableHeader(data) {
    const headerTemplate = _.template(tableHeaderTemplate);
    const items = Object.keys(data[0]).slice(1);

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

    $('#salary').html(`
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="salary-switch">
        <label class="form-check-label" for="salary-switch">salary</label>
    </div>`)

    tableObj.on('click', openModal);
}