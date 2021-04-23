import { filterInputTemplate } from '../../templates/filter-input.js';
import { optionsButtonTemplate } from '../../templates/options-button.js';
import openModal from './modal.js';
import { updateTable } from '../components/table.js';
import { renderTemplate } from '../utils.js';

export default function createTopOptionsBlock() {
    const topOptionsBlock = $("#top-options-block");

    const filterInput = renderTemplate(filterInputTemplate, {
        id: 'filter',
        type: 'filter',
        placeholder: 'search word',
        title: 'name or surname search string'
    });

    const addButtonHTML = renderTemplate(optionsButtonTemplate, {
        className: 'btn\ btn-success',
        title: 'Create'
    });
    const addButton = $(addButtonHTML);
    addButton.on('click', openModal);

    topOptionsBlock.append(filterInput);
    topOptionsBlock.append(addButton);

    $('#filter').change(() => {
        updateTable();
    })
}