import axios from "axios";

const url = process.env.REACT_APP_API_SLIDERS

export function slidesPost(formik) {
  axios
    .post(`${url}/slides`, {
      name: formik.values.name,
      description: formik.values.description,
      order: formik.values.order,
      image: formik.values.image,
    })
    .then(({ status }) => alert(JSON.stringify(`Status: ${status}, POST`)))
    .catch((err) => console.log(err));
}

export function slidesPatch(formik) {
  axios
    .put(`${url}/slides/${id}`, {
      name: formik.values.name,
      description: formik.values.description,
      order: formik.values.order,
      image: formik.values.image,
    })
    .then(({ status }) => alert(JSON.stringify(`Status: ${status}, PUT`)))
    .catch((err) => console.log(err));
}
