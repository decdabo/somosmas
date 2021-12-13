import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";

import "../../styles/components/listStyles.scss";
import LoaderComponent from "../Loader/Loader";
import { alertError } from "../../Services/alerts/Alerts";
import { fetchNews } from "../../store/slices/newsSlice";
import { useDispatch, useSelector } from "react-redux";

const NewsList = () => {
  const [news, setNews] = useState([]);

  const { newsData } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    if (newsData.error) {
      alertError("Algo salió mal, intente nuevamente");
    }
  }, [newsData.error]);

  return (
    <div className="news-list">
      <header className="header">
        <h1 className="header__title">Listado de Novedades</h1>
        <Link to={`news/create`} className="header__create-btn">
          Crear
        </Link>
      </header>
      <ul className="list">
        {newsData.loading && (
          <div className="m-auto">
            <LoaderComponent />
          </div>
        )}
        {newsData.data.length > 0 ? (
          newsData.data.map((element) => {
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
