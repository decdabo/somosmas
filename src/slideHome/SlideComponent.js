import React from "react";
import "./slidehome.scss";

export const SlideComponent = ({ data }) => {
	return (
		<div className="slide__home">
			<img src={data.image} className="slide__image" />
			<p className="slide__text">{data.name}</p>
		</div>
	);
};
