import React from "react";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { Delete } from "../../Services/privateApiService";

const NewsItem = ({ id, name, image, created_at, setNews }) => {
  const { date, time } = apiDateToText(created_at);

  const handleDelete = () => {
    Delete("news", id)
      .then((res) => {
        setNews((prev) => prev.filter((news) => news.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <li className="list__item">
      <img className="item__image" src={image} alt={name} />
      <div className="item__group">
        <h3 className="item__title">{name}</h3>
        <p className="item__datetime">
          {date} {time}
        </p>
        <Link to={`news/${id}`} className="item__edit-link">
          Editar
        </Link>
        <button onClick={handleDelete} className="item__remove-btn">
          Remover
        </button>
      </div>
    </li>
  );
};

export default NewsItem;
