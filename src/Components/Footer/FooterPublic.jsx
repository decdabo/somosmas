import { useEffect, useState } from "react";
import { Get } from "../../Services/privateApiService";
import { Link } from "react-router-dom";
import linkedinIcon from "../../assets/images/linkedin.ico"
import twitterIcon from "../../assets/images/twitter.ico"
import instagramIcon from "../../assets/images/instagram.ico"
import facebookIcon from "../../assets/images/facebook.ico"
import "./FooterPublic.scss"

const FooterPublic = () => {
    const [logo, setLogo] = useState("");
    const [facebook_url, setFacebook_url] = useState("");
    const [linkedin_url, setLinkedin_url] = useState("");
    const [instagram_url, setInstagram_url] = useState("");
    const [twitter_url, setTwitter_url] = useState("");

    const getInfoFooterPublic = () => {
        Get("organization").then(r => {
            const {data} = r
            const {
                logo,
                facebook_url,
                linkedin_url,
                instagram_url,
                twitter_url
            } = data;
            setLogo(logo)
            setFacebook_url(facebook_url)
            setLinkedin_url(linkedin_url)
            setInstagram_url(instagram_url)
            setTwitter_url(twitter_url)
        })
    }


    useEffect(() => {
        getInfoFooterPublic()
    }, []);


    return (
        <div className="footer">
            <div className="footer__grid">
                <div className="flex-column-center logo-nombre">
                    <Link to={ "/" } >
                        <img src={ logo } alt="logo_footer"/>
                    </Link>
                </div>
                <div className="campanas">
                    <Link to={ '/toys-campaign' } className="footer__grid__hide show-tv"> Actividades</Link>
                    <Link to={ '/toys-campaign' } className="footer__grid__hide show-tv"> Nosotros</Link>
                    <Link to={ '/toys-campaign' } className="footer__grid__hide show-tv"> Contacto</Link>
                </div>
                <div className="footer__icons iconos-rrss">
                    <div>
                        <a href={ `https://${ facebook_url }` } target="_blank">

                            <img src={ facebookIcon } alt="facebookIcon" className="footer__w-icon"/>
                        </a>
                    </div>
                    <div>
                        <a href={ `https://${ linkedin_url }` } target="_blank">

                            <img src={ linkedinIcon } alt="linkedinIcon" className="footer__w-icon"/>
                        </a>
                    </div>
                    <div>
                        <a href={ `https://${ instagram_url }` } target="_blank">

                            <img src={ instagramIcon } alt="instagramIcon" className="footer__w-icon"/>
                        </a>
                    </div>
                    <div>
                        <a href={ `https://${ twitter_url }` } target="_blank">

                            <img src={ twitterIcon } alt="twitterIcon" className="footer__w-icon"/>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default FooterPublic
