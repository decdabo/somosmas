import React, { useEffect, useState } from "react";
import { getAllActivities } from "../../Services/public/activitiesApi";
import ActivityCard from "./ActivityCard";
import "./Activities.scss";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getAllActivities()
      .then((res) => setActivities(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="activities">
      <h1>Listado Actividades</h1>
      <ul className="list">
        {activities.length > 0 ? (
          activities.map((activity) => {
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
