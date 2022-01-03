import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect, Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Popup from "reactjs-popup";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import * as Yup from "yup";
import "./UserForm.scss";
import { Get } from "../../Services/publicApiService";
import { Put, Post } from "../../Services/privateApiService";

import termsConditions from "../../assets/files/TyC.pdf";
import { alertError } from "../../Services/alerts/Alerts";
import useAuthActions from "../../store/hooks/useAuthActions";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const UserForm = () => {
	const { push } = useHistory();
	const { isLogged } = useAuthActions();
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role_id, setRole_id] = useState("");
	const [password, setPassword] = useState("");
	const [profile_image, setProfile_Image] = useState("");
	const [terms, setTerms] = useState(false);

	const { id } = useParams();

	const handleTerms = (accept, close) => {
		close();
		if (accept) {
			setTerms(true);
		} else {
			setTerms(false);
			alertError("Debes aceptar los términos y condiciones para continuar");
		}
	};

	const submitForm = async (values) => {
		if (id) {
			const response = await Put("users", id, values);
			if (response.success) {
				setMessage("Usuario actualizado");
			}
		} else {
			const response = await Post("users", values);
			if (response.success) {
				setMessage("Usuario creado");
			}
		}
	};

	const getData = async () => {
		if (id) {
			const res = await Get("users", id);
			if (res.success) {
				const {
					data: { name, email, role_id, password, profile_image },
				} = res;
				setName(name);
				setEmail(email);
				setRole_id(role_id);
				setPassword(password);
				setProfile_Image(profile_image || "");
			} else {
				alertError("Algo ha fallado, intente nuevamente");
			}
		} else {
			push("/create-user");
		}
		setIsLoading(false);
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

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<div className="newsForm__titleContainer">
				<h2 className="text__title-secondary">
					{id ? "Editar usuario" : "Crear usuario"}
				</h2>
				<Link to="/backoffice/users">
					<button className="form__btn-secondary">
						<i className="fas fa-arrow-left"></i>
					</button>
				</Link>
			</div>
			{!isLogged ? (
				<Redirect to="/login-form" />
			) : (
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
							<Form className="form__container">
								<Field
									name="name"
									type="text"
									placeholder="Nombre"
									className="form__input"
								/>
								<div className="form__message-validation">
									{props.errors.name}
								</div>
								<Field
									name="email"
									type="email"
									placeholder="Email"
									className="form__input"
								/>
								<div className="form__message-validation">
									{props.errors.email}
								</div>
								<Field
									name="password"
									type="password"
									className="form__input"
									placeholder="Contraseña"
								/>
								<div className="form__message-validation">
									{props.errors.password}
								</div>
								<label>Rol: </label>
								<Field name="role_id" as="select" className="form__select">
									<option value="">Seleccionar rol</option>
									<option value="0">User</option>
									<option value="1">Administrator</option>
								</Field>
								<div className="form__message-validation">
									{props.errors.role_id}
								</div>
								<label>
									<input
										className="form__image-input"
										type="file"
										accept="image/*"
										onChange={(event) => {
											handleChange(event, props);
										}}
									/>

									<div className="form__image-container">
										<img
											src={props.values.profile_image}
											alt="article"
											onError={(e) => {
												e.target.src =
													"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
											}}
										/>
									</div>
								</label>

								<div className="form__message-validation">
									{props.errors.profile_image}
								</div>
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
											<Document
												className="userForm__document"
												file={termsConditions}
												loading={
													<div className="flex align-center">
														<LoadingSpinner />
													</div>
												}
											>
												<Page
													pageNumber={1}
													canvasBackground="#eee"
													width={500}
												/>
												<div className="width-50 m-auto">
													<div className="flex justify-around my-10px">
														<button
															className="form__btn-secondary"
															onClick={() => handleTerms(true, close)}
														>
															Aceptar
														</button>
														<button
															className="form__btn-tertiary"
															onClick={() => handleTerms(false, close)}
														>
															Cancelar
														</button>
													</div>
												</div>
											</Document>
										)}
									</Popup>
								</div>
								<button
									type="submit"
									disabled={!terms}
									className="form__btn-primary mx-auto"
								>
									Enviar
								</button>
								<div className="form__message-success">{message}</div>
							</Form>
						);
					}}
				</Formik>
			)}
		</>
	);
};

export default UserForm;
