import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
//import { getActivityById } from "../../../Services/public/activitiesApi";
import LoadingSpinner from "../../Spinner/LoadingSpinner";
import apiDateToText from "../../../helpers/apiDateToText";
import { Title } from "../../Title/Title";
import { Get } from "../../../Services/privateApiService";

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Get("activities", id);
        setCurrentActivity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // .then((res) => setCurrentActivity(res.data))
    // .catch((err) => console.log(err));
    getData();
  }, [id]);

  const { name, description, created_at, image } = currentActivity;

  const getDateTime = useCallback(() => {
    return created_at !== undefined
      ? apiDateToText(created_at)
      : { date: null, time: null };
  }, [created_at]);

  return (
    <>
      {currentActivity !== {} ? (
        <section>
          <Title image={image} title={name} />
          <hgroup>
            <p className="list__item-shutdown-text">{getDateTime().date}</p>
            <p className="list__item-shutdown-text">{getDateTime().time}</p>
          </hgroup>

          {/* OTRA VEZ LA MALA PRACTICA PERO NO ENCUENTRO ALTERNATIVA */}
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </section>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ActivityInfo;
