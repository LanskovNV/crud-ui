import { PAGE_SIZE } from './config.js';
import { tableDataTemplate } from '../templates/table-data.js';


export function addQueryParams(url, params) {
    let queryString = '';

    _.forOwn(params, (value, key) => {
        queryString += `${key}=${value}&`
    });

    return `${url}?${queryString.slice(0,-1)}`;
}

export function createTableBody(data, pageNum = 1) {
    const bodyTemplate = _.template(tableDataTemplate);
    const rows = data.map((item, index) => {
        item.index = (pageNum - 1) * PAGE_SIZE + index + 1;
        item.actions = '<i class="bi bi-pencil-square"></i><i class="bi bi-trash"></i>';
        return item;
    });

    return bodyTemplate({ rows });
}