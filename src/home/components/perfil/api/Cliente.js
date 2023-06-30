import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "http://localhost:8080/api/cliente/";

// Mostrar informacion
export const apiCliente = async () => {
    try {

        const { data: { cliente } } = await axios.get(`${URL}mostrar`,
        { headers: { "x-token": token } });
        console.log(cliente);
        return cliente;

    } catch ({ response: { data: { message: error } } }) {
        return data.message;
    }
}

export const apiClienteUpdate = async (username ,celular ,correo, password) => {
    console.log(username);
    console.log(celular);
    console.log(correo);
    console.log(password);
    try {
        const userSave = await axios.put(`${URL}editar`, {
            username: username,
            celular: celular,
            correo: correo,
            password: password
        }, { headers: { "x-token": token } });
        console.log(userSave);
        return true;

    } catch ({ response: { data: { error } } }) {
        
        if (error === 'el token ha expirado') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: 'Inicie sesion de nuevo',
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                }
            });
        }    {
            Swal.fire({
                icon: 'error',
                title: 'Error al editar',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}

export const apiClienteDelete = async( ) => {
    try {
        const {} = await axios.delete(`${URL}eliminar`,
         { headers: { "x-token": token } });
         return true;
    } catch ({ response: { data: { error } } }) {
        
        if (error === 'el token ha expirado') {
            localStorage.removeItem("token");
            window.location.href = '/login';
        }
        if (error) {
            return error;
        }
    }

}