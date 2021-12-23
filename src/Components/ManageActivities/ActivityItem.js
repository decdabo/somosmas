import React, { Fragment } from 'react';
import { FormEditActivities } from '../../backoffice/FormEditActivities';
import apiDateToText from '../../helpers/apiDateToText';

export const ActivityItem = ({activity, handleEditActivity, handleDeleteActivity, handleCancelEdit, editingActivity}) => {
    return (
        <Fragment>
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
    )
}
