import React from "react";
import { Formik, Form } from "formik";
import { validateCategoryForm } from "../../schemas/categoryFormValidation";
import "./CategoryForm.scss";
import {
  modifyCategory,
  uploadCategory,
} from "../../Services/privateApi/categoryApi";
import useCategoriesForm from "../../hooks/useCategoriesForm";
import InputImageFile from "./InputImageFile";
import InputText from "./InputText";
import InputCkEditor from "./InputCkEditor";

/*

INPUTS:
category => object => {
    id => number
    name: => string,
    description: => string,
    image: => string (blob, base64),
}

FUNCTION: 
take some inputs and decide if it is going to 
create a category 
or modify an existent one



OUTPUTS => Form component and api call


*/

const CategoriesForm = ({ category }) => {
  const { imageInputRef, imagePreview, status, setStatus, fileReader } =
    useCategoriesForm(category);

  const handleSubmit = (values) => {
    category === undefined
      ? uploadCategory({ ...values, image: imagePreview })
          .then((res) => {
            setStatus(res);
          })
          .catch((err) => {
            setStatus(err);
          })
      : modifyCategory({
          ...values,
          image: imagePreview,
          id: category.id,
        })
          .then((res) => {
            setStatus(res);
          })
          .catch((err) => {
            setStatus(err);
          });
  };

  const emptyCategoryData = {
    name: "",
    description: "",
    image: "",
  };

  const chooseInitialData =
    category !== undefined
      ? {
          name: category.name,
          description: category.description,
          image: category.image,
        }
      : emptyCategoryData;

  return (
    <>
      <h1 className="title">
        {category ? "Edit category" : "Create category"}
      </h1>
      <Formik
        initialValues={chooseInitialData}
        initialErrors={emptyCategoryData}
        validate={(values) => {
          // ALSO VALIDATES IMAGE INPUT
          return validateCategoryForm(values, imageInputRef);
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleBlur,
          touched,
          errors,
          values,
          handleChange,
          setTouched,
        }) => (
          <Form className="form">
            <InputText
              name="name"
              required={true}
              handleChange={handleChange}
              handleBlur={handleBlur}
              defaultValue={values.name}
              values={values}
              errors={errors}
              touched={touched}
            />
            <InputImageFile
              name="image"
              values={values}
              handleBlur={handleBlur}
              fileReader={fileReader}
              handleChange={handleChange}
              imageInputRef={imageInputRef}
              errors={errors}
              touched={touched}
              imagePreview={imagePreview}
              required={true}
            />

            <InputCkEditor
              name="description"
              required={true}
              values={values}
              defaultObjectValues={category}
              setTouched={setTouched}
              touched={touched}
              errors={errors}
            />

            <button className="form__button" type="submit">
              Submit
            </button>
            {setStatus && <div>{status}</div>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CategoriesForm;
