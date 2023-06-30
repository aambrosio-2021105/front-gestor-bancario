import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "http://localhost:8080/api/admin/";

export const apiAdminCreate = async ( nombre,username, correo, password) => {
    try {
        const userSave = await axios.post(
            `${URL}agregar-admin`, {
            nombre: nombre,
            username: username,
            correo: correo,
            password: password,
        }, { headers: { "x-token": token } });
        return true;

    } catch ({ response: { data: { msg } } }) {

        if (msg === 'el token ha expirado') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        } {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar',
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}
