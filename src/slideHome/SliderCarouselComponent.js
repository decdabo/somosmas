import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import LoaderComponent from "../Components/Loader/Loader";
import { alertError } from "../Services/alerts/Alerts";
import { Get } from "../Services/publicApiService";
import { SlideComponent } from "./SlideComponent";
import "./slidehome.scss";

const settings = {
	className: "slide__center",
	centerMode: true,
	infinite: true,
	slidesToShow: 1,
	speed: 500,
	autoplay: true,
	// slidesToScroll: 1,
	centerPadding: "60px",
};

export const SliderCarouselComponent = ({
	URL = "slides",
	arrayData,
	dots = false,
}) => {
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
	}, []);

	return (
		<Slider {...settings} dots={dots}>
			{loading ? (
				<LoaderComponent />
			) : (
				data.map((obj) => {
					return <SlideComponent key={obj.id} data={obj} />;
				})
			)}
		</Slider>
	);
};
