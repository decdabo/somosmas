import React, { useState, useEffect } from "react";
import "../../styles/components/formStyles.scss";
import { Formik, Form, Field } from "formik";
import useAuthActions from "../../store/hooks/useAuthActions";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
	const [initialValues, setInitialValues] = useState({
		email: "",
		password: "",
	});
	const history = useHistory();
	const [formEnviado, setFormEnviado] = useState(false);
	const { validateUserLogin, isLogged } = useAuthActions();

	useEffect(() => {
		if (isLogged) history.push({ pathname: "/" });
		const timeout = setTimeout(() => {
			setFormEnviado(false);
		}, 2000);
		return () => {
			timeout;
		};
	}, [formEnviado]);

	return (
		<>
			<h1 className="title my-10px txt-center">Login</h1>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validate={(values) => {
					let errores = {};

					if (!values.email.trim()) {
						errores.email = "Please enter an email";
					} else if (
						!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
							values.email
						)
					) {
						errores.email = "Please enter a valid email";
					}

					if (!values.password.trim()) {
						errores.password = "Please enter a password";
					} else if (values.password.length < 6) {
						errores.password = "Your password must be at least 6 characters";
					} else if (values.password.search(/[a-z]/i) < 0) {
						errores.password =
							"Your password must contain at least one letter.";
					} else if (values.password.search(/[0-9]/) < 0) {
						errores.password = "Your password must contain at least one digit.";
					} else if (values.password.search(/(?=.*[!@#$%^&*])/)) {
						errores.password =
							"Your password must contain at least one special character.";
					}

					return errores;
				}}
				onSubmit={(values, { resetForm }) => {
					setFormEnviado(false);
					validateUserLogin(values.email, values.password)
						.then(() => {
							if (isLogged) {
								resetForm();
								setInitialValues({
									email: "",
									password: "",
								});
							}
							setFormEnviado(true);
						})
						.catch(() => {
							setFormEnviado(true);
						});
				}}
			>
				{({ errors }) => (
					<Form className="form__container">
						<Field
							className="form__input"
							id="email"
							type="email"
							name="email"
							placeholder="Enter email"
						/>

						<div className="form__message-validation">{errors.email}</div>

						<Field
							className="form__input"
							id="password"
							type="password"
							name="password"
							placeholder="Enter password"
						/>

						<div className="form__message-validation">{errors.password}</div>

						<button className="form__btn-primary" type="submit">
							Login
						</button>

						<div
							className={
								isLogged ? "form__message-success" : "form__message-fail"
							}
						>
							{formEnviado
								? isLogged
									? "Login exitoso"
									: "Usuario y/o contraseña incorrecto"
								: null}
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
