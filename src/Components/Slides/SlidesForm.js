import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


import { validate } from "./helpers/slideValidations";
import { Get, Post } from "../../Services/publicApiService";
import { Put } from "../../Services/privateApiService";
import "../../styles/components/formStyles.scss";
import "./slidesForm.scss";

const id = 632;

const SlidesForm = ({ data }) => {
  const [slides, setslides] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const image = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  useEffect(() => {
    Get().then((r) => setslides(r));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      order: "",
      image: "",
    },
    validate,
    onSubmit: (values) => {
      if (slides.findIndex((x) => x.id === Number(values.order)) > 0) {
        formik.setFieldError("order", "El order debe ser unico.");
      } else {
        if (!data) {
          Post("slides", formik)
            .then(({ status }) =>
              alert(JSON.stringify(`Status: ${status}, POST`))
            )
            .catch((err) => console.log(err));
          formik.resetForm();
        } else {
          Put("slides", id, formik)
            .then(({ status }) =>
              alert(JSON.stringify(`Status: ${status}, PUT`))
            )
            .catch((err) => console.log(err));
        }
      }
    },
  });

  return (
    <form className="form__container" onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        className="form__input"
        type="text"
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name || data?.name || ""}
        placeholder="Slide Title"
        autoComplete="off"
      />

      {formik.touched.name && formik.errors.name ? (
        <div className="error-msg">{formik.errors.name}</div>
      ) : null}
      <label htmlFor="description">Descripcion:</label>
      <CKEditor
        className="form__input"
        id="description"
        editor={ClassicEditor}
        data={data?.description || formik.values.description || ""}
        onChange={(e, editor) => {
          formik.setFieldValue("description", editor.getData());
        }}
      />
      {formik.touched.description && formik.errors.description ? (
        <div className="error-msg">{formik.errors.description}</div>
      ) : null}
      <label htmlFor="order">Orden:</label>
      <input
        className="form__input"
        type="text"
        name="order"
        id="order"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.order || data?.order || ""}
        placeholder="0"
        autoComplete="off"
      />
      {formik.touched.order && formik.errors.order ? (
        <div className="error-msg">{formik.errors.order}</div>
      ) : null}
      <label htmlFor="image">Imagen:</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={(e) => {
          formik.handleChange(e);
          image(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.image || data?.image || ""}
        placeholder="Write the description"
        autoComplete="off"
      />
      <div className="form__image-container">
        {imagePreview ? <img src={imagePreview} alt="..." /> : null}
        {formik.touched.image && formik.errors.image ? (
          <div className="error-msg">{formik.errors.image}</div>
        ) : null}
      </div>
      <button className="form__btn-primary" type="submit">
        Send
      </button>
    </form>
  );
};

export default SlidesForm;
