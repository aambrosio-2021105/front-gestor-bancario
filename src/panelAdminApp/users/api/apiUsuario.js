import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URL = "http://localhost:8080/api/admin/";
const URLTC = "http://localhost:8080/api/tipoDeCuenta/mostrar-all";
const URLC = "http://localhost:8080/api/cuenta/mostrar-all";

export const apiUsuario = async () => {
    try {
        const { data: { listaClientes } } = await axios.get(`${URL}/mostrar-clientes`,
            { headers: { 'x-token': token } });
        return listaClientes;
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
                title: 'Error al mostrar los usuarios',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiTipoCuenta = async () => {
    try {
        const { data: { tipoDeCuentas } } = await axios.get(`${URLTC}`,
            { headers: { 'x-token': token } });
        return tipoDeCuentas;
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
                title: 'Error al mostrar los tipos de cuentas',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiUsuarioCreate = async (nombre, username, DPI, direccion, celular, correo, password, nombre_de_trabajo, ingresos_mensuales, tipo_de_cuenta, saldoInicial) => {


    try {
        const userSave = await axios.post(`${URL}agregar-cliente`, {
            nombre: nombre,
            username: username,
            DPI: DPI,
            direccion: direccion,
            celular: celular,
            correo: correo,
            password: password,
            nombre_de_trabajo: nombre_de_trabajo,
            ingresos_mensuales: ingresos_mensuales,
            tipo_de_cuenta: tipo_de_cuenta,
            saldoInicial: saldoInicial
        }, { headers: { "x-token": token } });
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
                title: 'Error al agregar el nuevo usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiUsuarioUpdate = async (id, nombre, username, direccion, celular, correo, nombre_de_trabajo, ingresos_mensuales) => {
    try {
        const userSave = await axios.put(`${URL}editar-cliente/${id}`, {
            nombre: nombre,
            username: username,
            direccion: direccion,
            celular: celular,
            correo: correo,
            nombre_de_trabajo: nombre_de_trabajo,
            ingresos_mensuales: ingresos_mensuales
        }, { headers: { "x-token": token } });
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
                title: 'Error al modificar el usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiUsuarioDelete = async (id) => {
    try {
        const userSave = await axios.delete(`${URL}eliminar-cliente/${id}`
            , { headers: { "x-token": token } });
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
                title: 'Error al eliminar el usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}

export const apiCuentasUser = async (id) => {
    try {
        const { data: { listaCuentas } } = await axios.get(`${URLC}-client/${id}`,
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el usuario',
                text: error,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }
}
