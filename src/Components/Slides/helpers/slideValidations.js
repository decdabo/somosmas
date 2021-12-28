export const validate = (values) => {
	const errors = {};
	const extension = values.image.split(".").pop();

	if (!values.name) {
		errors.name = "El nombre es obligatorio";
	} else if (values.name.length < 4) {
		errors.name = "El nombre debe tener 4 caracteres o mas.";
	}

	if (!values.description) {
		errors.description = "La descripcion es obligatoria.";
	}

	if (!values.order) {
		errors.order = "El orden es obligatorio.";
	}

	if (!values.image) {
		errors.image = "La imagen es obligatoria.";
	}
	//  else if (extension !== "png" && extension !== "jpg") {
	// 	errors.image = `La extension ${extension} no esta permitida.`;
	// }
	return errors;
};
