import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/transaccion/";

export const apiTransacion = async () => {
    try {
        const { data: { listaTransacciones } } = await axios.get(`${URL}mostrar-all`,
            { headers: { 'x-token': token } });
        return listaTransacciones;
    } catch ({ response: { data: { error } } }) {
        if (error === 'Token no válido') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al mostrar las transacciones del usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiTransacionId = async (id) => {
    try {
        const { data: { transaccion } } = await axios.get(`${URL}mostrar-cuenta/${id}`,
            { headers: { 'x-token': token } });
        return transaccion;
    } catch ({ response: { data: { error } } }) {
        if (error === 'Token no válido') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al mostrar las transacciones del usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}