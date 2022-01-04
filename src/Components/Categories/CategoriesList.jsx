import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { alertError } from "../../Services/alerts/Alerts";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { CategoriesTable } from "./CategoriesTable";

export const CategoriesList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { categoriesData } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategories())
			.then((_) => {
				setIsLoading(false);
			})
			.catch(() => {
				alertError("No hay categorias disponibles");
			});
	}, []);

	return (
		<div className="backofficeLists__container">
			<h2 className="text__title-secondary">Lista de categorías</h2>
			<div className="backofficeLists__searchContainer">
				<Link to="/backoffice/categories/create">
					<button className="form__btn-secondary">
						Crear nueva categoría +
					</button>
				</Link>
			</div>

			{isLoading ? (
				<LoadingSpinner />
			) : categoriesData.data.length ? (
				categoriesData.data.map((item) => (
					<CategoriesTable category={item} key={item.id} />
				))
			) : (
				<div className="backofficeLists__emptyCard">No hay resultados...</div>
			)}
		</div>
	);
};
