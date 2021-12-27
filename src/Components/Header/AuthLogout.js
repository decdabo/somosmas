import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

export const AuthLogout = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem("token");
	};

	return (
		<NavLink onClick={handleLogout} to="/" exact>
			<button className="form__btn-secondary">Logout</button>
		</NavLink>
	);
};
