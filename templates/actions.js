export const actionsTemplate = `
<div class="actions-block">
    <button type="button" class="btn btn-warning" onclick="openModal(<%= id %>, '<%- edit %>')">
        <i class="bi bi-pencil-square"></i>
    </button>
    <button type="button" class="btn btn-danger" onclick="openModal(<%= id %>, '<%- remove %>')">
        <i class="bi bi-trash"></i>
    </button>
</div>`;