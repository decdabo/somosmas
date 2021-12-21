import React from "react";
import logo from "../../assets/images/logo.png";
import logojuguetes from "../../assets/images/toys/logojuguetes.png";
import "./headerToys.scss";

const Header = () => {
	return (
		<header className='headerToys'>
			<div className="headerToys__logoCampaña">
				<img src={logojuguetes} alt="logo campaña" className='headerToys__logoCampaña-logo' />
			</div>
			<div className="headerToys__ong">
				<img src={ logo } alt="logo ONG"  className='headerToys__ong-logo'/>
			</div>
			<div className="headerToys__slogan">
				<h5 className="slogan">Los chicos te necesitan hoy</h5>
				<h5 className="slogan">Sumate con tu donación !!</h5>
			</div>

		</header>
	);
}
 
export default Header;