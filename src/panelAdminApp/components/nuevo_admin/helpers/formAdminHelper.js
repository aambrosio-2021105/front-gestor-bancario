import Swal from "sweetalert2"
import { apiAdminCreate } from "../api/apiUsuario";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    username: Yup.string().required('El username es requerido'),
    correo: Yup.string().required('El correo es requerido'),
    password: Yup.number().required('La password es requerido')
});


export const formOptions = { resolver: yupResolver(formSchema) };

export const formAdminHelper = async (admin, option) => {
  
    let resultado;
    console.log(admin);
    switch (option) {
        case 1:
            resultado = await apiAdminCreate(
                admin.nombre,
                admin.username,
                admin.correo, 
                admin.password, 
            );
           
            if (resultado) {
                Swal.fire({
                    icon: "success",
                    title: "Todo bien",
                    text: `Admin ${admin.nombre} Creando Correctamente`,
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