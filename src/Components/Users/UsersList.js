import { Link } from "react-router-dom";
import "../../styles/components/tableStyles.scss";
import "./UsersStyles.scss";
import { UsersTable } from "./UsersTable";
import { fetchUsers } from "../../store/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const UsersList = () => {
	const { usersReducer } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div>
			<div className="return">
				<Link className="return__button" to="/backoffice/users/create">
          Regresar
				</Link>
			</div>
			{usersReducer.data.map((usersReducer, i) => {
				return <UsersTable users={usersReducer} key={i} />;
			})}
		</div>
	);
};
