import { useEffect, useState } from "react";
import { Get } from "../../Services/publicApiService";
import "./Testimonials.scss";

const TestimonialsCards = () => {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		Get(`${process.env.REACT_APP_API_TESTIMONIALS}?limit=6`).then(
			(response) => {
				if (response.success) {
					setTestimonials(response.data);
				}
			}
		);
	}, []);
	return (
		<div className="testimonials__container">
			{testimonials.length
				? testimonials.map((item) => (
						<div className="card__container" key={item.id}>
							<img
								className="card__image"
								src={item.image || ""}
								alt="user"
								onError={(e) => {
									e.target.src =
										"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
								}}
							/>
							<p className="card__title">{item.name}</p>
							<p
								className="card__text"
								dangerouslySetInnerHTML={{ __html: item.description }}
							></p>
						</div>
				  ))
				: null}
		</div>
	);
};

export default TestimonialsCards;
