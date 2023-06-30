import Swal from "sweetalert2"
import { apiUsuarioCreate, apiUsuarioUpdate } from "../api/apiUsuario";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    username: Yup.string().required('El username es requerido'),
    DPI: Yup.string().required('El DPI es requerido'),
    direccion: Yup.string().required('La direccion es requerida'),
    celular: Yup.string().required('El celular es requerido'),
    correo: Yup.string().required('El correo es requerido'),
    password: Yup.string().required('El password es requerido'),
    nombre_de_trabajo: Yup.string().required('El nombre de trabajo es requerido'),
    ingresos_mensuales: Yup.string().required('Los ingresos mensuales son requeridos'),
    tipo_de_cuenta: Yup.string().required('El tipo de cuenta es requerido'),
    saldoInicial: Yup.string().required('El saldo inicial es requerido')
});

export const formOptions = { resolver: yupResolver(formSchema) };

export const formUserHelper = async (usuario, option) => {
    let resultado;
    switch (option) {
        case 1:
            resultado = await apiUsuarioCreate(
                usuario.nombre,
                usuario.username,
                usuario.DPI,
                usuario.direccion,
                usuario.celular,
                usuario.correo,
                usuario.password,
                usuario.nombre_de_trabajo,
                usuario.ingresos_mensuales,
                usuario.tipo_de_cuenta,
                usuario.saldoInicial
            );
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Usuario creado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/users'
                    } else {
                        window.location.href = '/users'
                    }
                })
            }
        break;

        case 2:
            resultado = await apiUsuarioUpdate(
                usuario._id,
                usuario.nombre,
                usuario.username,
                usuario.direccion,
                usuario.celular,
                usuario.correo,
                usuario.nombre_de_trabajo,
                usuario.ingresos_mensuales
            );
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Usuario actualizado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/users'
                    } else {
                        window.location.href = '/users'
                    }
                })
            }
        break;
    }
}