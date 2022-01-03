import React, { useState, useEffect } from "react";
import somosMasLogo from "../../assets/images/logo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Get } from "../../Services/publicApiService";
import { alertError } from "../../Services/alerts/Alerts";
import wwwToHttpsLink from "../../helpers/wwwToHttpsLink";
import { Link } from "react-router-dom";

const Footer = () => {
	const [social, setSocial] = useState({});
	const getContactData = async () => {
		const response = await Get("organization");
		if (response.success) {
			setSocial(response.data);
		} else {
			alertError(JSON.stringify(response.error.message));
		}
	};

	useEffect(() => {
		getContactData();
	}, []);

	return (
		<footer className="school__footer">
			<div className="footer__logo">
				<img src={somosMasLogo} alt="Somas mas logo" loading="lazy" />
				<div className="logo__onglink">
					<Link to="/">Visita somos mas</Link>
				</div>
			</div>
			<div className="footer__social">
				<a
					href={wwwToHttpsLink(social.instagram_url)}
					target="_blank"
					rel="noreferrer noopener"
					className="social__item"
				>
					<FaInstagram className="item__logo" />
					<p className="item__name">{social.instagram_url}</p>
				</a>
				<a
					href={wwwToHttpsLink(social.facebook_url)}
					target="_blank"
					rel="noreferrer noopener"
					className="social__item"
				>
					<FaFacebook className="item__logo" />
					<p className="item__name">{social.facebook_url}</p>
				</a>
				<a
					href={wwwToHttpsLink(social.twitter_url)}
					target="_blank"
					rel="noreferrer noopener"
					className="social__item"
				>
					<IoLogoTwitter className="item__logo" />
					<p className="item__name">{social.twitter_url}</p>
				</a>
			</div>
			<div className="footer__campaigns">
				<h3>Campañas</h3>
				<ul>
					<li>
						<Link to="/toys-campaign">Campaña de jueguetes</Link>
					</li>
					<li>
						<Link to="/school-campaign">Campaña de escuela</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
