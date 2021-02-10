import { addQueryParams, createTableBody } from './utils.js';
import { BASE_URL } from './config.js';
import { paginationTemplate } from '../templates/pagination.js';

const paginationButtons = [{
        id: 'previous-button',
        title: 'Previous',
        onClick: () => handleClick(),
    },
    {
        id: 'page-number',
        title: '1',
        onClick: null,
        options: 'disabled="true"',
    },
    {
        id: 'next-button',
        title: 'Next',
        onClick: () => handleClick(true),
    },
];

function updateTable(newData, pageNum) {
    const htmlData = createTableBody(newData, pageNum);
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

    updateTable(newDataJSON, newPageNum);
    pageNumDiv.html(newPageNum);
}

function createPagination() {
    const paginationTempl = _.template(paginationTemplate);
    console.dir(paginationTempl({ items: paginationButtons }))
    $('#pagination').append(paginationTempl({ items: paginationButtons }));
}

export default function setupPagination() {
    createPagination();

    paginationButtons.forEach(button => {
        if (button.onClick) {
            $(`#${button.id}`).click(button.onClick);
        }
    });
}