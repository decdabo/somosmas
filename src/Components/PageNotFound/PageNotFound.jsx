import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

function PageNotFound() {
	return (
		<div className="notFound__container">
			<h1 className="notFound__first-title">404</h1>
			<i className="notFound__icon far fa-sad-cry"></i>
			<h2 className="notFound__second-title">Page Not Found</h2>
			<Link to="/" className="notFound__link">
				Volver al Inicio
			</Link>
		</div>
	);
}

export default PageNotFound;
