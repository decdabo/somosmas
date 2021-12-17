import Swal from "sweetalert2";
//import '../../styles/variables.scss'

export const alertConfirmation = (textConfirmation = "", textSuccess = "") => {
  
	Swal.fire({
		title: "Está seguro que desea confirmar?",
		text: textConfirmation,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#dc817e",
		cancelButtonText: "Cancelar",
		confirmButtonText: "Si, confirmar!"
	}).then((result) => {
    
		if (result.value === true) {
			Swal.fire(
				"Confirmado!",
				`${textSuccess}`,
				"success",
        
			);
		}
	});
};

export const alertError = (textError = "") => {
  
	Swal.fire({
		type: "error",
		title: "Ups!",
		text: textError,
	});
};
export const alertInformation = (textInformation = "") => {
	Swal.fire({
		type: "info",
		title: "Información",
		text: textInformation,
	});
};
  