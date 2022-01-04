import React, { useState } from "react";
import "../../styles/components/formStyles.scss";
import { Formik, Form, Field } from "formik";
import useAuthActions from "../../store/hooks/useAuthActions";
import { Redirect } from "react-router";
import { Post } from "../../Services/publicApiService";
const RegisterForm = () => {
	const [formEnviado, setFormEnviado] = useState(false);
	const { isLogged } = useAuthActions();

	return (
		<>
			{isLogged ? (
				<Redirect to="/" />
			) : (
				<Formik
					initialValues={{
						name: "",
						lastName: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					validate={(values) => {
						let errores = {};

						if (!values.name.trim()) {
							errores.name = "Ingrese su nombre";
						}

						if (!values.lastName.trim()) {
							errores.lastName = "Ingrese su apellido";
						}

						if (!values.email.trim()) {
							errores.email = "Ingrese un email";
						} else if (
							!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
								values.email
							)
						) {
							errores.email = "Ingrese un email valido";
						}

						if (!values.password.trim()) {
							errores.password = "Ingrese una contraseña";
						} else if (values.password.length < 6) {
							errores.password =
								"La contraseña debe tener al menos 6 caracteres";
						} else if (values.password.search(/[a-z]/i) < 0) {
							errores.password = "La contraseña debe tener al menos una letra";
						} else if (values.password.search(/[0-9]/) < 0) {
							errores.password = "La contraseña debe tener al menos un dígito";
						} else if (values.password.search(/(?=.*[!@#$%^&*])/)) {
							errores.password =
								"La contraseña debe tener al menos un caracter especial";
						}

						if (!values.confirmPassword) {
							errores.confirmPassword = "Repita su contraseña";
						} else if (values.confirmPassword !== values.password) {
							errores.confirmPassword = "Las contraseñas deben ser iguales";
						}

						return errores;
					}}
					onSubmit={async (values, { resetForm }) => {
						const response = await Post("register", {
							name: values.name,
							email: values.email,
							password: values.password,
						});

						if (response.success) {
							setFormEnviado(true);
							setTimeout(() => {
								setFormEnviado(false);
							}, 10000);

							resetForm();
						}
					}}
				>
					{({ errors }) => (
						<div className="login__container">
							<div className="text__title-secondary txt-center">
								Crear cuenta
							</div>
							<Form className="form__container">
								<Field
									className="form__input"
									type="text"
									name="name"
									id="name"
									placeholder="Nombre"
								/>

								<div className="form__message-validation">{errors.name}</div>

								<Field
									className="form__input"
									type="text"
									name="lastName"
									id="lastName"
									placeholder="Apellido"
								/>

								<div className="form__message-validation">
									{errors.lastName}
								</div>

								<Field
									className="form__input"
									type="email"
									name="email"
									id="email"
									placeholder="Email"
								/>
								<div className="form__message-validation">{errors.email}</div>

								<Field
									className="form__input"
									type="password"
									name="password"
									id="password"
									placeholder="Contraseña"
								/>
								<div className="form__message-validation">
									{errors.password}
								</div>

								<Field
									className="form__input"
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									placeholder="Confirmar contraseña"
								/>
								<div className="form__message-validation">
									{errors.confirmPassword}
								</div>

								<button className="form__btn-primary" type="submit">
									Enviar
								</button>

								<p className="form__message-success">
									{formEnviado && "Form submitted successfully"}
								</p>
							</Form>
						</div>
					)}
				</Formik>
			)}
		</>
	);
};

export default RegisterForm;
