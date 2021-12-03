import React, { useState, useEffect } from "react";
import "../CardListStyles.css";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
import { Get } from "../../Services/privateApiService";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    Get("news")
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Listado de Novedades</h1>
      <Link to={`news/create`}>Crear</Link>
      <ul className="list-container">
        {news.length > 0 ? (
          news.map((element) => {
            return <NewsItem {...element} key={element.id} setNews={setNews} />;
          })
        ) : (
          <p>No hay novedades</p>
        )}
      </ul>
    </div>
  );
};

export default NewsList;
