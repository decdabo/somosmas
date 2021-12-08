import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Get } from "../Services/publicApiService";
import { SlideComponent } from "./SlideComponent";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const SliderCarouselComponent = ({ URL = "slides", arrayData }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const fetchedData = await Get(URL);
      const { data } = fetchedData;
      return setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [URL]);
  return (
    <>
      <Slider {...settings}>
        {arrayData
          ? arrayData.map((obj) => {
              return <SlideComponent key={obj.id} data={obj} />;
            })
          : data.map((obj) => {
              return <SlideComponent key={obj.id} data={obj} />;
            })}
      </Slider>
    </>
  );
};
