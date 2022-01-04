import "./styles/donations.scss";
import mercadoPago from "../../assets/mercado-pago.svg";
import Arrow1 from "../../assets/images/arrow-1.png";
import Hand from "../../assets/images/hand-heart.png";

const DonationsGreet = ({
	title = "Se parte del cambio para las familias de La Cava",
}) => {
	return (
		<div className="donar__container">
			<h1 className="text__title-secondary"> {title} </h1>
			<div className="donar__links">
				<a
					href="https://mpago.la/2RW1MWq"
					className="donations-div-link"
					target="_blank"
					rel="noreferrer"
				>
					$100
					<img src={mercadoPago} />
				</a>
				<a
					href="https://mpago.la/2CUYssg"
					className="donations-div-link"
					target="_blank"
					rel="noreferrer"
				>
					$500
					<img src={mercadoPago} />
				</a>
				<a
					href="https://mpago.la/24eQKk4"
					className="donations-div-link"
					target="_blank"
					rel="noreferrer"
				>
					$1000
					<img src={mercadoPago} />
				</a>
				<a
					href="https://mpago.la/2epKeEX"
					className="donations-div-link"
					target="_blank"
					rel="noreferrer"
				>
					$2000
					<img src={mercadoPago} />
				</a>
				<a
					href="https://mpago.la/1xtazSs"
					className="donations-div-link"
					target="_blank"
					rel="noreferrer"
				>
					$5000
					<img src={mercadoPago} />
				</a>
			</div>

			<div className="donar__donateContainer">
				<img src={Arrow1} alt="curved arrow" className="donar__arrowImage" />
				<img src={Hand} alt="hand with a heart" className="donar__handImage" />
			</div>
		</div>
	);
};

export default DonationsGreet;
