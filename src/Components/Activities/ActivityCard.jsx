import React from "react";
import { Title } from "../Title/Title";
import apiDateToText from "../../helpers/apiDateToText";
import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const { name, image, description, id } = activity;
  const { date, time } = apiDateToText(activity["created_at"]);
  return (
    <li className="list__item">
      <Title title={name} image={image} />
      <div className="item__group">
        <p className="item__datetime">
          {date} {time}
        </p>

        {/*  esto es mala practica... ver como arreglarlo */}
        <div
          className="item__description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <footer className="item__footer">
        <Link to={`/actividades/${id}`} className="item__edit-link ">
          Mas info...
        </Link>
      </footer>
    </li>
  );
};

export default ActivityCard;
