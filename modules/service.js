import { BASE_URL } from './config.js';
import { checkTokenStatus, getLocalToken, addQueryParams, addFilters, handleRequest } from './utils.js';

export async function getEmployees(params) {
    const baseUrl = `${BASE_URL}/employees`;
    const queryParameters = addFilters(params);
    const url = addQueryParams(baseUrl, queryParameters);;
    const options = {
        method: 'GET',
    };

    return handleRequest(url, options);
}

export async function putEmployee(id, payload) {
    const url = `${BASE_URL}/employees/${id}`;
    const token = getLocalToken();
    const headers = {
        Authorization: `bearer ${token}`,
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
    const url = `${BASE_URL}/employees/${id}`;
    const token = getLocalToken();
    const headers = {
        Authorization: `bearer ${token}`,
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

export async function getToken(params) {
    const options = {
        method: 'GET',
        mode: 'cors',
    };
    const url = addQueryParams(`${BASE_URL}/auth`, params);

    const response = await fetch(url, options);
    const responseData = await response.json();
    if (responseData.token) {
        localStorage.setItem('token', responseData.token);
    }
}