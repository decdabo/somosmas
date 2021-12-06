import React from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./MembersEdit.scss";
const validUrl =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const linkedInUrl =
  /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const SignupSchema = Yup.object().shape({
  name: Yup.string()

    .min(4, "Mínimo 4 caráctares")

    .max(70, "Demasiado largo!")

    .required("Porfavor ingrese el nombre"),

  description: Yup.string()
    .required("Porfavor ingrese una descripción")
    .min(8, "Mínimo 8 caráctares"),
  image: Yup.string().required("Porfavor ingrese una imagen"),
  facebookUrl: Yup.string()
    .matches(validUrl, "Porfavor, ingrese una Url válida")
    .required("Porfavor ingrese el link"),
  linkedinUrl: Yup.string()
    .matches(linkedInUrl, "Porfavor, ingrese una Url válida")
    .required("Porfavor ingrese el link"),
});

const MembersEdit = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          image: "",
          facebookUrl: "",
          linkedinUrl: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          // axios.put(API, values) <-------
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className=" form__members-container">
            <h3 className="txt-center">Members Edit Form</h3>
            <Field
              className="form__input form__members-input"
              type="text"
              id="name"
              name="name"
              placeholder="Nuevo nombre"
            />
            {errors.name && touched.name ? (
              <div className="form__message-validation">{errors.name}</div>
            ) : null}
            <div className="ck-editor">
              <CKEditor
                id="description"
                editor={ClassicEditor}
                data={values.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("description", data);
                }}
                config={{
                  placeholder: "Nueva descripción",
                  cloudServices: {
                    tokenUrl:
                      "https://85122.cke-cs.com/token/dev/63f1e5122f7b89374a44f0ba134c7a670437bab84212188ac1b17d829d92",
                    uploadUrl: "https://85122.cke-cs.com/easyimage/upload/",
                  },
                }}
              />
            </div>
            {errors.description && touched.description ? (
              <div className="form__message-validation">
                {errors.description}
              </div>
            ) : null}
            <label htmlFor="image" className="form__members-label">
              <Field
                className="form__input form__members-input"
                id="image"
                type="file"
                accept="image/png,image/jpeg"
                name="image"
                placeholder="Upload your new image"
              />{" "}
              Selecciona una imagen
            </label>
            {errors.image && touched.image ? (
              <div className="form__message-validation"> {errors.image}</div>
            ) : null}
            <Field
              className="form__input form__members-input"
              id="facebookUrl"
              type="text"
              name="facebookUrl"
              placeholder="Facebook Url"
            />

            {errors.facebookUrl && touched.facebookUrl ? (
              <div className="form__message-validation">
                {errors.facebookUrl}
              </div>
            ) : null}
            <Field
              className="form__input form__members-input"
              id="linkedinUrl"
              type="text"
              name="linkedinUrl"
              placeholder="LinkedIn Url"
            />
            {errors.linkedinUrl && touched.linkedinUrl ? (
              <div className="form__message-validation">
                {errors.linkedinUrl}
              </div>
            ) : null}
            <button className="form__btn-primary" type="submit">
              Editar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MembersEdit;
