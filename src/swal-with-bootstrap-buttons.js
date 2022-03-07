import Swal from "sweetalert2";

export default Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary mr-1",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
