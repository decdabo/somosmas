import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemList } from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlides } from "../../store/slices/slidesSlice";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";
import { Delete } from "../../Services/privateApiService";
import { alertError } from "../../Services/alerts/Alerts";

export const ScreenSliderList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { slidesData } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleDelete = async (id) => {
		const deleteData = await Delete("slides", id);
		if (!deleteData.success) {
			alertError(deleteData.error);
		} else {
			dispatch(fetchSlides());
		}
	};

	useEffect(() => {
		dispatch(fetchSlides()).then((_) => setIsLoading(false));
	}, []);

	return (
		<div className="backofficeLists__container">
			<h2 className="text__title-secondary">Lista de slides</h2>

			<div className="backofficeLists__searchContainer">
				<Link to="/backoffice/Slides/create">
					<button className="form__btn-secondary">Crear nuevo +</button>
				</Link>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : slidesData.data.length ? (
				slidesData.data.map((data, i) => {
					return <ItemList key={i} data={data} deleteSlide={handleDelete} />;
				})
			) : (
				<div className="backofficeLists__emptyCard">No hay resultados...</div>
			)}

			<div></div>
		</div>
	);
};
