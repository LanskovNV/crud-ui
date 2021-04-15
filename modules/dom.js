function getElem(id) {
    return $(`#${id}`);
}

export function getContent(id) {
    const elem = getElem(id);
    return elem.text();
}

export function setContent(id, text) {
    const elem = getElem(id);
    elem.html(text);
}

export function updateDOMElement(id, data) {
    const elem = getElem(id);
    elem.replaceWith(data);
}

export function appendChild(id, child) {
    const elem = getElem(id);
    elem.append(child);
}