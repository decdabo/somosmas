import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import LoaderComponent from "../Components/Loader/Loader";
import { alertError } from "../Services/alerts/Alerts";
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

	const [loading, setLoading] = useState(false);



	const getData = async () => {
		try {
			const fetchedData = await Get(URL);
			const { data } = fetchedData;
			setLoading(true);
			return setData(data);
		} catch (error) {
			setLoading(null);
			alertError("Ha ocurrido un problema");
      
      
		}
	};
	useEffect(() => {
		getData();
	}, [URL]);


	return loading !== false ? (
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
	) : <LoaderComponent />;
};
