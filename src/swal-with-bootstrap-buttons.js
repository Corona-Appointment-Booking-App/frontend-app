import Swal from "sweetalert2";

export default Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
