import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Get, Delete } from "../../Services/privateApiService";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import SearchBar from "./SearchBar";
import { alertError } from "../../Services/alerts/Alerts";
import MemberCard from "./MemberCard";

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

	const handleDeleteMember = async (id) => {
		setMessage("");
		const response = await Delete(process.env.REACT_APP_API_MEMBERS, id);
		if (response.success) {
			setMembers((prevState) =>
				prevState.filter((activity) => +activity.id !== +id)
			);
		} else {
			alertError("Algo salió mal, intente nuevamente");
		}
	};

	useEffect(() => {
		fetchApiData();
	}, []);

	return (
		<div className="backofficeLists__container">
			<h2 className="text__title-secondary">Lista de miembros</h2>
			<div className="backofficeLists__searchContainer">
				<SearchBar setSerachResult={setMembers} />
				<Link to="/backoffice/members/create">
					<button className="form__btn-secondary">Crear nuevo miembro +</button>
				</Link>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : members.length ? (
				members.map((member) => (
					<MemberCard
						member={member}
						key={member.id}
						deleteMember={handleDeleteMember}
					/>
				))
			) : (
				<div className="backofficeLists__emptyCard">No hay resultados...</div>
			)}
			<div className={"form__message-success"}>{message}</div>
		</div>
	);
};

export default MembersList;
