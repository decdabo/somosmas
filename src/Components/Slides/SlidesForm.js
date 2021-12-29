import { useEffect, useState } from "react";

import { Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { validate } from "./helpers/slideValidations";
import { Get, Post } from "../../Services/publicApiService";
import { Put } from "../../Services/privateApiService";
import "../../styles/components/formStyles.scss";
import "./slidesForm.scss";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const SlidesForm = () => {
	const [slide, setSlide] = useState({});
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	const handleImageChange = (e, setFieldValue) => {
		if (e.currentTarget.files && e.currentTarget.files[0]) {
			const reader = new FileReader();

			reader.onload = function (e) {
				setFieldValue("image", e.target.result);
			};

			reader.readAsDataURL(e.currentTarget.files[0]);
		}
	};
	useEffect(() => {
		if (id) {
			Get(`slides/${id}`).then((r) => {
				if (r.success) {
					setSlide(r.data);
				}
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Formik
			initialValues={{
				name: slide.name || "",
				description: slide.description || "",
				order: slide.order || "",
				image: slide.image || "",
			}}
			onSubmit={async (values, { resetForm }) => {
				if (!id) {
					const response = await Post("slides", values);
					if (response.success) {
						setMessage("Creado exitosamente");
					}

					resetForm();
				} else {
					const body = { ...values };
					if (values.image === slide.image) {
						delete body.image;
					}
					const response = await Put("slides", id, body);
					if (response.success) {
						setMessage("Editado exitosamente");
					}
				}
			}}
			validate={validate}
		>
			{({
				values,
				errors,
				handleSubmit,
				handleChange,
				handleBlur,
				setFieldValue,
			}) => {
				return (
					<form className="form__container" onSubmit={handleSubmit}>
						<h3 className="text__title-tertiary">
							{id ? "Editar slides" : "Crear slides"}
						</h3>
						<input
							id="name"
							className="form__input"
							type="text"
							name="name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
							placeholder="Nombre"
							autoComplete="off"
						/>

						<div className="form__message-validation">{errors.name}</div>
						<CKEditor
							className="form__input"
							id="description"
							editor={ClassicEditor}
							data={values.description}
							onChange={(e, editor) => {
								setFieldValue("description", editor.getData());
							}}
							config={{
								placeholder: "Descripción",
							}}
						/>
						<div className="form__message-validation">{errors.description}</div>
						<input
							className="form__input"
							type="text"
							name="order"
							id="order"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.order}
							placeholder="Orden"
							autoComplete="off"
						/>
						<div className="form__message-validation">{errors.order}</div>
						<label>
							<input
								className="form__image-input"
								type="file"
								accept="image/*"
								onChange={(e) => handleImageChange(e, setFieldValue)}
								onBlur={handleBlur}
							/>

							<div className="form__image-container">
								<img
									src={values.image}
									alt="slide"
									onError={(e) => {
										e.target.src =
											"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
									}}
								/>
							</div>
						</label>

						<div className="form__message-validation">{errors.image}</div>
						<button className="form__btn-primary" type="submit">
							Enviar
						</button>
						<div
							className={
								message.includes("mal")
									? "form__message-fail"
									: "form__message-success"
							}
						>
							{message}
						</div>
					</form>
				);
			}}
		</Formik>
	);
};

export default SlidesForm;
