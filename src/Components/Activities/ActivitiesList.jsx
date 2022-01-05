import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/components/listStyles.scss";
import ActivityCard from "./ActivityCard";
import { fetchActivities } from "../../store/slices/activitiesSlice";
import { alertError } from "../../Services/alerts/Alerts";

const ActivitiesList = () => {
	const { activities } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchActivities()).catch((err) => {
			alertError("No hay actividades disponibles");
		});
	}, []);

	return (
		<div className="activities__list">
			<h1 className="text__title-secondary">Listado Actividades</h1>
			<ul className="list">
				{activities.data.length
					? activities.data.map((activity) => (
							<ActivityCard key={activity.id} activity={activity} />
					  ))
					: null}
			</ul>
		</div>
	);
};

export default ActivitiesList;
