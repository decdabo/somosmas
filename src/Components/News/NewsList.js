import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
import { Get } from "../../Services/privateApiService";
import "../../styles/components/listStyles.scss";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    Get("news")
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="news-list">
      <header className="header">
        <h1 className="header__title">Listado de Novedades</h1>
        <Link to={`news/create`} className="header__create-btn">
          Crear
        </Link>
      </header>
      <ul className="list">
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
