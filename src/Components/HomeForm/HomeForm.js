import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import "../../Components/FormStyles.css";
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
          <Form className="form-container">
            <div className="input-group">
              <label htmlFor="welcomeText">Texto de Bienvenida</label>
              <Field
                type="text"
                as="textarea"
                name="welcomeText"
                className="input-field"
                id="welcomeText"
              />
              {errors.welcomeText && (
                <div className="error-message">{errors.welcomeText}</div>
              )}
            </div>

            <div>Imagenes Para Slider</div>
            <div className="images-container">
              <FieldArray
                name="images"
                render={() =>
                  values.images.map((image, index) => (
                    <div key={image.key} className="input-group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, setFieldValue, index)
                        }
                      />

                      <div className="uploaded-image-container">
                        <img
                          className="uploaded-image"
                          src={image.url}
                          alt="decorative"
                          onError={(e) => {
                            e.target.src =
                              "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                          }}
                        />
                      </div>

                      <label htmlFor={index}>Texto de imagen</label>
                      <Field
                        type="text"
                        name={`images.${index}.text`}
                        className="input-field"
                        id={index}
                      />
                    </div>
                  ))
                }
              />
            </div>
            {errors.images && (
              <div className="error-message">{errors.images}</div>
            )}

            <button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </button>
            <div className="success-message">{message}</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HomeForm;
