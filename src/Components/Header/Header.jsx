import React, { useState } from 'react';
import Menu from '../../assets/images/menu.svg'
import '../Header/Header.scss'
import { SideBar } from './SideBar';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="headerLogo">
                <button className="headerLogo__btn" onClick={()=>setOpen(!open)}>
                    <img src={Menu} alt="Menu" className="headerLogo__img" />
                </button>
            </div>
            <SideBar isOpen={open} />
        </>
    );
};
export default Header;