import React from "react";

const InputImageFile = ({
  name,
  values,
  handleBlur,
  fileReader,
  handleChange,
  imageInputRef,
  errors,
  touched,
  imagePreview,
  required,
}) => {
  return (
    <div>
      <label className="form__label" htmlFor={name} onBlur={handleBlur}>
        {values[name] || (
          <span>
            Choose an image...
            {required && <small className="form__label-required">*</small>}
          </span>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        ref={imageInputRef}
        onChange={(e) => {
          handleChange(e);
          fileReader.readAsDataURL(e.target.files[0]);
        }}
        className="form__input"
        accept="image/png,  image/jpeg"
      />
      {errors[name] && touched[name] && (
        <div className="form__input-error">{errors[name]}</div>
      )}
      {values[name] ? (
        <div>
          <img
            src={imagePreview}
            className="form__image-preview"
            alt="preview"
          />
        </div>
      ) : null}
    </div>
  );
};

export default InputImageFile;
