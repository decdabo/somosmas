import "./ToysCampaing.scss";
import Toy1 from "../../assets/images/toys/1.png";
import Toy2 from "../../assets/images/toys/2.png";
import Toy3 from "../../assets/images/toys/3.png";
import Toy4 from "../../assets/images/toys/4.png";
import Toy5 from "../../assets/images/toys/5.png";
import Toy6 from "../../assets/images/toys/6.png";
import KidsImage from "../../assets/images/kids.png";
import ToysBackground from "../../assets/images/toys-content.jpg";
import { ReactComponent as WavesRed } from "../../assets/waves-red.svg";
import { ReactComponent as WavesBlue } from "../../assets/waves-blue.svg";
import "../../Components/Footer/FooterPublic.scss";
import { useEffect, useState } from "react";
import FooterPublic from "../../Components/Footer/FooterPublic";
import Slider from "./Slider";
import Header from "./Header";

// -------------timer---------------

const CountDownTimer = () => {
	// timer to 31 december at 17:30
	const remainingTime = (+new Date("2021-12-31T17:30:59") - +new Date()) / 1000;

	const [time, setTime] = useState(remainingTime);

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime((prevState) => prevState - 1);
		}, 1000);
		return () => clearInterval(timerId);
	});

	// format seconds to DD HH:MM:SS
	const formatTime = (seconds) => {
		const days = Math.floor(seconds / 86400);
		seconds = seconds % 86400;
		const hours = Math.floor(seconds / 3600);
		seconds = seconds % 3600;
		const minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;

		return `${days} DÍAS Y ${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toFixed(0).toString().padStart(2, "0")}`;
	};

	return <div>{formatTime(time)}</div>;
};

// ------------component-----------------

const ToysCampaign = () => {
	return (
		<>
			<Header />
			<div className="toys__container">
				<div className="toys__title">
					<div>Colecta de juguetes</div>
					<div className="toys__title-images">
						<img src={Toy1} alt="toy icon 1" />
						<img src={Toy2} alt="toy icon 2" />
						<img src={Toy3} alt="toy icon 3" />
						<img src={Toy4} alt="toy icon 4" />
						<img src={Toy5} alt="toy icon 5" />
						<img src={Toy6} alt="toy icon 6" />
					</div>
				</div>
				<WavesBlue className="toys__waves-blue" />
				<div className="toys__content">
					<div>
						<div>Trae tu donativo</div>
						<div className="toys__date">30 de Diciembre</div>
						<div className="toys__hour">17:30 horas</div>
						<div className="toys__place">Sede SomosMas</div>
						<div className="toys__counter">
							<CountDownTimer />
						</div>
					</div>

					<div className="toys__images-container">
						<img src={KidsImage} alt="kids" />
					</div>
				</div>
				<Slider />

				<img src={ToysBackground} alt="background" />
				<WavesRed className="toys__waves-red" />
			</div>
			<FooterPublic />
		</>
	);
};

export default ToysCampaign;
