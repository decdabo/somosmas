import React from "react";
import "./Activities.scss";
import { Title } from "../Title/Title";
import apiDateToText from "../../helpers/apiDateToText";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ActivityCard = ({ activity }) => {
  const { date, time } = apiDateToText(activity["created_at"]);
  return (
    <li className="list__item">
      <Title title={activity.name} image={activity.image} />
      <p className="list__item-shutdown-text">
        {date} {time}
      </p>

      {/*  esto es mala practica... ver como arreglarlo */}
      <div dangerouslySetInnerHTML={{ __html: activity.description }}></div>
      <footer>
        <Link to={`/actividades/${activity.id}`}>
          <AiOutlineInfoCircle />
        </Link>
      </footer>
    </li>
  );
};

export default ActivityCard;
