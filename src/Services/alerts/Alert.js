import Swal from "sweetalert2";
//import '../../styles/variables.scss'

export const alertConfirmation = (textConfirmation) => {
  
  Swal.fire({
    title: `¿Estás seguro que deseas ${textConfirmation}?`,    
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#dc817e',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    
    if (result.value === true) {
      Swal.fire(
        'Confirmado!',
        ``,
        'success',
        
      )
    }
  })
}

export const alertError = (textError) => {
  
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: textError,
  })
}
export const alertInformation = (textInformation) => {
  Swal.fire({
    type: 'info',
    title: 'Información',
    text: textInformation,
  })
}
  