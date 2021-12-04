import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';

import InputImageFile from '../Components/Categories/InputImageFile';
import useCategoriesForm from '../hooks/useCategoriesForm';
import InputCkEditor from '../Components/Categories/InputCkEditor';
import InputText from '../Components/Categories/InputText';
import { validateCategoryForm } from '../schemas/categoryFormValidation';
import './formedit.scss';

const initialValues = {
    name: '',
    description: '',
    image: ''
}

export const FormEditData = ({ data = initialValues, linkApi = "http://ongapi.alkemy.org/api/activities" }) => {
    const { imageInputRef, imagePreview, fileReader } =
        useCategoriesForm(data);

    const handleSend = async (values) => {
        if (!data.id) {
            try {
                const response = await Post(endPoint, values);
                return response;
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = Put(endPoint, data.id, values);
                return response;
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Formik
            initialValues={{
                name: data.name,
                description: data.description,
                image: data.image,
            }}
            validate={(values) => {
                return validateCategoryForm(values, imageInputRef);
            }}
            onSubmit={(values) => {
                handleSend(values);
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue, setTouched }) => (
                <form className="form" onSubmit={handleSubmit}>
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
                    <InputCkEditor
                        name="description"
                        required={true}
                        values={values}
                        defaultObjectValues={data}
                        setTouched={setTouched}
                        touched={touched}
                        errors={errors}
                    />
                    <div className="form__b-i-conteiner">
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
                        <button className="form__button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            )
            }
        </Formik >
    );
};
