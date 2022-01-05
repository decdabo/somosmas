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
					<h1 className="text__title-primary">Bienvenidos!</h1>
					<p className="home__presentationText">
						Somos una asociación civil sin fines de lucro que se creó en 1997
						con la intención de dar alimento a las familias del barrio. Con el
						tiempo fuimos involucrándonos con la comunidad y agrandando y
						mejorando nuestra capacidad de trabajo. Hoy somos un centro
						comunitario que acompaña a más de 700 personas a través de las áreas
						de: Educación, deportes, primera infancia, salud, alimentación y
						trabajo social.
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
				<h2 className="text__title-secondary">ULTIMAS NOVEDADES</h2>
				<NewsCards />
			</section>
			<section className="home__section-testimonials">
				<h2 className="text__title-secondary">TESTIMONIOS</h2>
				<TestimonialsCards />
			</section>
			<section className="home__section-contact">
				<h2 className="text__title-secondary">CONTACTO</h2>
				<ContactForm />
			</section>
		</>
	);
};
export default Home;
