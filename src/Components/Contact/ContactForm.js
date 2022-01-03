import React from "react";
import { useFormik } from "formik";
import "../../styles/components/formStyles.scss";
import { Post } from "../../Services/publicApiService";
import { alertError } from "../../Services/alerts/Alerts";

const initialValues = {
	name: "",
	email: "",
	phone: "",
	message: "",
};

const handleSubmit = async (values) => {
	const response = await Post(process.env.REACT_APP_CONTACTS_ENDPOINT);

	if (!response.success) alertError(response.message);
};

// VALIDACIONES
const validate = (values) => {
	let errors = {};
	if (!values.name) {
		errors.name = "Este campo es obligatorio";
	}

	if (!values.email) {
		errors.email = "Este campo es obligatorio";
	} else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
		errors.email = "Formato de email incorrecto";
	}

	if (!values.phone) {
		errors.phone = "Este campo es obligatorio";
	} else if (!/\d{8,100}$/.test(values.phone)) {
		errors.phone = "El número debe tener un mínimo de 8 dígitos";
	}

	if (!values.message) {
		errors.message = "Este campo es obligatorio";
	}

	return errors;
};

function ContactForm() {
	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validate,
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="form__container">
				<h3 className="text__title-tertiary">Contactate con nosotros</h3>
				<input
					type="text"
					id="name"
					name="name"
					className="form__input "
					placeholder="Nombre"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>

				<div className="error form__message-validation">
					{formik.errors.name}
				</div>
				<input
					type="text"
					placeholder="Email"
					id="email"
					name="email"
					className="form__input"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>

				<div className="error form__message-validation">
					{formik.errors.email}
				</div>
				<input
					type="number"
					placeholder="Teléfono"
					id="phone"
					name="phone"
					className="form__input"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
				/>

				<div className="error form__message-validation">
					{formik.errors.phone}
				</div>
				<textarea
					placeholder="Escribe tu consulta..."
					type="text"
					id="message"
					className="form__textarea"
					name="message"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.message}
				/>

				<div className="error form__message-validation">
					{formik.errors.message}
				</div>
				<button type="submit" className="form__btn-primary">
					Enviar
				</button>
			</form>
		</div>
	);
}
export default ContactForm;
