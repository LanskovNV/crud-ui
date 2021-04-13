import createTable from './modules/components/table.js';
import createPagination from './modules/components/pagination.js';
import createTopOptionsBlock from './modules/components/top-options.js';


function handleDocumentReady() {
    createTopOptionsBlock();
    createTable();
    createPagination();
}

$(document).ready(handleDocumentReady);