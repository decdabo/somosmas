<<<<<<< HEAD
import React, { useState } from 'react';
import Menu from '../../assets/images/menu.svg'
import '../Header/header.scss'
import { SideBar } from './SideBar';
=======
import React, { useState } from "react";
import Menu from "../../assets/images/menu.svg";
import "../Header/header.scss";
import { SideBar } from "./SideBar";
>>>>>>> 2c8ac5f9539943d787bb31efeeb2a930df6f9a59





const Header = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="headerLogo">
				<button className="headerLogo__btn" onClick={() => setOpen(!open)}>
					<img src={Menu} alt="Menu" className="headerLogo__img" />
				</button>
			</div>
			<SideBar isOpen={open} />
		</>
	);
};
export default Header;