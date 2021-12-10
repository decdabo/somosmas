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
    <>
      <label htmlFor={name} onBlur={handleBlur}>
        <input
          type="file"
          name={name}
          id={name}
          ref={imageInputRef}
          onChange={(e) => {
            handleChange(e);
            fileReader.readAsDataURL(e.target.files[0]);
          }}
          className="form__image-input"
          accept="image/png,  image/jpeg"
        />
        {/* {values[name] ? (
          <div className="form__image-container">
            <img src={imagePreview} alt="preview" />
          </div>
        ) : null} */}
        <div className="form__image-container">
          <img
            src={
              imagePreview ||
              "https://www.sedistudio.com.au/wp-content/themes/sedi/assets/images/placeholder/placeholder.png"
            }
            alt="preview"
          />
        </div>

        <div className="form__message-validation">{errors[name]}</div>
      </label>
    </>
  );
};

export default InputImageFile;
