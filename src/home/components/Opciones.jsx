import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar, faFileLines, faPiggyBank, faCreditCard, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { apiCuenta } from '../api/apiCuenta';
import { useEffect, useState } from 'react';

export const Opciones = () => {
  const [cuenta, setCuenta] = useState([]);

  const viewCuentas = async () => {
    const getListCuentas = await apiCuenta();
    setCuenta(getListCuentas);
  }

  useEffect(() => { viewCuentas(); }, []);

  const decodificarToken = () => {
    const result = localStorage.getItem('token');
    const [header, payload, signature] = result.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const userName = decodedPayload.nombre;
    return userName;
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center my-4">¡Bienvenido @{decodificarToken()}!</h2>
        {cuenta.map((c) => {
          return (
            <div className="col-md-6" key={c._id}>
              <div className="square-service-block">
                <Link to={`/transaccion?cuenta=${c._id}`}>
                  <div className="ssb-icon">
                    <FontAwesomeIcon icon={faSackDollar} className="fs-1" />
                    <h2 className="ssb-title">Saldo: <span>Q</span>{c.saldo}</h2>
                  </div>
                  <h2 className="ssb-title">CUENTA {c.tipo_de_cuenta.nombre}</h2>
                </Link>
              </div>
            </div>
          );
        })
        }

        <div className="col-md-6">
          <div className="square-service-block">
            <Link to="/transferencia">
              <div className="ssb-icon">
                <FontAwesomeIcon icon={faMoneyBillTransfer} className="fs-1" />
              </div>
              <h2 className="ssb-title">Pagar</h2>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="square-service-block">
            <Link to="/transacciones">
              <div className="ssb-icon">
              <FontAwesomeIcon icon={faFileLines} className="fs-1" />
              </div>
              <h2 className="ssb-title">Reporte de pagos</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
