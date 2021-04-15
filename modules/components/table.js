import { getEmployees } from '../service.js';
import { tableHeaderTemplate } from '../../templates/table-header.js';
import { tableDataTemplate } from '../../templates/table-data.js';
import { actionsTemplate } from '../../templates/actions.js'
import { calculateIndex } from '../utils.js';
import openModal from './modal.js';


function createTableHeader(data) {
    const headerTemplate = _.template(tableHeaderTemplate);
    const items = Object.keys(data[0]).slice(1);

    return headerTemplate({
        items: ['#', ...items, 'actons']
    });
}

function updateTableData(newData, pageNum = 1) {
    const htmlData = createTableBody(newData, pageNum);
    $('#table-body').replaceWith(htmlData);
}

function createTableBody(data, pageNum = 1) {
    const bodyTemplate = _.template(tableDataTemplate);
    const rows = data.map((item, index) => {
        item.index = calculateIndex(pageNum, index);

        item.actions = _.template(actionsTemplate)({ employeeId: item._id });
        return item;
    });

    return bodyTemplate({ rows });
}

export function updateTable(pageNum) {
    getEmployees({ page_num: pageNum || $('#page-number').text() })
        .then(data => {
            updateTableData(data);
            if (pageNum) {
                $('#page-number').html(pageNum);
            }
        })
        .catch(err => {
            console.log(err);
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