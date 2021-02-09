import createTable from './modules/table.js';
import setupPagination from './modules/pagination.js';


function handleDocumentReady() {
    createTable();
    setupPagination();
    console.log('hello from handekeDocumentReady func');
}

$(document).ready(handleDocumentReady);