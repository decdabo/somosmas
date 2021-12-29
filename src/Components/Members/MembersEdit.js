import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Get } from "../../Services/publicApiService";
import { Post, Put } from "../../Services/privateApiService";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./MembersEdit.scss";
import { alertError } from "../../Services/alerts/Alerts";
const validUrl =
	/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const linkedInUrl =
	/(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const SignupSchema = Yup.object().shape({
	name: Yup.string()

		.min(4, "Mínimo 4 caráctares")

		.max(70, "Demasiado largo!")

		.required("Porfavor ingrese el nombre"),

	description: Yup.string()
		.required("Porfavor ingrese una descripción")
		.min(8, "Mínimo 8 caráctares"),
	image: Yup.string().required("Porfavor ingrese una imagen"),
	facebookUrl: Yup.string()
		.matches(validUrl, "Porfavor, ingrese una Url válida")
		.required("Porfavor ingrese el link"),
	linkedinUrl: Yup.string()
		.matches(linkedInUrl, "Porfavor, ingrese una Url válida")
		.required("Porfavor ingrese el link"),
});

const MembersEdit = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [facebookUrl, setFacebookUrl] = useState("");
	const [linkedinUrl, setLinkedinUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();
	const getMember = async () => {
		await Get(process.env.REACT_APP_API_MEMBERS, id).then((res) => {
			const {
				data: { name, description, image, facebookUrl, linkedinUrl },
			} = res;
			setName(name);
			setDescription(description);
			setImage(image);
			setFacebookUrl(facebookUrl);
			setLinkedinUrl(linkedinUrl);
		});
		setIsLoading(false);
	};

	const submitEdit = async (values) => {
		const body = { ...values };
		if (image == values.image) {
			delete body.image;
		}
		const response = await Put(process.env.REACT_APP_API_MEMBERS, id, body);

		if (!response.success) {
			alertError("Algo salio mal");
		}
	};

	const SubmitNew = async (values) => {
		const response = await Post(process.env.REACT_APP_API_MEMBERS, values);
		if (!response.success) {
			alertError("Algo salio mal");
		}
	};

	useEffect(() => {
		if (id) {
			getMember();
		} else {
			setIsLoading(false);
		}
	}, []);

	const handleImageChange = (e, setFieldValue) => {
		if (e.currentTarget.files && e.currentTarget.files[0]) {
			const reader = new FileReader();

			reader.onload = function (e) {
				setFieldValue("image", e.target.result);
			};

			reader.readAsDataURL(e.currentTarget.files[0]);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Formik
				initialValues={{
					name,
					description,
					image,
					facebookUrl,
					linkedinUrl,
				}}
				validationSchema={SignupSchema}
				onSubmit={id ? submitEdit : SubmitNew}
			>
				{({ errors, setFieldValue, values }) => (
					<Form className="form__container">
						<h3 className="text__title-tertiary">
							{id ? "Editar miembro" : "Nuevo miembro"}
						</h3>
						<Field
							className="form__input form__members-input"
							type="text"
							id="name"
							name="name"
							placeholder="Nuevo nombre"
						/>
						<div className="form__message-validation">{errors.name}</div>

						<CKEditor
							editor={ClassicEditor}
							data={values.description}
							onChange={(event, editor) => {
								const data = editor.getData();
								setFieldValue("description", data);
							}}
							config={{
								placeholder: "Nueva descripción",
							}}
						/>

						<div className="form__message-validation">{errors.description}</div>
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
						<Field
							className="form__input form__members-input"
							id="facebookUrl"
							type="text"
							name="facebookUrl"
							placeholder="Facebook Url"
						/>

						<div className="form__message-validation">{errors.facebookUrl}</div>

						<Field
							className="form__input form__members-input"
							id="linkedinUrl"
							type="text"
							name="linkedinUrl"
							placeholder="LinkedIn Url"
						/>

						<div className="form__message-validation">{errors.linkedinUrl}</div>

						<button className="form__btn-primary" type="submit">
							Enviar
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default MembersEdit;
