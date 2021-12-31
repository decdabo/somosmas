import React from "react";
import "./slidehome.scss";

export const SlideComponent = ({ data }) => {
	return (
		<div className="slide__home">
			<img
				src={data.image || ""}
				className="slide__image"
				onError={(e) => {
					e.target.src =
						"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
				}}
			/>
			<p className="slide__text">{data.name}</p>
		</div>
	);
};
