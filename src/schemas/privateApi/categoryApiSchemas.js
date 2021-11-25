import * as yup from "yup";

const categoryPutApiRequest = yup.object().shape({
  id: yup.number("Id must be a number.").required("Id is required."),
  name: yup
    .string("Name must be a string.")
    .required("Name required.")
    .min(4, "Minimum length: 4."),
  image: yup.string("Image must be a string").required("Image required."),
  description: yup
    .string("Description must be a string")
    .required("Description required."),
});

const categoryPostApiRequest = yup.object().shape({
  name: yup
    .string("Name must be a string.")
    .required("Name required.")
    .min(4, "Minimum length: 4."),
  image: yup.string("Image must be a string").required("Image required."),
  description: yup
    .string("Description must be a string")
    .required("Description required."),
});

export { categoryPutApiRequest, categoryPostApiRequest };
