import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./NewsForm.scss";
import { Get, Post, Put } from "../../Services/privateApiService";
import {
	alertConfirmation,
	alertError,
	alertInformation,
} from "../../Services/alerts/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const NewsForm = () => {
	// const [categories, setCategories] = useState([]);
	const [existingNew, setExistingNew] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const categoriesData = useSelector((state) => state.categoriesData);

	const { id } = useParams();

	// post new article
	const submitNew = async (values, { setSubmitting, resetForm }) => {
		setMessage("");
		const body = {
			name: values.title,
			content: values.content,
			image: values.image,
			category_id: values.category,
			deleted_at: "2021-11-23T19:19:56.825Z",
		};
		const response = await Post(process.env.REACT_APP_API_NEWS, body);
		if (response.success) {
			resetForm();
			alertInformation("Creado exitosamente");
		} else {
			alertError("Algo salió mal, intente nuevamente");
		}

		setSubmitting(false);
	};

	// edit existing article
	const submitEdit = async (values, { setSubmitting }) => {
		setMessage("");
		const body = {
			name: values.title,
			content: values.content,
			category_id: values.category,
			deleted_at: "2021-11-23T19:19:56.825Z",
		};

		if (existingNew.image !== values.image) {
			body.image = values.image;
		}

		const response = await Put(process.env.REACT_APP_API_NEWS, id, body);
		if (response.success) {
			alertInformation("Actualizado exitosamente");
		} else {
			alertError("Algo salió mal, intente nuevamente");
		}

		setSubmitting(false);
	};

	//   load categories and existing article data if editting
	const loadApiData = useCallback(async () => {
		try {
			dispatch(fetchCategories());
			if (id) {
				const newData = await Get(process.env.REACT_APP_API_NEWS, id);
				if (newData.success) {
					setExistingNew(newData.data);
				}
			}
		} catch (error) {}
		setIsLoading(false);
	}, [id]);

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
		loadApiData();
	}, []);

	return (
		<>
			<div className="newsForm__titleContainer">
				<h2 className="text__title-secondary">
					{id ? "Editar noticia" : "Nueva noticia"}
				</h2>
				<Link to="/backoffice/news">
					<button className="form__btn-secondary">
						<i className="fas fa-arrow-left"></i>
					</button>
				</Link>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : id && !existingNew.id ? (
				<div className="form__container">Noticia no encontrada</div>
			) : (
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={{
						title: existingNew.name || "",
						content: existingNew.content || "",
						category: existingNew.category_id || "",
						image: existingNew.image || "",
					}}
					onSubmit={id ? submitEdit : submitNew}
					validate={(values) => {
						const errors = {};
						if (!values.title) {
							errors.title = "Ingresar un título";
						}
						if (!values.content) {
							errors.content = "Ingresar contenido";
						}
						if (!values.category) {
							errors.category = "Seleccionar categoría";
						}
						if (!values.image) {
							errors.image = "Añadir una foto";
						}
						return errors;
					}}
				>
					{({ isSubmitting, values, setFieldValue, errors }) => {
						return (
							<Form className="form__container">
								<Field
									type="text"
									name="title"
									className="form__input"
									id="title"
									placeholder="Título"
								/>
								<div className="form__message-validation">{errors.title}</div>

								<CKEditor
									editor={ClassicEditor}
									data={values.content}
									onChange={(event, editor) => {
										const data = editor.getData();
										setFieldValue("content", data);
									}}
									config={{
										placeholder: "Contenido",
									}}
								/>
								<div className="form__message-validation">{errors.content}</div>

								<Field
									name="category"
									as="select"
									className="form__select"
									children={[
										<option value="" disabled key={0}>
											Seleccionar categoría
										</option>,
									].concat(
										categoriesData.data.map((category) => (
											<option value={category.id} key={category.id}>
												{category.name}
											</option>
										))
									)}
								/>
								<div className="form__message-validation">
									{errors.category}
								</div>

								<label>
									<input
										className="form__image-input"
										type="file"
										accept="image/*"
										onChange={(e) => handleImageChange(e, setFieldValue)}
									/>

									<div className="form__image-container">
										<img
											src={values.image}
											alt="article"
											onError={(e) => {
												e.target.src =
													"https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png";
											}}
										/>
									</div>
								</label>
								<div className="form__message-validation">{errors.image}</div>

								<button
									className="form__btn-primary"
									type="submit"
									disabled={isSubmitting}
								>
									Enviar
								</button>
							</Form>
						);
					}}
				</Formik>
			)}
		</>
	);
};

export default NewsForm;
