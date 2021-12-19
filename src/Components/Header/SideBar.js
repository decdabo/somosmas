import React from "react";
import { Link } from "react-router-dom";

export const SideBar = ({ isOpen = false }) => {
  return (
    <aside className={`aside ${isOpen ? 'openNav' : 'closeNav'}`} >
      <nav className="aside__nav">
        <Link className="nav__item" to="/">
          Inicio
        </Link>
        <Link className="nav__item" to="/backoffice/activities">
          Actividades
        </Link>
        <Link className="nav__item" to="/backoffice/slides">
          Slides
        </Link>
        <Link className="nav__item" to="/backoffice/news">
          Novedades
        </Link>
        <Link className="nav__item" to="/backoffice/users">
          Usuarios
        </Link>
        <Link className="nav__item" to="/backoffice/organization">
          Organización
        </Link>
      </nav>
    </aside>
  );
};
