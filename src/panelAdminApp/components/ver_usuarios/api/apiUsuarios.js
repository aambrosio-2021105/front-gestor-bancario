import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');

const URL = "http://localhost:8080/api/admin/all-clientes";

export const apiAllClientes = async () => {
    try {
  
        const { data: { clientes } } = await axios.get(`${URL}`,
        { headers: { "x-token": token } });
        console.log(clientes);
        return clientes;
  
    } catch ({ response: { data: { message } } }) {
      return data.message;
  }
}