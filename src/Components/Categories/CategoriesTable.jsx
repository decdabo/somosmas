import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { alertError, alertInformation } from "../../Services/alerts/Alerts";
import { Delete } from "../../Services/privateApiService";

export const CategoriesTable = ({ category }) => {
	const handleDelete = async (id, category) => {
		const categoryDelete = await Delete("categories", category.id);

		if (categoryDelete.message) {
			alertInformation(categoryDelete.message);
		} else {
			alertError("La categoria no existe");
		}
	};

	return (
		<>
			<table className="table text-center">
				<thead>
					<tr className="table__rows">
						<th className="table__head">Nombre</th>
						<th className="table__head">Creado</th>
						<th className="table__head">Acciones</th>
					</tr>
				</thead>
				{category?.data.map((category, id) => (
					<tbody key={id}>
						<tr className="table__rows">
							<td className="v-align">{category.name || ""}</td>
							<td className="v-align">
								{apiDateToText(category.created_at).date || ""}
							</td>
							<td className="table__actions">
								<button
									className="table__buttons"
									onClick={() => handleDelete(id, category)}
								>
									<i className="fas fa-trash-alt" />
								</button>
								<Link
									to={`/edit-category/${category.id}`}
									className="table__buttons edit-button"
								>
									<i className="fas fa-edit"></i>
								</Link>
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</>
	);
};
