import { useEffect, useState } from "react";

import { Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { validate } from "./helpers/slideValidations";
import { Get, Post } from "../../Services/publicApiService";
import { Put } from "../../Services/privateApiService";
import "../../styles/components/formStyles.scss";
import "./slidesForm.scss";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { alertError, alertInformation } from "../../Services/alerts/Alerts";

const SlidesForm = ({ type = "slides" }) => {
	const [slide, setSlide] = useState({});
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
			Get(`${type}/${id}`).then((r) => {
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
					const response = await Post(type, values);
					if (response.success) {
						alertInformation("Creado exitosamente");
					} else {
						alertError("Algo ha fallado, intente nuevamente");
					}

					resetForm();
				} else {
					const body = { ...values };
					if (values.image === slide.image) {
						delete body.image;
					}
					const response = await Put(type, id, body);
					if (response.success) {
						alertInformation("Editado exitosamente");
					} else {
						alertError("Algo ha fallado, intente nuevamente");
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
					<>
						<div className="newsForm__titleContainer">
							<h2 className="text__title-secondary">
								{id ? `Editar ${type}` : `Crear ${type}`}
							</h2>
							<Link to={`/backoffice/${type}`}>
								<button className="form__btn-secondary">
									<i className="fas fa-arrow-left"></i>
								</button>
							</Link>
						</div>

						<h2 className="text__title-secondary"></h2>
						<form className="form__container" onSubmit={handleSubmit}>
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
							<div className="form__message-validation">
								{errors.description}
							</div>
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
										alt={type}
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
						</form>
					</>
				);
			}}
		</Formik>
	);
};

export default SlidesForm;
