import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";

import "../../styles/components/listStyles.scss";
import { alertError } from "../../Services/alerts/Alerts";
import { fetchNews } from "../../store/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import NewsSearchBar from "./NewsSearchBar.jsx";

const NewsList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { newsData } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNews()).then((_) => {
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (newsData.error) {
			alertError("Algo salió mal, intente nuevamente");
		}
	}, [newsData.error]);

	return (
		<div className="backofficeLists__container">
			<h2 className="text__title-secondary">Lista de novedades</h2>
			<div className="backofficeLists__searchContainer">
				<NewsSearchBar />
				<Link to={"news/create"}>
					<button className="form__btn-secondary">Crear nueva novedad +</button>
				</Link>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : newsData.data.length ? (
				[...newsData.data]
					.sort((a, b) => {
						return new Date(b.updated_at) - new Date(a.updated_at);
					})
					.map((item) => <NewsItem {...item} key={item.id} />)
			) : (
				<div className="backofficeLists__emptyCard">No hay resultados...</div>
			)}
		</div>
	);
};

export default NewsList;
