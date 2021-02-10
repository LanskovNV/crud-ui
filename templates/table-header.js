export const tableHeaderTemplate = `
<thead>
    <tr class="table-warning">
        <% items.forEach(function(item) { %>
            <th scope="col">
                <%- item %>
            </th>
        <% }); %>
    </tr>
</thead>
`;