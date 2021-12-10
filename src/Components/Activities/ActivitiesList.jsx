import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { getAllActivities } from "../../Services/public/activitiesApi";
import ActivityCard from "./ActivityCard";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { fetchActivities } from "../../store/slices/activitiesSlice";
import { alertError } from "../../Services/alerts/Alerts";

const ActivitiesList = () => {
  const { activities } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActivities())
    .catch(err => alertError("No hay actividades disponibles"));
  }, []);

  return (
    <div className="activities">
      <h1>Listado Actividades</h1>
      <ul className="list">
        {activities.data.length > 0 ? (
          activities.data.map((activity) => {
            return <ActivityCard key={activity.id} activity={activity} />;
          })
        ) : (
          <LoadingSpinner />
        )}
      </ul>
    </div>
  );
};

export default ActivitiesList;
