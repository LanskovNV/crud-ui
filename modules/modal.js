import { modalTemplate } from '../templates/modal.js';


export default function createModal() {
    const modalObj = $('#universal-modal');

    modalObj.append(_.template(modalTemplate)())
}