import { Link } from "react-router-dom";
import "../../utils.scss";
import "./HomeCards.scss";

const HomeCards = ({ title, image, link }) => {
	return (
		<Link to={link} className="dashboardCard__container">
			<h3 className="text__title-tertiary">{title}</h3>
			<i className={image}></i>
		</Link>
	);
};
export default HomeCards;
