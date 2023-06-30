import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBillTransfer , faUser, faUserTie, faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons';

export const Opciones = () => {
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center my-4">Bienvenido Administrador!</h2>
        <div className="col-md-6">
          <div className="square-service-block">
            <Link to="/cuentas-asc-desc">
              <div className="ssb-icon">
              <FontAwesomeIcon icon={faMoneyBillTransfer} className="fs-1" />
              </div>
              <h2 className="ssb-title">Ver Cuentas por Movimientos</h2>
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="square-service-block">
            <Link to="/users">
              <div className="ssb-icon">
              <FontAwesomeIcon icon={faUser} className="fs-1"/>
              </div>
              <h2 className="ssb-title">Ver Usuarios</h2>
            </Link>
          </div>
        </div>

        <div className="col-md-6">

          <div className="square-service-block">

            <Link to="/create-cuenta">

              <div className="ssb-icon">

              <FontAwesomeIcon icon={faMoneyCheckDollar} className="fs-1"/>

              </div>

              <h2 className="ssb-title">Crear Cuenta</h2>

            </Link>

          </div>

        </div>
        <div className="col-md-6">
          <div className="square-service-block">
            <Link to="/add-admin">
              <div className="ssb-icon">
              <FontAwesomeIcon icon={faUserTie} className="fs-1"/>
              </div>
              <h2 className="ssb-title">Agregar Administrador</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
