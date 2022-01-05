import React from "react";

const InputText = ({
	name,
	required,
	handleChange,
	handleBlur,
	values,
	errors,
	touched,
}) => {
	return (
		<>
			<input
				type="text"
				placeholder={`${name}...`}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
				className="form__input"
				value={values[name]}
			/>

			<div className="form__message-validation">{errors[name]}</div>
		</>
	);
};

export default InputText;
