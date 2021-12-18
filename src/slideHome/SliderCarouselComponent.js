import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import LoaderComponent from "../Components/Loader/Loader";
import { alertError } from "../Services/alerts/Alerts";
import { Get } from "../Services/publicApiService";
import { SlideComponent } from "./SlideComponent";

const settings = {
  speed: 500,
  infinite: true, slidesToShow: 1,
  slidesToScroll: 1,
};

export const SliderCarouselComponent = ({ URL = "slides", arrayData, dots = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const validation = () => {
    if (arrayData) {
      setData(arrayData);
    } else {
      getData();
    }
    setLoading(false);
  };
  const getData = async () => {
    try {
      const fetchedData = await Get(URL);
      const { data } = fetchedData;
      return setData(data);
    } catch (error) {
      alertError("Ha ocurrido un problema");
      setLoading(true);
    }
  };
  useEffect(() => {
    validation();
  }, [])

  return (
    <>
      <Slider {...settings} dots={dots}>
        {loading ?
          (<LoaderComponent />)
          : (data.map(obj => { return <SlideComponent key={obj.id} data={obj}  /> }))
        }
      </Slider>
    </>
  );
};
