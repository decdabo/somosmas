const validateCategoryForm = ({ name, description, image }, imageInputRef) => {
	let errors = {};

	if (!name) {
		errors.name = "Name is required.";
	} else {
		//   NAME VALIDATIONS
		if (name.length < 4) {
			errors.name = "Name length must be greater than 4";
		}
	}

	//   Description validation
	if (!description) {
		errors.description = "Description is required.";
	}

	//   IMAGE INPUT VALIDATIONS
	// const fieldFiles = imageInputRef.current.files;
	// if (!image) {
	// 	if (fieldFiles.length === 0) {
	// 		errors.image = "Image is required.";
	// 	} else {
	// 		if (fieldFiles.length > 1) {
	// 			errors.image = "Only one image is allowed.";
	// 		}
	// 		if (
	// 			fieldFiles[0].type !== "image/png" &&
	//     fieldFiles[0].type !== "image/jpeg"
	// 		) {
	// 			errors.image = "Only jpg and png format are allowed.";
	// 		}
	// 	}
	// }

	return errors;
};

export { validateCategoryForm };
