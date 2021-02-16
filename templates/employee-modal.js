export const employeeModalTemplate = `
<div id="modal-content" class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="form-floating mb-3">
            <input type="name" class="form-control" id="modal-input-name" placeholder="Name" value="<%- name %>">
            <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating mb-3">
            <input type="surname" class="form-control" id="modal-input-surname" placeholder="Surname" value="<%- surname %>">
            <label for="floatingInput">Surname</label>
        </div>
        <div class="form-floating mb-3">
            <input type="birthday-date" class="form-control" id="modal-input-birthday-date" placeholder="Birthday date" value="<%- birthday_date %>">
            <label for="floatingInput">Birthday date</label>
        </div>
        <div class="form-floating mb-3">
            <input type="position" class="form-control" id="modal-input-position" placeholder="Position" value="<%- position %>">
            <label for="floatingInput">Position</label>
        </div>
        <div class="form-floating">
            <input type="salary" class="form-control" id="modal-input-salary" placeholder="Salary" value="<%- salary %>">
            <label for="floatingInput">Salary</label>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="handle-confirm" type="button" data-bs-dismiss="modal" class="btn btn-primary">Apply</button>
    </div>
</div>`;