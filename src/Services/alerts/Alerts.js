import Swal from "sweetalert2";
import "./sweetalert.scss";

export const alertConfirmation = (textConfirmation = "", textSuccess = "") => {
	Swal.fire({
		title: "Está seguro que desea confirmar?",
		text: textConfirmation,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#dc817e",
		cancelButtonText: "Cancelar",
		confirmButtonText: "Si, confirmar!",
	}).then((result) => {
		if (result.value === true) {
			Swal.fire("Confirmado!", `${textSuccess}`, "success");
		}
	});
};

export const alertError = (textInformation = "") => {
	Swal.fire({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
		icon: "error",
		title: textInformation,
		customClass: {
			popup: "alert__popup",
		},
	});
};

export const alertInformation = (textInformation = "") => {
	Swal.fire({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
		icon: "success",
		title: textInformation,
		customClass: {
			popup: "alert__popup",
		},
	});
};
