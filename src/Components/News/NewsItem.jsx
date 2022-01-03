import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { alertError } from "../../Services/alerts/Alerts";
import { Delete } from "../../Services/privateApiService";
import { deleteNew } from "../../store/slices/newsSlice";
import LoaderComponent from "../Loader/Loader";

const NewsItem = ({ id, name, image, created_at }) => {
	const { date, time } = apiDateToText(created_at);
	const [deleting, setDeleting] = useState(false);
	const dispatch = useDispatch();
	const handleDelete = () => {
		setDeleting(true);
		Delete("news", id)
			.then(() => {
				dispatch(deleteNew({ id: id }));
			})
			.catch((err) => alertError(err));
	};

	return (
		<li className="list__item">
			<img className="item__image" src={image} alt={name} />
			<div className="item__group">
				<h3 className="item__title">{name}</h3>
				<p className="item__datetime">
					{date} {time}
				</p>
				<div className="flex align-center gap-20px">
					<Link to={`news/edit/${id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>

					{!deleting ? (
						<button onClick={handleDelete} className="form__btn-secondary">
							Remover
						</button>
					) : (
						<LoaderComponent />
					)}
				</div>
			</div>
		</li>
	);
};

export default NewsItem;
