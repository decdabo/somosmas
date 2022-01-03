import { useEffect, useState } from "react";
import { Get } from "../../Services/privateApiService";
import { Link } from "react-router-dom";
import linkedinIcon from "../../assets/images/linkedin.ico";
import twitterIcon from "../../assets/images/twitter.ico";
import instagramIcon from "../../assets/images/instagram.ico";
import facebookIcon from "../../assets/images/facebook.ico";
import "./FooterPublic.scss";
import useAuthActions from "../../store/hooks/useAuthActions";

const FooterPublic = () => {
	const [logo, setLogo] = useState("");
	const [facebook_url, setFacebook_url] = useState("");
	const [linkedin_url, setLinkedin_url] = useState("");
	const [instagram_url, setInstagram_url] = useState("");
	const [twitter_url, setTwitter_url] = useState("");

	const { getRoleId } = useAuthActions();

	const getInfoFooterPublic = async () => {
		const response = await Get(process.env.REACT_APP_API_ORGANIZATION);
		if (response.success) {
			const { data } = response;
			const { logo, facebook_url, linkedin_url, instagram_url, twitter_url } =
				data;
			setLogo(logo);
			setFacebook_url(facebook_url);
			setLinkedin_url(linkedin_url);
			setInstagram_url(instagram_url);
			setTwitter_url(twitter_url);
		}
	};

	useEffect(() => {
		getInfoFooterPublic();
	}, []);

	return (
		<div className="footer__container">
			<div className="footer__links">
				<Link to={"/actividades"}>Actividades</Link>
				<Link to={"/about"}>Nosotros</Link>
				{getRoleId() === 1 ? null : <Link to={"/contacto"}>Contacto</Link>}
			</div>
			<div className="flex-column-center logo-nombre">
				<Link to={"/"}>
					<img src={logo} alt="logo footer" className="footer__logo" />
				</Link>
			</div>
			<div className="footer__icons">
				<a href={`https://${facebook_url}`} target="_blank" rel="noreferrer">
					<img src={facebookIcon} alt="facebookIcon" className="footer__icon" />
				</a>
				<a href={`https://${linkedin_url}`} target="_blank" rel="noreferrer">
					<img src={linkedinIcon} alt="linkedinIcon" className="footer__icon" />
				</a>
				<a href={`https://${instagram_url}`} target="_blank" rel="noreferrer">
					<img
						src={instagramIcon}
						alt="instagramIcon"
						className="footer__icon"
					/>
				</a>
				<a href={`https://${twitter_url}`} target="_blank" rel="noreferrer">
					<img src={twitterIcon} alt="twitterIcon" className="footer__icon" />
				</a>
			</div>
		</div>
	);
};

export default FooterPublic;
