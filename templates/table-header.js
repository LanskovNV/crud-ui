export const tableHeaderTemplate = `
<thead>
    <tr>
        <% items.forEach(function(item) { %>
            <th scope="col">
                <%- item %>
            </th>
        <% }); %>
    </tr>
</thead>
`;