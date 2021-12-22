import FooterPublic from "../Footer/FooterPublic";
import HeaderWeb from "../Header/HeaderWeb";

import "./LayoutPublic.scss";

const LayoutPublic = ({ children }) => {
	return (
		<div>
			<HeaderWeb />
			<main className="layoutPublic__main">{children}</main>
			<FooterPublic />
		</div>
	);
};

export default LayoutPublic;
