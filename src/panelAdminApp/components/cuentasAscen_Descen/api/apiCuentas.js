import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');

const URLA = "http://localhost:8080/api/admin/mostrar-transferenciasA";

export const apiCuentas = async(tipo) => {
   try {
   
    const { data: { result } } = await axios.post(
      `${URLA}`, {
        tipo:tipo
  }, { headers: { "x-token": token } });

  return result;

    } catch ({ response: { data: { message } } }) {
        return data.message;
    }
}

