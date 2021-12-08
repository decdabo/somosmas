import React from "react";
import { useFormik } from "formik";
import "../../styles/components/formStyles.scss";
import { Post } from "../../Services/publicApiService";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const handleSubmit = async (values) => {
  await Post(process.env.REACT_APP_CONTACTS_ENDPOINT);
};

// VALIDACIONES
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Este campo es obligatorio";
  }

  if (!values.email) {
    errors.email = "Este campo es obligatorio";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    errors.email = "Formato de email incorrecto";
  }

  if (!values.phone) {
    errors.phone = "Este campo es obligatorio";
  } else if (!/\d{8,100}$/.test(values.phone)) {
    errors.phone = "El número debe tener un mínimo de 8 dígitos";
  }

  if (!values.message) {
    errors.message = "Este campo es obligatorio";
  }

  return errors;
};

function ContactForm() {
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  return (
    <div className="form__container">
      <h1> Formulario de contacto </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control form__control">
          <label htmlFor="name">Nombre</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            className="form__input "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error form__message-validation">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="form-control form__control">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            className="form__input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error form__message-validation">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-control form__control">
          <label htmlFor="phone">Teléfono</label>
          <br />
          <input
            type="number"
            id="phone"
            name="phone"
            className="form__input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error form__message-validation">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="form-control form__control">
          <label htmlFor="message">Mensaje</label>
          <br />
          <textarea
            type="text"
            id="message"
            className="form__textarea"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="error form__message-validation">
              {formik.errors.message}
            </div>
          ) : null}
        </div>
        <button type="submit" className="form__btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ContactForm;
