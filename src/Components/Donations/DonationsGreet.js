import "./styles/donations.scss";
import mercadoPago from "../../assets/mercado-pago.svg";

const DonationsGreet = ({
	title = "Se parte del cambio para las familias de La Cava",
}) => {
	return (
		<div>
			<h1 className="txt-center"> {title} </h1>
			<div className="d-flex justify-content-around my-5">
				<div>
					<a
						href="https://mpago.la/2RW1MWq"
						className="donations-div-link"
						target="_blank"
						rel="noreferrer"
					>
						$100
						<img src={mercadoPago} />
					</a>
				</div>
				<div>
					<a
						href="https://mpago.la/2CUYssg"
						className="donations-div-link"
						target="_blank"
						rel="noreferrer"
					>
						$500
						<img src={mercadoPago} />
					</a>
				</div>
				<div>
					<a
						href="https://mpago.la/24eQKk4"
						className="donations-div-link"
						target="_blank"
						rel="noreferrer"
					>
						$1000
						<img src={mercadoPago} />
					</a>
				</div>
				<div>
					<a
						href="https://mpago.la/2epKeEX"
						className="donations-div-link"
						target="_blank"
						rel="noreferrer"
					>
						$2000
						<img src={mercadoPago} />
					</a>
				</div>

				<div>
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
			</div>
		</div>
	);
};

export default DonationsGreet;
