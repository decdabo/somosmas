import React, { useEffect, useState } from "react";
//import { getAllActivities } from "../../Services/public/activitiesApi";
import ActivityCard from "./ActivityCard";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { Get } from "../../Services/privateApiService";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  const getData = async () => {
    try {
      const response = await Get('activities')
      setActivities(response.data)
      
    } catch (error) {
      console.log(error)
    }
    
  } 

  useEffect(() => {
      getData()
      // .then((res) => setActivities(res))
      // .catch((err) => console.log(err));
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
