export const UsersTable = ({ users }) => {
  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr className="table__rows">
            <th className="table__head">Name</th>
            <th className="table__head">Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users?.map((user, id) => (
          <tbody key={id}>
            <tr className="table__rows">
              <td>{user.name || ""}</td>
              <td>{user.email || ""}</td>
              <td className="table__actions">
                <button className="table__buttons">
                  Borrar
                </button>
                <button className="table__buttons">
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
