import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Header/header.scss";
import logo from "../../assets/images/logo.png";
import { AuthLogout } from "./AuthLogout";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const showMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const data = [
    {
      text: "Novedades",
      link: "/backoffice/news",
    },
    {
      text: "Actividades",
      link: "/backoffice/activities",
    },
    {
      text: "Categorías",
      link: "/backoffice/categories",
    },
    {
      text: "Testimonios",
      link: "/backoffice/testimonials",
    },
    {
      text: "Organización",
      link: "/backoffice/organization",
    },
    {
      text: "Slides",
      link: "/backoffice/slides",
    },
    {
      text: "Usuarios",
      link: "/backoffice/users",
    },
    {
      text: "Miembros",
      link: "/backoffice/members",
    },
  ];

  return (
    <nav className="headerBackoffice header__container">
      <Link to="/backoffice">
        <img src={logo} alt="logo" width={130} className="header__logo" />
      </Link>

      <button
        className="header__menuBtn form__btn-secondary"
        onClick={showMenu}
      >
        MENU
      </button>
      <div className={`header__menuPanel ${menuIsOpen && "active"}`}>
        <ul className="header__navbar">
          {data.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} exact className="header__link">
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="header__btnContainer">
          <AuthLogout />
        </div>
      </div>
      <i className="fas fa-pen pencilIcon"></i>
    </nav>
  );
};
export default Header;
