import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

import "../../Components/FormStyles.css";
import "./NewsForm.scss";

const NewsForm = () => {
  const [categories, setCategories] = useState([]);
  const [existingNew, setExistingNew] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { id } = useParams();

  // post new article
  const submitNew = async (values, { setSubmitting }) => {
    setMessage("");
    const body = {
      name: values.title,
      content: values.content,
      image: values.image,
      category_id: values.category,
      deleted_at: "2021-11-23T19:19:56.825Z",
    };
    try {
      const response = await axios.post(
        "http://ongapi.alkemy.org/api/news",
        body
      );
      if (response.data.success) {
        setMessage("Created successfully.");
      } else {
        setMessage("Failed, try again.");
      }
    } catch (error) {
      setMessage("Failed, try again.");
    }
    setSubmitting(false);
  };

  // edit existing article
  const submitEdit = async (values, { setSubmitting }) => {
    setMessage("");
    const body = {
      name: values.title,
      content: values.content,
      category_id: values.category,
      deleted_at: "2021-11-23T19:19:56.825Z",
    };

    if (existingNew.image !== values.image) {
      body.image = values.image;
    }

    try {
      const response = await axios.put(
        `http://ongapi.alkemy.org/api/news/${id}`,
        body
      );
      if (response.data.success) {
        setMessage("Updated successfully.");
      } else {
        setMessage("Failed, try again.");
      }
    } catch (error) {
      setMessage("Failed, try again.");
    }
    setSubmitting(false);
  };

  //   load categories and existing article data if editting
  const loadApiData = useCallback(async () => {
    try {
      const categories = await axios.get(
        "http://ongapi.alkemy.org/api/categories"
      );
      setCategories(categories.data.data);
      if (id) {
        const newData = await axios.get(
          `http://ongapi.alkemy.org/api/news/${id}`
        );

        setExistingNew(newData.data.data);
      }
    } catch (error) {}
    setIsLoading(false);
  }, [id]);

  const handleImageChange = (e, setFieldValue) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setFieldValue("image", e.target.result);
      };

      reader.readAsDataURL(e.currentTarget.files[0]);
    }
  };

  useEffect(() => {
    loadApiData();
  }, []);

  return isLoading ? (
    <div className="form-container">
      <div>Loading...</div>
    </div>
  ) : (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        title: existingNew.name || "",
        content: existingNew.content || "",
        category: existingNew.category_id || "",
        image: existingNew.image || "",
      }}
      onSubmit={id ? submitEdit : submitNew}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Ingresar un título";
        }
        if (!values.content) {
          errors.content = "Ingresar contenido";
        }
        if (!values.category) {
          errors.category = "Seleccionar categoría";
        }
        if (!values.image) {
          errors.image = "Añadir una foto";
        }
        return errors;
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => {
        return (
          <Form className="form-container">
            <div className="input-group">
              <label htmlFor="title">Titulo</label>
              <Field
                type="text"
                name="title"
                className="input-field"
                id="title"
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="title">Contenido</label>
              <CKEditor
                editor={ClassicEditor}
                data={values.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("content", data);
                }}
                placeholder="d"
              />
              {errors.content && (
                <div className="error-message">{errors.content}</div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="title">Categoría</label>
              <Field
                name="category"
                as="select"
                className="select-field"
                children={[
                  <option value="" disabled key={0}>
                    Select category
                  </option>,
                ].concat(
                  categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              />
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="title">Foto</label>
              <div className="image-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />

                <div className="uploaded-image-container">
                  <img
                    className="uploaded-image"
                    src={values.image}
                    alt="article"
                    onError={(e) => {
                      e.target.src =
                        "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                    }}
                  />
                </div>
              </div>
              {errors.image && (
                <div className="error-message">{errors.image}</div>
              )}
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </button>
            <div
              className={
                message.includes("Failed") ? "error-message" : "success-message"
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

export default NewsForm;
