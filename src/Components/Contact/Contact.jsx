import { useEffect, useState } from "react";
import { alertError } from "../../Services/alerts/Alerts";
import { Get } from "../../Services/publicApiService";
import LeafletMap from "../LeafletMap/LeafletMap";
import { Title } from "../Title/Title";

import "./Contact.scss";

const Contact = () => {
	const [contactData, setContactData] = useState({
		cellphone: "",
		facebook_url: "",
		instagram_url: "",
		twitter_url: "",
		address: "",
	});

	const getContactData = async () => {
		const response = await Get("organization", 4);
		if (response.success) {
			setContactData(response.data);
		} else {
			alertError(JSON.stringify(response.error.message));
		}
	};

	useEffect(() => {
		getContactData();
	}, []);

	return (
		<div className="contact__container">
			<Title title="Contacto" />
			{contactData.address ? (
				<div>
					<div>
						<i className="fas fa-envelope"></i>
						{contactData.address}
					</div>
					<div>
						<i className="fab fa-instagram"></i>
						{contactData.instagram_url}
					</div>
					<div>
						<i className="fab fa-facebook-f"></i>
						{contactData.facebook_url}
					</div>
					<div>
						<i className="fab fa-twitter"></i>
						{contactData.twitter_url}
					</div>
					<div>
						<i className="fas fa-phone-alt"></i>
						{contactData.cellphone}
					</div>

					<LeafletMap />
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default Contact;
