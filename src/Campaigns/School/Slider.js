import React from "react";
import Slides from "react-slick";

import "./SchoolCampaign.scss";

import slide1 from "../../assets/images/school/1.jpg";
import slide2 from "../../assets/images/school/2.jpg";
import slide3 from "../../assets/images/school/3.jpg";

const Slider = () => {
	const settings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		ease: "linear",
		fade: true,
	};

	return (
		<div className="school__container slide">
			<Slides {...settings}>
				<div className="slide__container">
					<img src={slide1} alt="" className="slide__image" />
					<q className="slide__quote">
						El equipo planificando las proximas colectas
					</q>
				</div>
				<div className="slide__container">
					<img src={slide2} alt="" className="slide__image" />
					<q className="slide__quote">
						Los chicos jugando durante las actividades recreativas!
					</q>
				</div>
				<div className="slide__container">
					<img src={slide3} alt="" className="slide__image" />
					<q className="slide__quote">
						El arte tambien tiene su espacio en Somos Mas!
					</q>
				</div>
			</Slides>
		</div>
	);
};

export default Slider;
