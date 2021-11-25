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
      <label className="form__label" htmlFor={name}>
        {name}: {required && <small className="form__label-required">*</small>}
      </label>
      <CKEditor
        className="form__input"
        name={name}
        editor={classicEditor}
        data={defaultObjectValues ? defaultObjectValues[name] : ""}
        onChange={(e, editor) => (values[name] = editor.getData())}
        onBlur={() => {
          setTouched({ ...touched, [name]: true });
        }}
      />
      {errors[name] && touched[name] && (
        <div className="form__input-error">{errors[name]}</div>
      )}
    </div>
  );
};

export default InputCkEditor;
