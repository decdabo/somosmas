import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
import { Get } from "../../Services/privateApiService";
import "../../styles/components/listStyles.scss";
import LoaderComponent from "../Loader/Loader";
import { alertError } from "../../Services/alerts/Alerts";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Get("news")
      .then((res) => {
        setLoading(false);
        setNews(res.data);
      })
      .catch((err) => alertError(err));
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
        {loading && (
          <div className="m-auto">
            <LoaderComponent />
          </div>
        )}
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
