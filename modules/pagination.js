import { addQueryParams, createTableBody } from './utils.js';
import { BASE_URL } from './config.js';


function updateTable(newData) {
    const htmlData = createTableBody(newData);
    $('#table-body').replaceWith(htmlData);
}

async function handleClick(isNext = false) {
    const pageNumDiv = $('#page-number');
    const pageNum = Number.parseInt(pageNumDiv.text());
    const newPageNum = isNext ? pageNum + 1 : pageNum - 1;

    const requestUrl = addQueryParams(`${BASE_URL}/employees`, { page_num: newPageNum });
    const oprions = {
        method: 'GET'
    };

    const newTableData = await fetch(requestUrl, oprions);
    const newDataJSON = await newTableData.json();

    updateTable(newDataJSON);
    pageNumDiv.html(newPageNum);
}


export default function setupPagination() {
    $('#previous-button').click(() => handleClick());
    $('#next-button').click(() => handleClick(true));
}