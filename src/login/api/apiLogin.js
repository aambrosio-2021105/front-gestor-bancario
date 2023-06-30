import axios from 'axios';
import Swal from 'sweetalert2';

export const apiLogin = async (username, password) => {
    try {
        const URL = 'http://localhost:8080/api/auth/login'
        const response = await axios.post(`${URL}`, {
            username,
            password
        });
        const token = response.data.token;
        //Guardar token en el almacenamiento local del navegador (Local storage)
        (token) ? localStorage.setItem("token", token) : null;
        return token;
    } catch ({ response: { data: { error } } }) {
        Swal.fire({
            icon: 'error',
            title: 'Error de Login',
            text: error
        });
    }
}
