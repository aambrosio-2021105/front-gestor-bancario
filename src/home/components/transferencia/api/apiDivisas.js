import axios from 'axios';
import Swal from 'sweetalert2';
//variables globales
let baseCurrency = '';
let targetCurrency = '';
let cantidades = 0
let resultadoDivisa = 0
const token = localStorage.getItem('token');
const URLT = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/tipoDeTransaccion/mostrar-all"
const URLC = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/cuenta/mostrar-all"
const URL = "https://hosting-backend-git-main-aambrosio-2021105.vercel.app/api/transaccion/"
// Mostrar informacion
export const apiTipoTransferencia = async () => {
  try {

      const { data: { tipoDeTransaccion } } = await axios.get(`${URLT}`,
      { headers: { "x-token": token } });
      return tipoDeTransaccion;

  } catch ({ response: { data: { message } } }) {
    return data.message;
}

}
export const apiCuenta = async () => {
  try {

      const { data: { listaCuentas } } = await axios.get(`${URLC}`,
      { headers: { "x-token": token } });
    console.log(listaCuentas);
      return listaCuentas;

  } catch ({ response: { data: { message } } }) {
      return data.message;
  }

}
export const apiTransaccionCreate = async (cuenta_origen,cuenta_destino,tipo_de_transaccion,monto) => {
  console.log(monto);
  try {
      const userSave = await axios.post(
          `${URL}agregar`, {
            cuenta_origen: cuenta_origen,
            cuenta_destino: cuenta_destino,
            tipo_de_transaccion: tipo_de_transaccion,
            monto: monto
      }, { headers: { "x-token": token } });
      console.log(userSave);
      return true;

  } catch ({ response: { data: { error } } }) {

      if (error === "Token no válido") {
          Swal.fire({
              icon: 'info',
              title: 'Error',
              text: 'Inicie sesion de nuevo',
              showConfirmButton: true,
              confirmButtonText: "Ok"
          }).then((result) => {
              if (result.isConfirmed) {
                  localStorage.removeItem("token");
                  window.location.href = '/transferencia';
              }
          });
      } else{
      
          Swal.fire({
              icon: 'error',
              title: 'Error al agregar',
              text: error,
              showConfirmButton: true,
              confirmButtonText: "Ok"
          }).then((result) => {
              console.log(result);
          });
      }
  }

}

export const valorModificado=()=> {

  let inputs = document.querySelectorAll(".valor");
  const datos = Array.from(inputs).map((elemento) => ({
    id: elemento.id,
    valor: elemento.value
  }));

  cantidades= datos[0].valor
  baseCurrency = datos[0].id;
  targetCurrency=datos[1].id
  
  divisa();
  
}

const divisa = () => {
  if(baseCurrency.length>0  &&targetCurrency.length>0 ){
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      
      const exchangeRate = data.rates[targetCurrency];

      const resultado = (exchangeRate*cantidades);
      
      document.querySelector('input[name="input2"]').value=resultado.toFixed(2)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
}
divisa()