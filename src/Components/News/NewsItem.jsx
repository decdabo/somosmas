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
    <li className="card">
      <img src={image} alt={name} className="small-img" />
      <h3>{name}</h3>
      <p>
        {date} {time}
      </p>
      <Link to={`news/${id}`}>Editar</Link>
      <button onClick={handleDelete}>Remover</button>
    </li>
  );
};

export default NewsItem;
