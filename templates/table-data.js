export const tableDataTemplate = `
<tbody id='table-body'>
    <% rows.forEach(function(row) { %>
        <tr>
            <td>
                <%= row.index %>
            </td>
            <td>
                <%= row.id %>
            </td>
            <td>
                <%= row.name %>
            </td>
            <td>
                <%= row.surname %>
            </td>
            <td>
                <%= row.birthday_date %>
            </td>
            <td>
                <%= row.position %>
            </td>
            <td>
                <%= row.salary %>
            </td>
            <td>
                <%= row.actions %>
            </td>
        </tr>
    <% }); %>
</tbody>`;