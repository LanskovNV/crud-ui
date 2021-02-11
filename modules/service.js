import { BASE_URL } from './config.js';


function addFilters(params) {
    const newParams = params || {};

    const filterName = $('#filter-name').val();
    const filterSurname = $('#filter-surname').val();

    if (filterName) {
        newParams.name = filterName;
    }
    if (filterSurname) {
        newParams.surname = filterSurname;
    }

    return newParams;
}

function addQueryParams(url, params) {
    if (!params) {
        return url;
    }
    let queryString = '';

    _.forOwn(params, (value, key) => {
        queryString += `${key}=${value}&`
    });

    return `${url}?${queryString.slice(0,-1)}`;
}

export async function getEmployees(queryParams) {
    const url = `${BASE_URL}/employees`;
    const options = {
        method: 'GET',
    };

    const params = addFilters(queryParams);
    const requestUrl = addQueryParams(url, params);
    const response = await fetch(requestUrl, options);
    const tableData = await response.json();

    if (tableData.isBoom) {
        return [];
    }

    return tableData;
}