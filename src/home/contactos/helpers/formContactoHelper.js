import Swal from "sweetalert2"
import { apiContactoCreate,apiContactoUpdate } from "../api/apiContactos";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    usuario: Yup.string().required('El usuario es requerido'),
    nombre: Yup.string().required('El nombre es requerido'),
    no_cuenta: Yup.string().required('El numero de cuenta es requerido'),
    banco_del_beneficiario: Yup.string().required('El banco es requerido'),
    tipo_de_cuenta: Yup.string().required('El tipo de cuenta es requerido')
});

export const formOptions = { resolver: yupResolver(formSchema) };

export const formContactoHelper = async (contacto, option) => {
    let resultado;

    switch (option) {
        case 1:
            resultado = await apiContactoCreate(
                contacto.usuario,
                contacto.nombre,
                contacto.no_cuenta,
                contacto.banco_del_beneficiario,
                contacto.tipo_de_cuenta
            );
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Contacto creado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/contactos'
                    } else {
                        window.location.href = '/contactos'
                    }
                })
            }
        break;

        case 2:
            resultado = await apiContactoUpdate(
                contacto._id,
                contacto.usuario,
                contacto.nombre,
                contacto.no_cuenta,
                contacto.banco_del_beneficiario,
                contacto.tipo_de_cuenta
            );
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Contacto actualizado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/contactos'
                    } else {
                        window.location.href = '/contactos'
                    }
                })
            }
        break;
    }
}