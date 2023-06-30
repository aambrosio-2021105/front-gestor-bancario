import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');

const URL = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/admin/all-clientes";

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