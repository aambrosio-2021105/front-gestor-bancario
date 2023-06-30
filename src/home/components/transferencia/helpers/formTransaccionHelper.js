import Swal from "sweetalert2"


import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { apiTransaccionCreate } from "../api/apiDivisas";

export const formSchema = Yup.object().shape({
    cuenta_origen: Yup.string().required('La cuenta de origen es requerida'),
    cuenta_destino: Yup.string().required('La cuenta destino es requerido'),
    tipo_de_transaccion: Yup.string().required('El monto es requerido'),
    monto: Yup.number().required('El monto es requerido')
});

export const formOptions = { resolver: yupResolver(formSchema) };


export const formTransaccionHelper = async(transaccion, option, cantidad) => {
    let resultado;
 
    switch (option) {
        case 1:
            resultado = await apiTransaccionCreate(
                transaccion.cuenta_origen,
                transaccion.cuenta_destino,
                transaccion.tipo_de_transaccion,
                cantidad,
               
            );

            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Transferencia hecha correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/home'
                    } else {
                        window.location.href = '/home'
                    }
                })
            }
            break;

    
    }
}
