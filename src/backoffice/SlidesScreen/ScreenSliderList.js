import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemList } from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlides } from "../../store/slices/slidesSlice";

export const ScreenSliderList = () => {
  const { slidesData } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSlides());
  }, []);

  return (
    <div className="table__main">
      <div className="table__head-container">
        <div className="table__head-title">Listado de Slides</div>
        <Link to="/backoffice/Slides/create" className="table__create-button">
          Create
        </Link>
      </div>
      <div>
        {slidesData.data.map((data, i) => {
          return <ItemList key={i} data={data} />;
        })}
      </div>
    </div>
  );
};
