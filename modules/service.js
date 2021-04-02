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
    if (!params || Object.keys(params).length === 0) {
        return url;
    }
    let queryString = '';

    _.forOwn(params, (value, key) => {
        queryString += `${key}=${value}&`;
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

export async function putEmployee(id, payload) {
    const idString = _.toString(id).replace(/\s+/g, '');
    const url = `${BASE_URL}/employees/${idString}`;
    const headers = {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
    const options = {
        method: 'PUT',
        body: JSON.stringify(payload),
        mode: 'cors',
        headers
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    checkTokenStatus(responseData);

    return responseData;
}

export async function postEmployee(payload) {
    const url = `${BASE_URL}/employees`;
    const headers = {
        Authorization: `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    checkTokenStatus(responseData);

    return responseData;
}

export async function deleteEmployee(id) {
    const idString = _.toString(id).replace(/\s+/g, '');
    const url = `${BASE_URL}/employees/${idString}`;
    const headers = {
        Authorization: `bearer ${localStorage.getItem('token')}`,
    }
    const options = {
        method: 'DELETE',
        headers
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    checkTokenStatus(responseData);

    return responseData;
}

export function getToken(username, password) {
    const params = {
        username,
        password
    };
    const options = {
        method: 'GET',
        mode: 'cors',
    };
    const requestUrl = addQueryParams(`${BASE_URL}/auth`, params);

    fetch(requestUrl, options)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }
                });
        })
        .catch(err => {
            console.log(err);
        });
}

function checkTokenStatus(data) {
    if (data.output && data.output.statusCode === 401) {
        alert('Incorrect token, please login again!');
        localStorage.removeItem('token');
    }
}