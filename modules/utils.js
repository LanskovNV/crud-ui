import { PAGE_SIZE } from './config.js';
import { tableDataTemplate } from '../templates/table-data.js';
import { actionsTemplate } from '../templates/actions.js';

function calculateIndex(pageNum, cnt) {
    return (pageNum - 1) * PAGE_SIZE + cnt + 1;
}

export function updateTable(newData, pageNum = 1) {
    const htmlData = createTableBody(newData, pageNum);
    $('#table-body').replaceWith(htmlData);
}

export function createTableBody(data, pageNum = 1) {
    const bodyTemplate = _.template(tableDataTemplate);
    const rows = data.map((item, index) => {
        item.index = calculateIndex(pageNum, index);

        item.actions = _.template(actionsTemplate)({ employeeId: item._id });
        return item;
    });

    return bodyTemplate({ rows });
}

export function checkTokenStatus(data) {
    if (data.output && data.output.statusCode === 401) {
        alert('Incorrect token, please login again!');
        localStorage.removeItem('token');
    }
}

export function getLocalToken() {
    return localStorage.getItem('token');
}

export function addQueryParams(url, params) {
    const urlObj = new URL(url);
    urlObj.search = new URLSearchParams(params).toString();
    return urlObj;
}

export function addFilters(params) {
    const newParams = params || {};

    const filterName = $('#filter-name').val();
    const filterSurname = $('#filter-surname').val();
    const salaryOrder = $('#salary-switch').prop('checked')

    if (filterName) {
        newParams.name = filterName;
    }
    if (filterSurname) {
        newParams.surname = filterSurname;
    }
    newParams.order = salaryOrder ? 1 : -1;

    return newParams;
}