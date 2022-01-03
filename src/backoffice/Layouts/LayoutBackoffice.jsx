import React from "react";
import { Redirect } from "react-router-dom";
import Header from "../../Components/Header/Header";
import useAuthActions from "../../store/hooks/useAuthActions";
import "./LayoutBackoffice.scss";

const LayoutBackoffice = ({ children }) => {
	const { isLogged } = useAuthActions();
	if (!isLogged) {
		return <Redirect to="/" />;
	}
	return (
		<div className="layoutBackoffice__container">
			<Header />
			<main className="layoutBackoffice__main">{children}</main>
		</div>
	);
};

export default LayoutBackoffice;
