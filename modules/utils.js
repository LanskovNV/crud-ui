import { PAGE_SIZE } from './config.js';

export function calculateIndex(pageNum, cnt) {
    return (pageNum - 1) * PAGE_SIZE + cnt + 1;
}

export function getCurrentPageSize(pageNum) {
    const totalCount = sessionStorage.getItem('totalCount');
    return totalCount - PAGE_SIZE * (pageNum - 1);
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

    const filter = $('#filter').val();
    const salaryOrder = $('#salary-switch').prop('checked')

    newParams.filter = filter.trim();
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

export function renderTemplate(templateString, data) {
    const template = _.template(templateString);
    return template(data);
}

function handleError(payload) {
    if (payload.statusCode === 401) {
        localStorage.removeItem('token');
    }
    throw Error(`${payload.statusCode} - ${payload.error}\n${payload.message}`);
}

export async function handleRequest(url, options) {
    try {
        const response = await fetch(url, options);
        const payload = await response.json();
        if (response.ok) {
            return payload;
        } else {
            handleError(payload);
        }
    } catch (error) {
        alert(error);
    }
}