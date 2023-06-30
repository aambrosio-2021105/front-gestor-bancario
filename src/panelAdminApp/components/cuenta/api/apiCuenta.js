import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const URLT = "http://localhost:8080/api/tipoDeCuenta/mostrar-all"
const URL = "http://localhost:8080/api/cuenta/"

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
  export const apiCuentaCreate = async (cliente, tipo_de_cuenta, saldo) => {
    
    try {
       
        const userSave = await axios.post(
            `${URL}agregar`, {
                cliente: cliente,
                tipo_de_cuenta: tipo_de_cuenta,
                saldo: saldo
        }, { headers: { "x-token": token } });

       
        return true;

    } catch ({ response: { data: { msg } } }) {
        
        if (msg === 'el token ha expirado') {
            Swal.fire({
                icon: 'info',
                title: 'Error',
                text: msg,
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
                text: msg,
                showConfirmButton: true,
                confirmButtonText: "Ok"
            }).then((result) => {
                console.log(result);
            });
        }
    }

}