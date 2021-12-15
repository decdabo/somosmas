import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import apiDateToText from "../../../helpers/apiDateToText";
import { Title } from "../../Title/Title";
import "../../../styles/components/detailsStyles.scss";
import { alertError } from "../../../Services/alerts/Alerts";
import { useDispatch } from "react-redux";
import { fetchActivities } from "../../../store/slices/activitiesSlice";
import ActivitySkeleton from "../Skeletons/ActivitySkeleton";

/*
RECEIVES => empty

HOW =>
fetch from /activities/:id and saves the info into currentActivity

inside currentActivity there is a prop called "created_at" which returns a date

the "getDateTime" function taken from "helpers/apiDateToText" is inside a performance friendly useCallback which only calculates the date and time from the "created_at" prop whenever the prop changes.

RETURNS => activity info component and displays some interesting data about a specific activity


*/

const ActivityInfo = () => {
  const { id } = useParams();
  const [currentActivity, setCurrentActivity] = useState({});

  const dispatch = useDispatch((state) => state);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchActivities(id))
        .then(({ payload }) => setCurrentActivity(payload))
        .catch((error) => alertError("No se pudo cargar la actividad"));
    }, 1000);
  }, [id]);

  const { name, description, created_at, image } = currentActivity;

  const getDateTime = useCallback(() => {
    return created_at !== undefined
      ? apiDateToText(created_at)
      : { date: null, time: null };
  }, [created_at]);

  return (
    <>
      {currentActivity && name ? (
        <section className="detail">
          <Title image={image} title={name} />
          <hgroup className="detail__datetime">
            <p className="detail__datetime-text">
              {getDateTime().date} {getDateTime().time}
            </p>
          </hgroup>

          {/* OTRA VEZ LA MALA PRACTICA PERO NO ENCUENTRO ALTERNATIVA */}
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </section>
      ) : (
        <ActivitySkeleton variant="info" />
      )}
    </>
  );
};

export default ActivityInfo;
