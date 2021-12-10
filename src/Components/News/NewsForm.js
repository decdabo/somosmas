import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Get, Post, Put } from "../../Services/privateApiService";

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
      const response = await Post(process.env.REACT_APP_API_NEWS, body);
      if (response.success) {
        setMessage("Creado exitosamente");
      } else {
        setMessage("Algo salió mal, intente nuevamente");
      }
    } catch (error) {
      setMessage("Algo salió mal, intente nuevamente");
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
      const response = await Put(process.env.REACT_APP_API_NEWS, id, body);
      console.log(response);
      if (response.success) {
        setMessage("Actualizado exitosamente");
      } else {
        setMessage("Algo salió mal, intente nuevamente");
      }
    } catch (error) {
      setMessage("Algo salió mal, intente nuevamente");
    }
    setSubmitting(false);
  };

  //   load categories and existing article data if editting
  const loadApiData = useCallback(async () => {
    try {
      const categories = await Get("categories");
      setCategories(categories.data);
      if (id) {
        const newData = await Get(process.env.REACT_APP_API_NEWS, id);
        if (newData.success) {
          setExistingNew(newData.data);
        }
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
    <div className="form__container">
      <div>Loading...</div>
    </div>
  ) : id && !existingNew.id ? (
    <div className="form__container">Noticia no encontrada</div>
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
          <Form className="form__container">
            <Field
              type="text"
              name="title"
              className="form__input"
              id="title"
              placeholder="Título"
            />
            <div className="form__message-validation">{errors.title}</div>

            <CKEditor
              editor={ClassicEditor}
              data={values.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFieldValue("content", data);
              }}
              config={{
                placeholder: "Contenido",
                cloudServices: {
                  tokenUrl:
                    "https://85122.cke-cs.com/token/dev/63f1e5122f7b89374a44f0ba134c7a670437bab84212188ac1b17d829d92",
                  uploadUrl: "https://85122.cke-cs.com/easyimage/upload/",
                },
              }}
            />
            <div className="form__message-validation">{errors.content}</div>

            <Field
              name="category"
              as="select"
              className="form__select"
              children={[
                <option value="" disabled key={0}>
                  Seleccionar categoría
                </option>,
              ].concat(
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            />
            <div className="form__message-validation">{errors.category}</div>

            <label>
              <input
                className="form__image-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />

              <div className="form__image-container">
                <img
                  src={values.image}
                  alt="article"
                  onError={(e) => {
                    e.target.src =
                      "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                  }}
                />
              </div>
            </label>
            <div className="form__message-validation">{errors.image}</div>

            <button
              className="form__btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Send
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

export default NewsForm;
