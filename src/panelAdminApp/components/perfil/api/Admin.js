import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/admin/";

// Mostrar informacion
export const apiAdmin = async () => {
    try {

        const { data: { admin_app } } = await axios.get(`${URL}mostrar`,
        { headers: { "x-token": token } });
        console.log(admin_app);
        return admin_app;

    } catch ({ response: { data: { message: error } } }) {
        return data.message;
    }
}
//API ruta para crear un usuarioc
export const apiAdminCreate = async (nombre, correo, password) => {
    try {
        const userSave = await axios.post(
            `${URL}agregar-admin`, {
            nombre: nombre,
            correo: correo,
            password: password,

        }, { headers: { "x-token": token } });
        return true;

    } catch ({ response: { data: { error } } }) {
        
        if (error === 'el token ha expirado') {
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
        }    {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}
export const apiAdminUpdate = async (nombre, correo, password) => {
    try {
        const userSave = await axios.put(`${URL}/editar-admin`, {
            nombre: nombre,
            correo: correo,
            password: password,
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

export const apiAdminDelete = async( ) => {
    try {
        const {} = await axios.delete(`${URL}eliminar-admin`,
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