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
    <div>
      <label className="form__label" htmlFor={name}>
        {name}: {required && <small className="form__label-required">*</small>}
      </label>
      <input
        type="text"
        placeholder={`${name}...`}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form__input"
        defaultValue={values[name]}
      />
      {errors[name] && touched[name] && (
        <div className="form__input-error">{errors[name]}</div>
      )}
    </div>
  );
};

export default InputText;
