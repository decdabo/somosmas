import React from "react";
import Countdown from "react-countdown";

const Content = ({ event = 20000 * 4324 }) => {
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return (
				<h3>
					<strong className="countdown__text fs-2">Finalizado!</strong>
				</h3>
			);
		} else {
			return (
				<strong className="countdown__text fs-4">
					Te quedan {days}d:{hours}h:{minutes}m: {seconds}s para participar!
				</strong>
			);
		}
	};
	return (
		<div className="campaign__container">
			<div className="campaign__box mt-5 px-16">
				<h1 className="text-center">
					Carrera 22 entre 80-73, Bogotá, Colombia
				</h1>
				<h2 className="text-center">13-12-2021 / 13:15hrs </h2>
				<hr />
				<div className="campaign__countdown">
					<img
						className="campaign__img countdown__img-left"
						src="https://images.vexels.com/media/users/3/200184/isolated/lists/cb73b9acfb176a64a34c519bf6769761-dos-libros-planos-simples.png"
						alt="img-campaign"
					/>
					<div className="countdown__container m-auto">
						<Countdown
							date={Date.now() + event}
							renderer={renderer}
							daysInHours={false}
						/>
					</div>
					<img
						className="campaign__img countdown__img-right "
						src="https://images.vexels.com/media/users/3/200184/isolated/lists/cb73b9acfb176a64a34c519bf6769761-dos-libros-planos-simples.png"
						alt="img-campaign"
					/>
				</div>
				<p className="campaign__description text-center">
					El espacio de apoyo escolar es el corazón del área educativa.
					Actualmente se encuentran inscriptos a este programa 150 niños y niñas
					de 6 a 15 años y 50 adolescentes entre 13 y 20 años. Tambien contamos
					con un programa de tutorías destinado a jóvenes a partir del tercer
					año de secundaria, cuyo objetivo es garantizar su permanencia en la
					escuela y construir un proyecto de vida que da sentido al colegio.
				</p>
				<div className="campaign__img-container">
					<img
						className="campaign__img countdown__img-left"
						src="https://images.vexels.com/media/users/3/200184/isolated/lists/cb73b9acfb176a64a34c519bf6769761-dos-libros-planos-simples.png"
						alt="img-campaign"
					/>
					<img
						className="campaign__img"
						src="https://images.vexels.com/media/users/3/200184/isolated/lists/cb73b9acfb176a64a34c519bf6769761-dos-libros-planos-simples.png"
						alt="img-campaign"
					/>
					<img
						className="campaign__img countdown__img-right"
						src="https://images.vexels.com/media/users/3/200184/isolated/lists/cb73b9acfb176a64a34c519bf6769761-dos-libros-planos-simples.png"
						alt="img-campaign"
					/>
				</div>
			</div>
		</div>
	);
};

export default Content;
