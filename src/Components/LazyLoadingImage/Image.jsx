import React from "react";

const Image = ({ url, description, width = "" }) => {
	return (
		<img
			src={url}
			alt={description}
			loading="lazy"
			height={width === "full" ? "300" : null}
			className={width === "full" ? "w-100 object-fit-cover" : "image-300px"}
		/>
	);
};

export default Image;
