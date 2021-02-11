import createTable from './modules/table.js';
import setupPagination from './modules/pagination.js';
import createTopOptionsBlock from './modules/top-options.js';
import createModal from './modules/modal.js';


function handleDocumentReady() {
    createTopOptionsBlock();
    createTable();
    setupPagination();
    createModal();
}

$(document).ready(handleDocumentReady);