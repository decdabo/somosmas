import React from "react";
import { Link } from "react-router-dom";
import { SliderCarouselComponent } from "../slideHome/SliderCarouselComponent.js";
import "../styles/components/home.scss";
import Arrow1 from "../assets/images/arrow-1.png";
import Hand from "../assets/images/hand-heart.png";

import "./Home.scss";
import ContactForm from "../Components/Contact/ContactForm.js";
import TestimonialsCards from "./TestimonialsCards/TestimonialsCards.jsx";
import NewsCards from "./NewsCards/NewsCards.jsx";

const Home = () => {
	return (
		<>
			<section className="home__section-main">
				<div className="home__presentationContainer">
					<h1 className="home__title">Bienvenidos!</h1>
					<p className="home__presentationText">
						Simply dummy text of the printing and typesetting industry. Lorem
						Ipsum has been the industry's standard dummy text ever since the
						1500s, when an unknown printer
					</p>

					<div className="home__donateContainer">
						<img src={Arrow1} alt="curved arrow" className="home__arrowImage" />
						<img
							src={Hand}
							alt="hand with a heart"
							className="home__handImage"
						/>
						<Link to="/donar">
							<button className="form__btn-primary">DONAR AHORA</button>
						</Link>
					</div>
				</div>
				<div className="home__carousel">
					<SliderCarouselComponent />
				</div>
			</section>
			<section className="home__section-news">
				<h1 className="home__subtitle">ULTIMAS NOVEDADES</h1>
				<NewsCards />
				<button className="form__btn-primary">Ver Todas</button>
			</section>
			<section className="home__section-testimonials">
				<h1 className="home__subtitle">TESTIMONIOS</h1>
				<TestimonialsCards />
				<button className="form__btn-primary">Ver Todos</button>
			</section>
			<section className="home__section-contact">
				<ContactForm />
			</section>
		</>
	);
};
export default Home;
