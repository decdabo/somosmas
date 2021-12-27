import React from "react";
import { NavLink } from "react-router-dom";

export const AuthLogin = () => {
	return (
		<>
			<NavLink to="/login-form" exact>
				<button className="form__btn-tertiary">Login</button>
			</NavLink>
			<NavLink to="/register-form" exact>
				<button className="form__btn-secondary">Registrarse</button>
			</NavLink>
		</>
	);
};
