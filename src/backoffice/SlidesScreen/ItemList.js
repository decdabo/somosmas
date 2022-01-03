import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";

export const ItemList = ({ data, deleteActivity, types = "Slides" }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const date = apiDateToText(data.updated_at).date;
	const order = data.order ? `Order: ${data.order}` : date;

	const handleDelete = async () => {
		setIsDeleting(true);
		await deleteActivity(data.id);
		setIsDeleting(false);
	};
	return (
		<div className="backofficeLists__cardContainer">
			{isDeleting && (
				<CgSpinner className="spinner__circle backofficeLists__cardSpinner" />
			)}
			<img
				className="backofficeLists__cardImage"
				src={data.image}
				alt={data.image}
			/>

			<div className="backofficeLists__cardContent">
				<div>{data.name}</div>
				<div>{order}</div>
				<div className="backofficeLists__cardBtnsContainer">
					<Link to={`/backoffice/${types}/edit/${data.id}`}>
						<button className="form__btn-secondary">Editar</button>
					</Link>
					<button onClick={handleDelete} className="form__btn-secondary">
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};
