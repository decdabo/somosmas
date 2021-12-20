import React from "react";
import Header from "../../Components/Header/Header";
const LayoutBackoffice = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default LayoutBackoffice;
