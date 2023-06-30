import Swal from "sweetalert2"
import { apiCuentaCreate } from "../api/apiCuenta";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    cliente: Yup.string().required('La direccion es requerido'),
    cliente: Yup.string().required('El departamento es requerido'),
    saldo: Yup.number().required('El rating es requerido'),
   
});

export const formOptions = { resolver: yupResolver(formSchema) };

export const formCuentaHelper = async (cuenta, option) => {
  
    let resultado;
    
    switch (option) {
        case 1:
            resultado = await apiCuentaCreate(
                cuenta.cliente,
                cuenta.tipo_de_cuenta,
                cuenta.saldo,
            );
           
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: "Cuenta creado correctamente",
                    showConfirmButton: true,
                    confirmButtonText: "Go  !"
                }).then((r) => {
                    if (r.isConfirmed) {
                        window.location.href = '/panel-adminapp'
                    } else {
                        window.location.href = '/panel-adminapp'
                    }
                })
            }
        break;

       
            
    }



}