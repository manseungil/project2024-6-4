import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/**
 * icon : success, error, warning, info, question
 */

const MySwal = withReactContent(Swal)

// 기본 alert
export const alert = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: "#ED648B",
        confirmButtonText: "OK",
        confirmButtonTextColor: "white",
    })
    .then( callback )
  }

// confirm
export const confirm = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonColor: "#f4c2d0",
        cancelButtonText: "No",
        confirmButtonColor: "#ED648B",
        confirmButtonText: "Yes",
    })
        .then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
}

export const confirms = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonColor: "#f4c2d0",
        cancelButtonText: "No",
        confirmButtonColor: "#ED648B",
        confirmButtonText: "Yes",
    })
        .then( callback )
}
