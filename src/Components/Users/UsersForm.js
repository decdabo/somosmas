import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { Get, Post } from '../../Services/publicApiService';
import '../FormStyles.css';
import '../FormStyles.css'
import { Put } from '../../Services/privateApiService';

const UserForm = () => {
    const { push } = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role_id, setRole_id] = useState("");
    const [password, setPassword] = useState("");
    const [profile_image, setProfile_Image] = useState("");
    const [create, setCreate] = useState(true);

    const { id } = useParams();

    const submitForm = async (values) => {

        if (create) {
            try {
                const response = await Post('users', values)
                return alert(response.data.message)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await Put('users', id, values)
                return alert(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getData = async () => {
        try {
            await Get('users', id)
                .then(res => {
                    const { data: { name, email, role_id, password, profile_image } } = res
                    setName(name);
                    setEmail(email);
                    setRole_id(role_id);
                    setPassword(password);
                    setProfile_Image(profile_image);
                    setCreate(false);
                })
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (id) {
            getData();
        } else {
            alert('user inexistente');
            push('/create-user');
        }
    }, []);

    const ErrorSchema = Yup.object().shape({
        name: Yup.string().required("Name is required.").min(4, "Name is too short"),
        email: Yup.string().required("Email is required.").email('Invalid email'),
        password: Yup.string().required("Password is required.").min(8, "Password is too short"),
        role_id: Yup.string().required("Role is required."),
        profile_image: Yup.string().required("Photo is required.")
    })

    const handleChange = (e, propsFormik) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                propsFormik.setFieldValue("profile_image", e.target.result);
            }
            reader.readAsDataURL(e.currentTarget.files[0]);
        }
    }

    return (
        <div>
            <Formik initialValues={{ name, email, role_id, password, profile_image }}
                onSubmit={(values => {
                    submitForm(values)
                })}
                validationSchema={ErrorSchema}
                enableReinitialize={true}
            >
                {
                    (props) => {
                        return (
                            <Form>
                                <div className="form-container">
                                    <h3>Information</h3>
                                    <label>Name: </label>
                                    <Field name={'name'} type={'text'} className="input-field" />
                                    <small>{props.errors.name}</small>
                                    <label>Email: </label>
                                    <Field name={'email'} type={'email'} className="input-field" />
                                    <small>{props.errors.email}</small>
                                    <label>Password: </label>
                                    <Field name={'password'} type={'password'} className="input-field" />
                                    <small>{props.errors.password}</small>
                                    <label>Role: </label>
                                    <Field name={'role_id'} as="select" className="select-field">
                                        <option value="">-- Select role --</option>
                                        <option value="0">User</option>
                                        <option value="1">Administrator</option>
                                    </Field>
                                    <small>{props.errors.role_id}</small>
                                    <label>Image: </label>
                                    <input
                                        type="file"
                                        name="profile_image"
                                        accept="image/png,image/jpeg"
                                        onChange={(event) => {
                                            handleChange(event, props)
                                        }}
                                    />
                                    <small>{props.errors.profile_image}</small>
                                    <button type={'submit'}
                                        disabled={!props.isValid} className="submit-btn"> Send
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default UserForm;
