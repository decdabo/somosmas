import React, { useEffect, useState } from "react";
import { Title } from "../Title/Title";
import apiDateToText from "../../helpers/apiDateToText";
import { Link } from "react-router-dom";
import ActivitySkeleton from "./Skeletons/ActivitySkeleton";
const ActivityCard = ({ activity }) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			{loading ? (
				<ActivitySkeleton variant="list" />
			) : (
				<li className="list__item">
					<Title width="full" title={activity.name} image={activity.image} />
					<div className="item__group">
						<p className="item__datetime">
							{apiDateToText(activity["created_at"]).date}{" "}
							{apiDateToText(activity["created_at"]).time}
						</p>
					</div>
					<footer className="item__footer">
						<Link to={`/actividades/${activity.id}`}>
							<button className="form__btn-secondary">Mas info...</button>
						</Link>
					</footer>
				</li>
			)}
		</>
	);
};

export default ActivityCard;
