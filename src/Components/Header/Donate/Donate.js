import React from "react";
import "./Donate.scss";
import { BiDonateHeart } from "react-icons/bi";
import { Link } from "react-router-dom";

function Donate() {
	return (
		<div>
			<Link to="/donar">
				<button className="donate__button">
					Donar
					<BiDonateHeart size="1.6rem" />
				</button>
			</Link>
		</div>
	);
}

export default Donate;
