import { useHistory, useParams } from "react-router-dom";
import { Get, Post } from "../../Services/publicApiService";
import { Put } from "../../Services/privateApiService";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { alertError } from "../../Services/alerts/Alerts";
import getBase64FromUrl from "../../helpers/imageToBase64";

const TestimonialForm = () => {

    const {push} = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [create, setCreate] = useState(true);

    const {id} = useParams();

    const submitForm = async (values, formik) => {
        if (create) {
            try {
                const response = await Post(process.env.REACT_APP_API_TESTIMONIALS, values)
                formik.setSubmitting(false);
                return alert(response.message)
            } catch (error) {
                alertError(error)
            }
        } else {
            try {
                const response = await Put(process.env.REACT_APP_API_TESTIMONIALS, id, values)
                formik.setSubmitting(false);
                return alert(response.message)
            } catch (error) {
                alertError(error)
            }
        }
    }

    const getData = async () => {
        if (id) {
            try {
                await Get(process.env.REACT_APP_API_TESTIMONIALS, id)
                    .then(res => {
                        const {data: {name, description, image}} = res
                        getBase64FromUrl(image).then(imagen64 => {
                            setImage(imagen64)
                        })
                        setName(name);
                        setDescription(description)
                        setCreate(false);


                    })
            } catch (error) {
                alertError("Usuario inexistente");
                push(`/${ process.env.REACT_APP_API_TESTIMONIALS }/create`);
            }
        } else {
            // alertError('Testimonio inexistente. Cree uno, porfavor!');
            // push(`/${ process.env.REACT_APP_API_TESTIMONIALS }/create`);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const ErrorSchema = Yup.object().shape({
        name: Yup.string().required("Name is required.").min(4, "Name is too short"),
        description: Yup.string().required("Description is required."),
        image: Yup.string().required("Photo is required.")
    })

    const handleChange = (e, propsFormik) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                propsFormik.setFieldValue("image", e.target.result);
            }
            reader.readAsDataURL(e.currentTarget.files[0]);

        }
    }

    const handleChangeDescription = (event, editor, props) => {
        const data = editor.getData()
        props.setFieldValue("description", data)
    }

    return (
        <div>
            <Formik initialValues={ {name, description, image} }
                    onSubmit={ (values, formik) => {
                        submitForm(values, formik)
                    } }
                    validationSchema={ ErrorSchema }
                    enableReinitialize={ true }
                    validateOnMount={ !create }
            >
                {
                    (props) => {
                        return (
                            <Form className="form__user">
                                <div className="form__container">
                                    <h3 className="txt-center">Testimonial Form</h3>
                                    <label>Name: </label>
                                    <Field name={ 'name' } type={ 'text' } className="form__input"/>
                                    <small
                                        className="form__message-validation">{ props.errors.name }</small>

                                    <label>Description: </label>
                                    <CKEditor
                                        name={ "description" }
                                        editor={ ClassicEditor }
                                        data={ description }
                                        onChange={ (event, editor) => {
                                            handleChangeDescription(event, editor, props)
                                        } }

                                    />
                                    <small className="form__message-validation">{ props.errors.description }</small>
                                    <label>Image:
                                        <input
                                            className="form__image-input"
                                            type="file"
                                            name="image"
                                            accept="image/png,image/jpeg"
                                            onChange={ (event) => {
                                                handleChange(event, props)
                                            } }

                                        />
                                        <div className="form__image-container">
                                            <img
                                                src={ props.values.image }
                                                alt="article"
                                                onError={ (e) => {
                                                    e.target.src =
                                                        "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
                                                } }
                                            />
                                        </div>
                                    </label>
                                    <small
                                        className="form__message-validation">{ props.errors.image }</small>

                                    { !create ? <button type={ 'submit' }
                                                        disabled={ !(props.isValid) || props.isSubmitting }
                                                        className="form__btn-primary mx-auto"> Send
                                        </button> :
                                        <button type={ 'submit' }
                                                disabled={ !(props.isValid && props.dirty) || props.isSubmitting }
                                                className="form__btn-primary mx-auto"> Send
                                        </button> }
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}
export default TestimonialForm;
