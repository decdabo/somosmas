import React from "react";
import "./Activities.scss";
// import { Title } from "../Title/Title";
import apiDateToText from "../../helpers/apiDateToText";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ActivityCard = ({ activity }) => {
  const { id, description, image, name, created_at } = activity;
  const { date, time } = apiDateToText(created_at);
  return (
    <li className="list__item">
      {/* <Title title={activity.name} image={activity.image} /> */}
      {/* TODO reemplazar h1 e img por el titulo dinamico cuando este terminado*/}
      <h1>{name}</h1>
      <img src={image} alt="" />
      <p className="list__item-shutdown-text">
        {date} {time}
      </p>

      {/*  esto es mala practica... ver como arreglarlo */}
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <footer>
        <Link to={`/actividades/${id}`}>
          <AiOutlineInfoCircle />
        </Link>
      </footer>
    </li>
  );
};

export default ActivityCard;
