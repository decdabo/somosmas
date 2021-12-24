import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Popup from "reactjs-popup";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import * as Yup from "yup";
import "./UserForm.scss";
import "../../utils.scss";
import { Get, Post } from "../../Services/publicApiService";
import "../../styles/components/formStyles.scss";
import { Put } from "../../Services/privateApiService";

import LoaderComponent from "../Loader/Loader";
import termsConditions from "../../assets/files/TyC.pdf";
import { alertError, alertInformation } from "../../Services/alerts/Alerts";
import useAuthActions from "../../store/hooks/useAuthActions";

const UserForm = () => {
	const { push } = useHistory();
	const { isLogged } = useAuthActions();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role_id, setRole_id] = useState("");
	const [password, setPassword] = useState("");
	const [profile_image, setProfile_Image] = useState("");
	const [create, setCreate] = useState(true);
	const [terms, setTerms] = useState(false);

	const { id } = useParams();

	const handleTerms = (accept, close) => {
		close();
		if (accept) {
			setTerms(true);
			alertInformation("Has aceptado los términos y condiciones");
		} else {
			setTerms(false);
			alertError("Debes aceptar los términos y condiciones para continuar");
		}
	};

	const submitForm = async (values) => {
		if (create) {
			try {
				const response = await Post("users", values);
				return alert(response.data.message);
			} catch (error) {
				alertError(error);
			}
		} else {
			try {
				const response = await Put("users", id, values);
				return alert(response.data.message);
			} catch (error) {
				alertError(error);
			}
		}
	};

	const getData = async () => {
		if (id) {
			try {
				await Get("users", id).then((res) => {
					const {
						data: { name, email, role_id, password, profile_image },
					} = res;
					setName(name);
					setEmail(email);
					setRole_id(role_id);
					setPassword(password);
					setProfile_Image(profile_image);
					setCreate(false);
				});
			} catch (error) {
				alertError(error);
			}
		} else {
			alertError("usuario inexistente");
			push("/create-user");
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const ErrorSchema = Yup.object().shape({
		name: Yup.string()
			.required("Name is required.")
			.min(4, "Name is too short"),
		email: Yup.string().required("Email is required.").email("Invalid email"),
		password: Yup.string()
			.required("Password is required.")
			.min(8, "Password is too short"),
		role_id: Yup.string().required("Role is required."),
		profile_image: Yup.string().required("Photo is required."),
	});

	const handleChange = (e, propsFormik) => {
		if (e.currentTarget.files && e.currentTarget.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				propsFormik.setFieldValue("profile_image", e.target.result);
			};
			reader.readAsDataURL(e.currentTarget.files[0]);
		}
	};

	return (
		<div>
		{isLogged ? (<Redirect to="/login-form"/>)
			: (
				<Formik
					initialValues={{ name, email, role_id, password, profile_image }}
					onSubmit={(values) => {
						submitForm(values);
					}}
					validationSchema={ErrorSchema}
					enableReinitialize={true}
				>
					{(props) => {
						return (
							<Form className="form__user">
								<div className="form__container">
									<h3 className="txt-center">User Form</h3>
									<label>Name: </label>
									<Field name={"name"} type={"text"} className="form__input" />
									<small className="form__message-validation">
										{props.errors.name}
									</small>
									<label>Email: </label>
									<Field name={"email"} type={"email"} className="form__input" />
									<small className="form__message-validation">
										{props.errors.email}
									</small>
									<label>Password: </label>
									<Field
										name={"password"}
										type={"password"}
										className="form__input"
									/>
									<small className="form__message-validation">
										{props.errors.password}
									</small>
									<label>Role: </label>
									<Field name={"role_id"} as="select" className="form__select">
										<option value="">-- Select role --</option>
										<option value="0">User</option>
										<option value="1">Administrator</option>
									</Field>
									<small className="form__message-validation">
										{props.errors.role_id}
									</small>
									<label>Image: </label>
									<input
										type="file"
										name="profile_image"
										accept="image/png,image/jpeg"
										onChange={(event) => {
											handleChange(event, props);
										}}
									/>
									<small className="form__message-validation">
										{props.errors.profile_image}
									</small>
									<div className="my-10px text-center ">
										<Popup
											trigger={
												<button
													type="button"
													className="form__btn-primary my-10px"
													id="termsConditions"
												>
													Terminos y Condiciones
												</button>
											}
											position="top left"
											modal
										>
											{(close) => (
												<div>
													<Document
														file={termsConditions}
														loading={
															<div className="flex align-center">
																<LoaderComponent />
															</div>
														}
													>
														<Page pageNumber={1} canvasBackground={"#f2f2f2"} />
													</Document>
													<div className="width-50 m-auto ">
														<div className="flex justify-around my-10px">
															<button
																className="form__btn-primary"
																onClick={() => handleTerms(true, close)}
															>
																Aceptar
															</button>
															<button
																className="form__btn-secondary"
																onClick={() => handleTerms(false, close)}
															>
																Cancelar
															</button>
														</div>
													</div>
												</div>
											)}
										</Popup>
									</div>
									<button
										type="submit"
										disabled={!props.isValid && !terms}
										className="form__btn-primary mx-auto"
									>
										{" "}
										Send
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			)
		}
		</div>
	);
};

export default UserForm;
