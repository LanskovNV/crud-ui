import { updateTable } from '../components/table.js';
import { paginationTemplate } from '../../templates/pagination.js';
import { PAGE_SIZE } from '../config.js';
import { getCurrentPageSize } from '../utils.js';

const paginationButtons = [{
        id: 'previous-button',
        title: 'Previous',
        onClick: () => handleClick(),
        options: 'disabled="true"',
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
        onClick: () => handleClick(true)
    },
];

async function handleClick(isNext = false) {
    const pageNumDiv = $('#page-number');
    const pageNum = Number.parseInt(pageNumDiv.text());
    const newPageNum = isNext ? pageNum + 1 : pageNum - 1;

    updateTable(newPageNum);
}

export default function createPagination() {
    const paginationTempl = _.template(paginationTemplate);
    $('#pagination').append(paginationTempl({ items: paginationButtons }));

    paginationButtons.forEach(button => {
        if (button.onClick) {
            $(`#${button.id}`).click(button.onClick);
        }
    });

    $('#employee-table').on('DOMSubtreeModified', () => {
        const pageNum = Number.parseInt($('#page-number').text());
        if (pageNum === 1) {
            $('#previous-button').prop('disabled', true);
        } else if ($('#previous-button').prop('disabled')) {
            $('#previous-button').prop('disabled', false);
        }
        if (getCurrentPageSize(pageNum) <= PAGE_SIZE) {
            $('#next-button').prop('disabled', true);
        } else if ($('#next-button').prop('disabled')) {
            $('#next-button').prop('disabled', false);
        }
    });
}