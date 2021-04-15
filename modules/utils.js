import { PAGE_SIZE } from './config.js';

export function calculateIndex(pageNum, cnt) {
    return (pageNum - 1) * PAGE_SIZE + cnt + 1;
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

function getValueString(data, index) {
    if (!data || !data[index])
        return '';
    return data[index];
}

export function processModalFields(data) {
    return {
        id: getValueString(data, 0),
        name: getValueString(data, 1),
        surname: getValueString(data, 2),
        birthday_date: getValueString(data, 3),
        position: getValueString(data, 4),
        salary: getValueString(data, 5),
    }
}