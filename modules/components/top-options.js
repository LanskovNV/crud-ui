import { filterInputTemplate } from '../../templates/filter-input.js';
import { optionsButtonTemplate } from '../../templates/options-button.js';
import openModal from './modal.js';
import { updateTable } from '../components/table.js';
import { renderTemplate } from '../utils.js';

export default function createTopOptionsBlock() {
    const topOptionsBlock = $("#top-options-block");

    const inputTemplate = _.template(filterInputTemplate);
    const nameInput = inputTemplate({
        id: 'filter-name',
        type: 'name',
        placeholder: 'Vasja',
        title: 'Name'
    });
    const surnameInput = inputTemplate({
        id: 'filter-surname',
        type: 'surname',
        placeholder: 'Pupkin',
        title: 'Surname'
    });

    const applyButtonHTML = renderTemplate(optionsButtonTemplate, {
        className: 'btn\ btn-outline-secondary',
        title: 'Apply'
    });
    const applyButton = $(applyButtonHTML);
    applyButton.on('click', () => updateTable(1));

    const addButtonHTML = renderTemplate(optionsButtonTemplate, {
        className: 'btn\ btn-success',
        title: 'Create'
    });
    const addButton = $(addButtonHTML);
    addButton.on('click', openModal);

    topOptionsBlock.append(nameInput);
    topOptionsBlock.append(surnameInput);
    topOptionsBlock.append(applyButton);
    topOptionsBlock.append(addButton);
}