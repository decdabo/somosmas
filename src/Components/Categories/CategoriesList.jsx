import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertError } from "../../Services/alerts/Alerts";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { CategoriesTable } from "./CategoriesTable";

export const CategoriesList = () => {
	const { categoriesData } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategories()).catch(() => {
			alertError("No hay categorias disponibles");
		});
	}, []);

	return (
		<div>
			<div className="activities__list">
				<h1 className="py-8">Listado Categorias</h1>
				{categoriesData.data.length ? (
					<CategoriesTable category={categoriesData} />
				) : null}
			</div>
		</div>
	);
};
