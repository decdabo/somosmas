import FooterPublic from "../Footer/FooterPublic";

import "./LayoutPublic.scss";

const LayoutPublic = ({ children }) => {
	return (
		<div>
			<div className="layoutPublic__temp-header">TEMP HEADER</div>
			<main className="layoutPublic__main">{children}</main>
			<FooterPublic />
		</div>
	);
};

export default LayoutPublic;
