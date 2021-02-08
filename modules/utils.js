export function addQueryParams(url, params) {
    let queryString = '';

    _.forOwn(params, (value, key) => {
        queryString += `${key}=${value}&`
    });

    return `${url}?${queryString.slice(0,-1)}`;
}

export function createTableBody(data) {
    const bodyTemplate = _.template(document.getElementById('table-data-template').innerHTML);
    const rows = data;

    return bodyTemplate({ rows });
}