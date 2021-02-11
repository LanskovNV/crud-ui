import createTable from './modules/table.js';
import setupPagination from './modules/pagination.js';
import createTopOptionsBlock from './modules/top-options.js';


function handleDocumentReady() {
    createTopOptionsBlock();
    createTable();
    setupPagination();
}

$(document).ready(handleDocumentReady);