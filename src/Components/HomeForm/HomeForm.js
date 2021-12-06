import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import "./HomeForm.scss";

const HomeForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage("Pagina de inicio actualizada");
    setSubmitting(false);
  };

  const handleImageChange = (e, setFieldValue, index) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setFieldValue(`images.${index}.url`, e.target.result);
      };

      reader.readAsDataURL(e.currentTarget.files[0]);
    }
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        welcomeText: "",
        images: [
          { url: "", text: "", key: "1" },
          { url: "", text: "", key: "2" },
          { url: "", text: "", key: "3" },
        ],
      }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (values.welcomeText.length < 20) {
          errors.welcomeText = "El texto debe ser al menos de 20 caracteres";
        }
        if (!values.welcomeText) {
          errors.welcomeText = "Ingrese texto de bienvenida";
        }

        for (const image of values.images) {
          if (!image.text) {
            errors.images = "Añadir texto en cada foto";
          }
          if (!image.url) {
            errors.images = "Añadir 3 fotos";
          }
        }
        return errors;
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => {
        return (
          <Form className="form__container">
            <Field
              type="text"
              as="textarea"
              name="welcomeText"
              className="form__textarea"
              id="welcomeText"
              placeholder="Texto de bienvenida"
            />
            <div className="form__message-validation">{errors.welcomeText}</div>

            <div className="homeForm-text">Imagenes Para Slider</div>
            <div className="homeForm-images-container">
              <FieldArray
                name="images"
                render={() =>
                  values.images.map((image, index) => (
                    <label key={image.key}>
                      <input
                        className="form__image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, setFieldValue, index)
                        }
                      />

                      <div className="form__image-container">
                        <img
                          src={image.url}
                          alt="decorative"
                          onError={(e) => {
                            e.target.src =
                              "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                          }}
                        />
                      </div>

                      <Field
                        placeholder="Texto de imagen"
                        type="text"
                        name={`images.${index}.text`}
                        className="form__input"
                        id={index}
                      />
                    </label>
                  ))
                }
              />
            </div>
            <div className="form__message-validation">{errors.images}</div>

            <button
              className="form__btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Enviar
            </button>
            <div
              className={
                message.includes("mal")
                  ? "form__message-fail"
                  : "form__message-success"
              }
            >
              {message}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HomeForm;
