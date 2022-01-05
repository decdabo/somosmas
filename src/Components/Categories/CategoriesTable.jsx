import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { alertError, alertInformation } from "../../Services/alerts/Alerts";
import { Delete } from "../../Services/privateApiService";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import "./CategoriesTable.scss";

export const CategoriesTable = ({ category }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		setIsDeleting(true);
		const categoryDelete = await Delete("categories", category.id);

		if (categoryDelete.success) {
			dispatch(fetchCategories());
		}

		setIsDeleting(false);
	};

	return (
		<div className="categoriesList backofficeLists__cardContainer">
			{isDeleting && (
				<CgSpinner className="spinner__circle backofficeLists__cardSpinner" />
			)}
			{/* <img
				className="backofficeLists__cardImage"
				src={category.image || ""}
				alt="descripcion"
				onError={(e) => {
					e.target.src =
						"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
				}}
			/> */}
			<div className="backofficeLists__cardContent">
				<div>
					<div>
						<strong>{category.name}</strong>
					</div>
					<small>{apiDateToText(category.created_at).date}</small>
				</div>
				<div className="backofficeLists__cardBtnsContainer">
					<Link to={`/backoffice/categories/edit/${category.id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>
					<button
						className="form__btn-secondary"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};
