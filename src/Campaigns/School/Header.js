import React from "react";
import LogoCampaña from "../../assets/images/LogoCmpañaEscolar.png";
import LogoONG from "../../assets/images/logo.png";
import "./Header.scss";

const Header = () => {
	return (
		<div className="headerSchool">
			<div className="headerSchool__logos">
				<img src={LogoCampaña} alt="" className="headerSchool__logoCampaña" />
				<img src={LogoONG} alt="" className="headerSchool__logoONG" />
			</div>
			<div className="headerSchool__slogan">
				<h3>Nuestra misión</h3>
				<p>
					Mejorar la calidad de vida de los niños y familias en situación de
					vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo a
					cada individuo a través de la educación, salud, trabajo, deporte,
					responsabilidad y compromiso
				</p>
			</div>
		</div>
	);
};

export default Header;
