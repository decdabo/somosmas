import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { validateCategoryForm } from "../../schemas/categoryFormValidation";
import {
	modifyCategory,
	uploadCategory,
} from "../../Services/privateApi/categoryApi";
import useCategoriesForm from "../../hooks/useCategoriesForm";
import InputImageFile from "./InputImageFile";
import InputText from "./InputText";
import InputCkEditor from "./InputCkEditor";
import { Link, useParams } from "react-router-dom";
import { Get } from "../../Services/privateApiService";
import LoadingSpinner from "../Spinner/LoadingSpinner";

/*

INPUTS:
category => object => {
    id => number
    name: => string,
    description: => string,
    image: => string (blob, base64),
}

FUNCTION: 
take some inputs and decide if it is going to 
create a category 
or modify an existent one



OUTPUTS => Form component and api call


*/

const CategoriesForm = () => {
	const [category, setCategory] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { imageInputRef, imagePreview, status, setStatus, fileReader } =
		useCategoriesForm(category);

	const { id } = useParams();

	const getCategory = async () => {
		const response = await Get("categories", id);
		if (response.success) {
			setCategory(response.data);
		}
		setIsLoading(false);
	};

	const handleSubmit = (values) => {
		!id
			? uploadCategory({ ...values, image: imagePreview })
					.then((res) => {
						setStatus(res);
					})
					.catch((err) => {
						setStatus(err);
					})
			: modifyCategory({
					...values,
					// image: imagePreview,
					id: id,
			  })
					.then((res) => {
						setStatus(res);
					})
					.catch((err) => {
						setStatus(err);
					});
	};

	const emptyCategoryData = {
		name: "",
		description: "",
		image: `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==`,
	};

	const chooseInitialData = id
		? {
				name: category.name,
				description: category.description,
				image: category.image,
		  }
		: emptyCategoryData;

	useEffect(() => {
		if (id) {
			getCategory();
		} else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<div className="newsForm__titleContainer">
				<h2 className="text__title-secondary">
					{id ? "Editar categoría" : "Crear categoría"}
				</h2>
				<Link to="/backoffice/categories">
					<button className="form__btn-secondary">
						<i className="fas fa-arrow-left"></i>
					</button>
				</Link>
			</div>

			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={chooseInitialData}
				initialErrors={emptyCategoryData}
				validate={(values) => {
					// ALSO VALIDATES IMAGE INPUT
					return validateCategoryForm(values, imageInputRef);
				}}
				onSubmit={handleSubmit}
			>
				{({
					handleBlur,
					touched,
					errors,
					values,
					handleChange,
					setTouched,
				}) => (
					<Form className="form__container">
						<InputText
							name="name"
							required={true}
							handleChange={handleChange}
							handleBlur={handleBlur}
							defaultValue={values.name}
							values={values}
							errors={errors}
							touched={touched}
						/>

						<InputCkEditor
							name="description"
							required={true}
							values={values}
							defaultObjectValues={category}
							setTouched={setTouched}
							touched={touched}
							errors={errors}
						/>
						{/* <InputImageFile
							name="image"
							values={values}
							handleBlur={handleBlur}
							fileReader={fileReader}
							handleChange={handleChange}
							imageInputRef={imageInputRef}
							errors={errors}
							touched={touched}
							imagePreview={imagePreview}
							required={true}
						/> */}

						<button className="form__btn-primary" type="submit">
							Enviar
						</button>
						{setStatus && (
							<div
								className={
									/success/gi.test(status)
										? "form__message-success"
										: "form__message-fail"
								}
							>
								{status}
							</div>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

export default CategoriesForm;
