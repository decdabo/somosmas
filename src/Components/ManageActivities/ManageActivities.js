import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Get } from "../../Services/privateApiService";
import { SearchActivities } from "./SearchActivities";
import { ActivityItem } from "./ActivityItem";
import "./ManageActivities.scss";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("Buscando actividades...");
  const [message, setMessage] = useState("");
  const [editingActivity, setEditingActivity] = useState(0); // will change to the id of the activity to edit

  const handleEditActivity = (id) => {
    setMessage("");
    setEditingActivity(id);
  };

  const handleDeleteActivity = async (id) => {
    setMessage("");
    setActivities((prevState) =>
      prevState.filter((activity) => +activity.id !== +id)
    );
    setMessage("Eliminado exitosamente");
  };

  const handleCancelEdit = () => {
    setMessage("");
    setEditingActivity(0);
  };

  const fetchApiData = async () => {
    const response = await Get("activities");
    if (response.success) {
      setActivities(response.data);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleErrorMsg = () => {
    if (!activities[0]) {
      setTimeout(() => {
        setStatus("No se han encontrado actividades");
      }, 3500);
    } else {
      setStatus("Buscando actividades...");
    }
  };
  useEffect(() => {
    handleErrorMsg();
  }, [activities]);

  return (
    <div className="manage__activities-container">
      <Link to="/backoffice/activities/create" className="manage__link">
        Create New Activity
      </Link>
      <SearchActivities setActivities={setActivities} />
      {activities.length ? (
        <>
          <div className="w-75">
            <section>
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  handleEditActivity={handleEditActivity}
                  handleDeleteActivity={handleDeleteActivity}
                  handleCancelEdit={handleCancelEdit}
                  editingActivity={editingActivity}
                />
              ))}
            </section>
          </div>
          <div
            className={
              message.includes("mal") ? "error-message" : "success-message"
            }
          >
            {message}
          </div>
        </>
      ) : (
        <div>{status}</div>
      )}
    </div>
  );
};

export default ManageActivities;
