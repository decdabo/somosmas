import { Link } from "react-router-dom";
import "../../styles/components/tableStyles.scss";
import "../../styles/components/formStyles.scss";
import "./UsersStyles.scss";
import { UsersTable } from "./UsersTable";
import { fetchUsers } from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export const UsersList = () => {
	const { usersReducer } = useSelector((state) => state);
	const history = useHistory();
	const searchQueryParam = new URLSearchParams(history.location.search).get(
		"search"
	);
	const [searchField, setSearchField] = useState("");
	const dispatch = useDispatch();

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
		<div>
			<header>
				<input
					placeholder="Search..."
					name="search-field"
					id="search-field"
					className="form__input"
					type="text"
					onChange={handleSearchField}
					defaultValue={searchQueryParam}
				/>
			</header>
			<div className="return">
				<Link className="return__button" to="/backoffice/users/create">
					Regresar
				</Link>
			</div>
			<UsersTable users={usersReducer} />
		</div>
	);
};
