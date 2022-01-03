import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { alertError } from "../../Services/alerts/Alerts";
import { Get } from "../../Services/publicApiService";
import useAuthActions from "../../store/hooks/useAuthActions";
import LeafletMap from "../LeafletMap/LeafletMap";
import { Title } from "../Title/Title";
import somosMas from "../../assets/images/logo.png";
import "./Contact.scss";

const Contact = () => {
	const { getRoleId } = useAuthActions();

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
		<>
			{getRoleId() === 1 ? (
				<Redirect to="/" />
			) : (
				<div className="contact__container">
					<div className="container__flex">
						<Title title="Contacto" image={somosMas} />
						{contactData.address ? (
							<ul className="contact__list">
								<li className="list__item">
									<i className="fas fa-envelope"></i>
									somosmas@ong.com
								</li>
								<li className="list__item">
									<i className="fab fa-instagram"></i>
									{contactData.instagram_url}
								</li>
								<li className="list__item">
									<i className="fab fa-facebook-f"></i>
									{contactData.facebook_url}
								</li>
								<li className="list__item">
									<i className="fab fa-twitter"></i>
									{contactData.twitter_url}
								</li>
								<li className="list__item">
									<i className="fas fa-phone-alt"></i>
									{contactData.cellphone}
								</li>
							</ul>
						) : (
							<div>Loading...</div>
						)}
					</div>
					<LeafletMap />
				</div>
			)}
		</>
	);
};

export default Contact;
