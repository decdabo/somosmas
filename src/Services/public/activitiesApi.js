import axios from "axios";

const BASE_URL = "http://ongapi.alkemy.org/api/activities";

const getAllActivities = () => {
  return axios
    .get(BASE_URL)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

const getActivityById = (id) => {
  return axios
    .get(`${BASE_URL}/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export { getAllActivities, getActivityById };
