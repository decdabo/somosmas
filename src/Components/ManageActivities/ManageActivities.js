import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { FormEditActivities } from "../../backoffice/FormEditActivities";
import apiDateToText from "../../helpers/apiDateToText";

import "./ManageActivities.scss";

const activitiesMock = require("../../lib/mock/activities.json");

const ManageActivities = () => {
  const [activities, setActivities] = useState(activitiesMock);
  const [message, setMessage] = useState("");
  const [editingActivity, setEditingActivity] = useState(NaN); // will change to the id of the activity to edit

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
    setEditingActivity(NaN);
  };

  return (
    <div className="manage-activities-container">
      <Link to="/backoffice/activities/create" className="new-activity-link">
        Create New Activity
      </Link>
      {activities.length ? (
        <>
          <table className="table-container">
            <thead>
              <tr>
                <th className="activity-table-data">Nombre</th>
                <th className="activity-table-data">Imagen</th>
                <th className="activity-table-data">Creado en</th>
                <th className="activity-table-data"></th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <Fragment key={activity.id}>
                  <tr>
                    <td className="activity-table-data">{activity.name}</td>
                    <td className="activity-table-data">
                      <img
                        className="activity-image"
                        src={activity.image || ""}
                        alt="descripcion"
                        onError={(e) => {
                          e.target.src =
                            "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                        }}
                      />
                    </td>
                    <td className="activity-table-data">
                      {apiDateToText(activity.created_at).date}
                    </td>
                    <td className="activity-table-data">
                      <button onClick={() => handleEditActivity(activity.id)}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteActivity(activity.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                  <tr>
                    {editingActivity === activity.id && (
                      <td colSpan="4" className="activity-table-data-form">
                        <div className="form-container">
                          <FormEditActivities activities={activity} />
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </td>
                    )}
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
          <div
            className={
              message.includes("mal") ? "error-message" : "success-message"
            }
          >
            {message}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ManageActivities;
