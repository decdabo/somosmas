import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classicEditor from "@ckeditor/ckeditor5-build-classic";
const InputCkEditor = ({
	name,
	required,
	values,
	defaultObjectValues,
	setTouched,
	touched,
	errors,
}) => {
	return (
		<div>
			<CKEditor
				className="form__input"
				name={name}
				editor={classicEditor}
				data={defaultObjectValues ? defaultObjectValues[name] : ""}
				onChange={(e, editor) => (values[name] = editor.getData())}
				onBlur={() => {
					setTouched({ ...touched, [name]: true });
				}}
				config={{
					placeholder: "Contenido",
				}}
			/>

			<div className="form__message-validation">{errors[name]}</div>
		</div>
	);
};

export default InputCkEditor;
