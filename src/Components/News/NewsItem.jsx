import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { Delete } from "../../Services/privateApiService";
import { fetchNews } from "../../store/slices/newsSlice";

const NewsItem = ({ id, name, image, created_at }) => {
	const { date, time } = apiDateToText(created_at);
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		setIsDeleting(true);
		const response = await Delete("news", id);
		if (response.success) {
			dispatch(fetchNews());
		}
	};

	return (
		<li className="backofficeLists__cardContainer">
			{isDeleting && (
				<CgSpinner className="spinner__circle backofficeLists__cardSpinner" />
			)}
			<img
				className="backofficeLists__cardImage"
				src={image || ""}
				alt={name}
				onError={(e) => {
					e.target.src =
						"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
				}}
			/>
			<div className="backofficeLists__cardContent">
				<div>{name}</div>
				<div>
					{date} {time}
				</div>

				<div className="backofficeLists__cardBtnsContainer">
					<Link to={`news/edit/${id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>

					<button
						onClick={handleDelete}
						className="form__btn-secondary"
						disabled={isDeleting}
					>
						Eliminar
					</button>
				</div>
			</div>
		</li>
	);
};

export default NewsItem;
