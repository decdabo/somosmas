import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from "yup";

const OrganizationForm = () => {

	const [name, setName] = useState("");
	const [logo, setLogo] = useState("");
	const [short_description, setShort_description] = useState("");
	const [long_description, setLong_description] = useState("");
	const [facebook_url, setFacebook_url] = useState("");
	const [linkedin_url, setLinkedin_url] = useState("");
	const [instagram_url, setInstagram_url] = useState("");
	const [twitter_url, setTwitter_url] = useState("");

	const EditForm = (values) => {
		// TODO: Implementar llamada a la API
	};

	const url = "http://ongapi.alkemy.org/api/organization";

	useEffect(() => {
		axios.get(`${url} `)
			.then(response => {
				const {data} = response;
				const {data: data2} = data;
				const {
					name,
					email,
					short_description,
					long_description,
					facebook_url,
					linkedin_url,
					instagram_url,
					twitter_url
				} = data2;
				setName(name);
				setLogo(email);
				setShort_description(short_description);
				setLong_description(long_description);
				setFacebook_url(facebook_url);
				setLinkedin_url(linkedin_url);
				setInstagram_url(instagram_url);
				setTwitter_url(twitter_url);
			})
			.catch(error => {
				alert(error);
			});
	}, []);

	const validUrl = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9-_]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
	const ErrorSchema = Yup.object().shape({
		name: Yup.string().required("Name is required.").min(4, "Name is too short"),
		logo: Yup.string().required("Logo is required."),
		short_description: Yup.string().required("Short Description is required."),
		long_description: Yup.string().required("Long Description is required."),
		facebook_url: Yup.string().matches(validUrl, "Enter a valid URL").required("URL is required."),
		linkedin_url: Yup.string().matches(validUrl, "Enter a valid URL").required("URL is required."),
		instagram_url: Yup.string().matches(validUrl, "Enter a valid URL").required("URL is required."),
		twitter_url: Yup.string().matches(validUrl, "Enter a valid URL").required("URL is required.")
	});

	const handleChange = (e, propsFormik) => {
		if (e.currentTarget.files && e.currentTarget.files[0]){
			const  reader = new FileReader();
			reader.onload = function (e){
				propsFormik.setFieldValue("profile_image", e.target.result);
			};
			reader.readAsDataURL(e.currentTarget.files[0]);
		}
	};

	return (
		<div>
			<Formik initialValues={{
				name,
				logo,
				short_description,
				long_description,
				facebook_url,
				linkedin_url,
				instagram_url,
				twitter_url
			}} onSubmit={(values => {
				EditForm(values);
			})} validationSchema={ErrorSchema}
			enableReinitialize={true}
			>
				{
					(props) => {
						return (
							<Form className="form__user">
								<div className="form__container">
									<h3 className="txt-center">Organization Form</h3>
									<label className="my-1r">Name: </label>
									<Field name={"name"} type={"text"} className="form__input "/>
									<small  className="form__message-validation">{props.errors.name}</small>
									<label className="my-1r">Image: </label>
									<input
										type="file"
										name="logo"
										accept="image/png,image/jpeg"
										onChange={(event) => {
											handleChange(event,props);
										}}
									/>
									<small  className="form__message-validation">{props.errors.logo}</small>
									<label>Short Description: </label>
									<CKEditor
										name={"short_description"}
										editor={ClassicEditor}
										data={short_description}
										onChange={(event, editor) => {
											const data = editor.getData();
											setShort_description(data);
										}}
									/>
									<small  className="form__message-validation">{props.errors.short_description}</small>
									<label className="my-1r">Long Description: </label>
									<Field name={"long_description"} as={"textarea"} type={"text"}
										className="form__textarea"/>
									<small>{props.errors.long_description}</small>
									<label className="my-1r">Facebook: </label>
									<Field name={"facebook_url"} type={"text"} className="form__input"/>
									<small  className="form__message-validation">{props.errors.facebook_url}</small>
									<label className="my-1r">Linkedin: </label>
									<Field name={"linkedin_url"} type={"text"} className="form__input"/>
									<small  className="form__message-validation">{props.errors.linkedin_url}</small>
									<label className="my-1r">Instagram: </label>
									<Field name={"instagram_url"} type={"text"} className="form__input"/>
									<small  className="form__message-validation">{props.errors.instagram_url}</small>
									<label className="my-1r">Twitter: </label>
									<Field name={"twitter_url"} type={"text"} className="form__input"/>
									<small  className="form__message-validation">{props.errors.twitter_url}</small>
									<button type={"submit"}
										disabled={!props.isValid} className="form__btn-primary mx-auto mt-4"> Send
									</button>
								</div>
							</Form>
						);
					}
				}
			</Formik>
		</div>
	);
};

export default OrganizationForm;
