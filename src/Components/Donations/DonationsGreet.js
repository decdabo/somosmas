import { Link } from "react-router-dom";
import "./styles/donations.scss";

export const DonationsGreet = ({
  title = "Se parte del cambio para las familias de La Cava",
}) => {
  return (
    <div className="donations-div">
      <h1> {title} </h1>
      <Link to="/gracias" className="donations-div-link">
        Mercado Pago
      </Link>
    </div>
  );
};
