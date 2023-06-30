import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/cuenta/";

export const apiCuenta = async () => {
    try {
        const { data: { listaCuentas } } = await axios.get(`${URL}mostrar-all`,
            { headers: { 'x-token': token } });
        return listaCuentas;
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
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error al mostrar las cuentas del usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}
