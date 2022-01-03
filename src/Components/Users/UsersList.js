import { Link } from "react-router-dom";
import "../../styles/components/tableStyles.scss";
import "../../styles/components/formStyles.scss";
import "./UsersStyles.scss";
import { UsersTable } from "./UsersTable";
import { fetchUsers } from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Delete } from "../../Services/privateApiService";
import { alertError } from "../../Services/alerts/Alerts";

export const UsersList = () => {
	const { usersReducer } = useSelector((state) => state);
	const history = useHistory();
	const searchQueryParam = new URLSearchParams(history.location.search).get(
		"search"
	);
	const [searchField, setSearchField] = useState("");
	const dispatch = useDispatch();

	const handleDelete = async (id) => {
		const userDelete = await Delete("users", id);
		if (userDelete.success) {
			dispatch(fetchUsers({ searchQueryParam, limit: 100 }));
		} else {
			alertError("El usuario no existe");
		}
	};

	useEffect(() => {
		dispatch(
			fetchUsers({
				search: searchField || searchQueryParam,
				limit: 100,
			})
		);
	}, [searchField]);

	const handleSearchField = (e) => {
		setSearchField(e.target.value);
	};

	return (
		<div className="backofficeLists__container">
			<h2 className="text__title-secondary">Lista de usuarios</h2>
			<div className="search__container">
				<input
					placeholder="Buscar..."
					name="search-field"
					id="search-field"
					type="text"
					onChange={handleSearchField}
					defaultValue={searchQueryParam}
				/>
				<i className="fas fa-search"></i>
			</div>
			{usersReducer.loading ? (
				<LoadingSpinner />
			) : usersReducer.data.length ? (
				usersReducer.data.map((user) => (
					<UsersTable key={user.id} user={user} deleteUser={handleDelete} />
				))
			) : (
				<div className="backofficeLists__emptyCard">No hay resultados...</div>
			)}
		</div>
	);
};
