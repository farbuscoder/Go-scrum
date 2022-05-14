import react from "react";
import Swal from "sweetalert2";

export const swal = () => {
  Swal.fire({
    icon: "error",
    title: "Credenciales invalidas",
    text: "Por favor introduzca credenciales validas.",
    width: "400px",
    timer: 4500,
    timerProgressBar: true,
  });
};
