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

export const FormEditActivities = ({ activities = initialValues }) => {
    const { imageInputRef, imagePreview, fileReader } =
        useCategoriesForm(activities);

    return (
        <Formik
            initialValues={{
                name: activities.name,
                description: activities.description,
                image: activities.image,
            }}
            validate={(values) => {
                return validateCategoryForm(values, imageInputRef);
            }}
            onSubmit={(values) => {
                if (!activities.id) {
                    axios.post('http://ongapi.alkemy.org/api/activities', values)
                        .then(res => console.log(res.data))
                        .catch(e => console.log(e))
                } else {
                    axios.path(`http://ongapi.alkemy.org/api/activities/${activities.id}`, values)
                        .then(res => console.log(res.data))
                        .catch(e => console.log(e))
                }
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
                                defaultObjectValues={activities}
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
