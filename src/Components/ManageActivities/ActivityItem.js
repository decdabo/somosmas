import React, { Fragment } from "react";
import { FormEditActivities } from "../../backoffice/FormEditActivities";
import apiDateToText from "../../helpers/apiDateToText";

export const ActivityItem = ({
  activity,
  handleEditActivity,
  handleDeleteActivity,
  handleCancelEdit,
  editingActivity,
}) => {
  return (
    <Fragment>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="w-25 h-100">
          <p>Nombre: <br/> {activity.name}</p>
        </div>
        <div className="">{apiDateToText(activity.created_at).date}</div>
        <div className="">
          <button onClick={() => handleEditActivity(activity.id)}>
            Editar
          </button>
          <button onClick={() => handleDeleteActivity(activity.id)}>
            Eliminar
          </button>
        </div>
        <div className="">
          <img
            className="table__activity-image"
            src={activity.image || ""}
            alt="descripcion"
            onError={(e) => {
              e.target.src =
                "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
            }}
          />
        </div>
      </div>
      <div>
        {editingActivity === activity.id && (
          <div colSpan="4" className="table__activity-form">
            <div className="form-container">
              <FormEditActivities activities={activity} />
              <button onClick={handleCancelEdit}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
