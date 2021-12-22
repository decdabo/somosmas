import { Link } from "react-router-dom";
import { alertError, alertInformation } from "../../Services/alerts/Alerts";
import { Delete } from "../../Services/privateApiService";

export const UsersTable = ({ users }) => {

	const handleDelete = async ( user) => {
		const userDelete = await Delete("users", user.id);

		if (userDelete.message) {
			alertInformation(userDelete.message);
        
		} else { 
			alertError("El usuario no existe");

		}
	};

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
				{users?.data.map((user, id) => (
					<tbody key={id}>
						<tr className="table__rows">
							<td>{user.name || ""}</td>
							<td>{user.email || ""}</td>
							<td className="table__actions">
								<button
									className="table__buttons"
									onClick={() => handleDelete(user)}
								>
									<i className="fas fa-trash-alt" />
								</button>
								<Link
									to={`/edit-user/${user.id}`}
									className="table__buttons edit-button"
								>
									<i className="fas fa-edit"></i>
								</Link>
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};
