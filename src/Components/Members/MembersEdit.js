import React from "react";
import "../FormStyles.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const validUrl =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const linkedInUrl =
  /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
const SignupSchema = Yup.object().shape({
  name: Yup.string()

    .min(4, "Too Short!")

    .max(70, "Too Long!")

    .required("Name is required"),

  description: Yup.string()
    .required("Description required")
    .min(8, "Too Short!"),
  image: Yup.string().required("Image required"),
  facebookUrl: Yup.string()
    .matches(validUrl, "Enter correct url!")
    .required("Please enter website"),
  linkedinUrl: Yup.string()
    .matches(linkedInUrl, "Enter correct url!")
    .required("Please enter website"),
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
          <Form className="form-container">
            <Field
              className="input-field"
              type="text"
              id="name"
              name="name"
              placeholder="New name"
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}

            <CKEditor
              editor={ClassicEditor}
              data={values.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFieldValue("description", data);
              }}
            />
            {errors.description && touched.description ? (
              <div>{errors.description}</div>
            ) : null}
            <Field
              className="input-field"
              id="image"
              type="file"
              accept="image/png,image/jpeg"
              name="image"
              placeholder="Upload your new image"
            />
            {errors.image && touched.image ? <div>{errors.image}</div> : null}
            <Field
              className="input-field"
              id="facebookUrl"
              type="text"
              name="facebookUrl"
              placeholder="Facebook Url"
            />
            {errors.facebookUrl && touched.facebookUrl ? (
              <div>{errors.facebookUrl}</div>
            ) : null}
            <Field
              className="input-field"
              id="linkedinUrl"
              type="text"
              name="linkedinUrl"
              placeholder="LinkedIn Url"
            />
            {errors.linkedinUrl && touched.linkedinUrl ? (
              <div>{errors.linkedinUrl}</div>
            ) : null}
            <button className="submit-btn" type="submit">
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MembersEdit;
