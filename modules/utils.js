import { PAGE_SIZE } from './config.js';
import { tableDataTemplate } from '../templates/table-data.js';
import { actionsTemplate } from '../templates/actions.js';


function calculateIndex(pageNum, cnt) {
    return (pageNum - 1) * PAGE_SIZE + cnt + 1;
}

export function updateTable(newData, pageNum) {
    const htmlData = createTableBody(newData, pageNum);
    $('#table-body').replaceWith(htmlData);
}

export function createTableBody(data, pageNum = 1) {
    const bodyTemplate = _.template(tableDataTemplate);
    const rows = data.map((item, index) => {
        item.index = calculateIndex(pageNum, index);

        const actionOptions = {
            id: item.index,
            edit: 'edit',
            remove: 'remove',
        };

        item.actions = _.template(actionsTemplate)(actionOptions);
        return item;
    });

    return bodyTemplate({ rows });
}