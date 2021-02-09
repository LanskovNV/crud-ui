import createTable from './modules/table.js';
import setupPagination from './modules/pagination.js';


function handleDocumentReady() {
    createTable();
    setupPagination();
}

$(document).ready(handleDocumentReady);