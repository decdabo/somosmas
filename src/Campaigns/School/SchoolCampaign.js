import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Content from "./Content";
import Footer from "./Footer.jsx";
import { ReactComponent as WavesRed } from "../../assets/waves-red.svg";
import { ReactComponent as WavesBlue } from "../../assets/waves-blue.svg";
const SchoolCampaign = () => {
	return (
		<>
			<WavesBlue className="toys__waves-blue" />

			<Header />
			<Slider />
			<Content />
			<Footer />
			<WavesRed className="toys__waves-red" />
		</>
	);
};

export default SchoolCampaign;
