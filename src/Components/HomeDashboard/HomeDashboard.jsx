import { useState } from "react";
import HomeCards from "../HomeCards/HomeCards";
import "./HomeDashboard.scss";
import cardsInfo from "../../lib/mock/BackofficeDashboard.json";

const HomeDashboard = () => {
	const [usuario, setUsuario] = useState("");

	return (
		<div className="dashboard__container">
			<h1 className="text__title-secondary">Bienvenido/a {usuario}</h1>
			<div className="dashboard-grid">
				{cardsInfo.map((card, index) => {
					return (
						<HomeCards
							title={card.title}
							image={card.image}
							key={index}
							description={card.description}
							link={card.link}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default HomeDashboard;
