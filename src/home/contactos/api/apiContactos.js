import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "http://localhost:8080/api/beneficiarios/";
const URLT = "http://localhost:8080/api/tipoDeCuenta/mostrar-all"
export const apiTipoCuenta = async () => {
    try { 
  
        const { data: { tipoDeCuentas } } = await axios.get(`${URLT}`,
        { headers: { "x-token": token } });
        console.log(tipoDeCuentas);
        return tipoDeCuentas;
  
    } catch ({ response: { data: { message } } }) {
      return data.message;
  }
  
  }
export const apiContactos = async () => {
    try {
        const { data: { listaBeneficiarios } } = await axios.get(`${URL}mostrar-all`,
            { headers: { 'x-token': token } });
        return listaBeneficiarios;
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
                title: 'Error al mostrar los contactos favoritos del usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiContactoCreate = async (usuario, nombre, no_cuenta, banco_del_beneficiario, tipo_de_cuenta) => {
    try {
        const { data: { beneficiarioGuardadoDB } } = await axios.post(`${URL}agregar`,
            { usuario, nombre, no_cuenta, banco_del_beneficiario, tipo_de_cuenta },
            { headers: { 'x-token': token } });
        return beneficiarioGuardadoDB;
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
                title: 'Error al crear el contacto favorito',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiContactoUpdate = async (id, usuario, nombre, no_cuenta, banco_del_beneficiario, tipo_de_cuenta) => {
    try {
        const { data: { beneficiario } } = await axios.put(`${URL}editar/${id}`,
            { usuario, nombre, no_cuenta, banco_del_beneficiario, tipo_de_cuenta },
            { headers: { 'x-token': token } });
        return true;
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
                title: 'Error al actualizar el contacto favorito seleccionado',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiContactosDelete = async (id) => {
    try {
        const { } = await axios.delete(`${URL}eliminar/${id}`,
            { headers: { 'x-token': token } });
        return true;
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
                title: 'Error al eliminar el contacto favorito seleccionado',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}
