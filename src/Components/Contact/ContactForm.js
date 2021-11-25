import React from "react";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const handleSubmit = (values) => {
  alert(
    values.name +
      "\n" +
      values.phone +
      "\n" +
      values.email +
      "\n" +
      values.message
  );
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
    <div>
      <h1> Formulario de contacto </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Nombre</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="phone">Teléfono</label>
          <br />
          <input
            type="number"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="message">Mensaje</label>
          <br />
          <textarea
            type="text"
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="error">{formik.errors.message}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default ContactForm;
