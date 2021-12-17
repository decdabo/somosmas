import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonLoader = ({ props }) => {
	return (
		<ContentLoader
			style={{ minHeight: "300px", minWidth: "300px" }}
			speed={1}
			backgroundColor="#e4e4e4"
			foregroundColor="#a9a9a9"
			{...props}
		>
			{/* <rect x="25" y="120" rx="3" ry="3" width="380" height="4" className="w-75"/> */}
			<rect x="0" y="0" rx="3" ry="3" height="110" className="w-100 h-75"/>
			<rect x="0" y="230" rx="3" ry="3" height="1" className="w-100"/>
			<rect x="35" y="238" rx="3" ry="3" width="380" height="4" className="w-75"/>
			<rect x="68" y="250" rx="3" ry="3" width="500" height="50" className="w-50"/>
		</ContentLoader>
	);
};
