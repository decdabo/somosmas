import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";

export const UsersTable = ({ user, deleteUser }) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async (id) => {
		setIsDeleting(true);
		await deleteUser(id);
		setIsDeleting(false);
	};
	return (
		<div className="backofficeLists__cardContainer">
			{isDeleting && (
				<CgSpinner className="spinner__circle backofficeLists__cardSpinner" />
			)}
			<img
				className="backofficeLists__cardImage"
				src={user.profile_image || ""}
				alt="descripcion"
				onError={(e) => {
					e.target.src =
						"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
				}}
				loading="lazy"
			/>
			<div className="backofficeLists__cardContent">
				<div>{user.name || ""}</div>
				<div>{user.email || ""}</div>

				<td className="backofficeLists__cardBtnsContainer">
					<Link to={`/backoffice/users/edit/${user.id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>
					<button
						className="form__btn-secondary"
						onClick={() => handleDelete(user.id)}
					>
						Eliminar
					</button>
				</td>
			</div>
		</div>
	);
};
