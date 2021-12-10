import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiDateToText from "../../helpers/apiDateToText";
import { alertError } from "../../Services/alerts/Alerts";
import { Delete } from "../../Services/privateApiService";
import LoaderComponent from "../Loader/Loader";

const NewsItem = ({ id, name, image, created_at, setNews }) => {
  const { date, time } = apiDateToText(created_at);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    Delete("news", id)
      .then((res) => {
        setNews((prev) => prev.filter((news) => news.id !== id));
      })
      .catch((err) => alertError(err));
  };

  return (
    <li className="list__item">
      <img className="item__image" src={image} alt={name} />
      <div className="item__group">
        <h3 className="item__title">{name}</h3>
        <p className="item__datetime">
          {date} {time}
        </p>
        <div className="flex align-center">
          <Link to={`news/${id}`} className="item__edit-link">
            Editar
          </Link>

          {!deleting ? (
            <button onClick={handleDelete} className="item__remove-btn">
              Remover
            </button>
          ) : (
            <LoaderComponent />
          )}
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
