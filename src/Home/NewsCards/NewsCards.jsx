import { useEffect, useState } from "react";
import { Get } from "../../Services/publicApiService";
import "./NewsCards.scss";

const NewsCards = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		Get(`${process.env.REACT_APP_API_NEWS}?limit=5`).then((response) => {
			if (response.success) {
				setNews(response.data);
			}
		});
	}, []);
	return (
		<div className="news__container">
			{news.length
				? news.map((item) => (
						<div className="card__container" key={item.id}>
							<img
								className="card__image"
								src={item.image}
								alt="user"
								onError={(e) => {
									e.target.src =
										"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
								}}
							/>
							<p className="card__title">{item.name}</p>
							<p
								className="card__text"
								dangerouslySetInnerHTML={{ __html: item.content }}
							></p>
						</div>
				  ))
				: null}
		</div>
	);
};

export default NewsCards;
