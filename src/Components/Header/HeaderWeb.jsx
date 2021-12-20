import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import "./headerWeb.scss";
import logo from "../../assets/images/logo.png";

const HeaderWeb = (props) => {

    
    
	const data = [
		{
			text: "Inicio",
			link: "/",
            
            
		},
		{
			text: "Nosotros",
			link: "/about",
            
                
		},
		{
			text: "Contacto",
			link: "/contacto",
            
                
		},
		{
			text: "Juguetes",
			link: "/toys-campaign",
           
                
		},
		{
			text: "Escuela",
			link: "/school-campaign",
           
                
		},
		{
			text: "Login",
			link: "/login-form",
            
                
		},
		{
			text: "Registrarse",
			link: "/register-form",
           
                
		}
	];

    

	return (

		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to='/'>
					<img src={logo} alt="logo" width={130}/>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{
							data.map((item, index) => (
                                
								<li className="nav-item mb-2 mb-lg-0" key={index}>
									<NavLink className="nav-link me-3" to={item.link} exact>
										{item.text}
									</NavLink>
								</li>
                                
							)) 
						}                 
                        
					</ul>
				</div>
			</div>
		</nav>


       

        
	);
};

export default withRouter(HeaderWeb);