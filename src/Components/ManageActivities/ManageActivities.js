import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Delete, Get } from "../../Services/privateApiService";
import { SearchActivities } from "./SearchActivities";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import "./ManageActivities.scss";
import { ItemList } from "../../backoffice/SlidesScreen/ItemList";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteActivity = async (id) => {
		const deleteData = await Delete("activities", id);
		if (!deleteData.success) {
			alertError(deleteData.error);
		} else {
      fetchApiData();
		}
  };

  const fetchApiData = async () => {
    const response = await Get("activities");
    if (response.success) {
      setActivities(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div className="backofficeLists__container">
      <h2 className="text__title-secondary">Lista de slides</h2>
      <div className="backofficeLists__searchContainer">
        <Link to="/backoffice/activities/create" className="manage__link">
          <button className="form__btn-secondary">Create New Activity</button>
        </Link>
      </div>
      <SearchActivities setActivities={setActivities} />
      {loading ? (
        <LoadingSpinner />
      ) : activities.length ? (
        activities.map((activity) => (
          <ItemList 
          key={activity.id} 
          data={activity} 
          deleteSlide={handleDeleteActivity} 
          types="activities"
          />
        ))
      ) : (
        <div className="backofficeLists__emptyCard">No hay resultados...</div>
      )}
    </div>
  );
};

export default ManageActivities;

// ) : (<h1>sexo</h1>)}
