import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Get, Delete } from "../../Services/privateApiService";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import SearchBar from "./SearchBar";
import "./MembersList.scss";
import { alertError } from "../../Services/alerts/Alerts";

const MembersList = () => {
	const [members, setMembers] = useState([]);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const fetchApiData = async () => {
		const response = await Get(process.env.REACT_APP_API_MEMBERS);
		if (response.success) {
			setMembers(response.data);
		}
		setIsLoading(false);
	};

	const handleDeleteActivity = async (id) => {
		setMessage("");
		const response = await Delete(process.env.REACT_APP_API_MEMBERS, id);
		if (response.success) {
			setMembers((prevState) =>
				prevState.filter((activity) => +activity.id !== +id)
			);
			setMessage("Eliminado exitosamente");
		} else {
			alertError("Algo salió mal, intente nuevamente");
		}
	};

	useEffect(() => {
		fetchApiData();
	}, []);

	return (
		<div className="membersList__container">
			<Link to="/backoffice/members/create" className="membersList__title">
				Create New Member +
			</Link>
			<SearchBar setSerachResult={setMembers} />
			{isLoading ? (
				<LoadingSpinner />
			) : members.length ? (
				<>
					<div>
						{members.map((member) => (
							<Fragment key={member.id}>
								<div className="membersList__card">
									<img
										className="membersList__image"
										src={member.image || ""}
										alt="descripcion"
										onError={(e) => {
											e.target.src =
												"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
										}}
									/>

									<div className="membersList__content">
										<div>{member.name}</div>
										<div className="membersList__btn-container">
											<Link to={`/backoffice/members/edit/${member.id}`}>
												<button className="form__btn-secondary">Editar</button>
											</Link>
											<button
												className="form__btn-secondary"
												onClick={() => handleDeleteActivity(member.id)}
											>
												Eliminar
											</button>
										</div>
									</div>
								</div>
							</Fragment>
						))}
					</div>
					<div className={"form__message-success"}>{message}</div>
				</>
			) : (
				<div>Sin resultados</div>
			)}
		</div>
	);
};

export default MembersList;
