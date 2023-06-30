import React from 'react';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faFileLines, faMoneyBill, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Opciones } from './Opciones';

import { HacerTransferencia } from './transferencia/components/HacerTransferencia';
import { Link } from 'react-router-dom';

import { Tabla_Transacciones } from '../transaccion/components/Tabla_Transacciones';
import { Tabla_Contactos } from '../contactos/components/Tabla_Contactos';
import { EditarPerfil } from './perfil/components/EditarPerfil';

export const SideBar = ({ selectedComponent }) => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-light sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
              <Nav className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <NavItem className="my-5">
                  <Link to="/contactos" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                    <FontAwesomeIcon icon={faAddressBook} className="fs-1" />
                  </Link>
                </NavItem>
                <NavItem className="my-5">
                  <Link to="/transacciones" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                    <FontAwesomeIcon icon={faFileLines} className="fs-1" />
                  </Link>
                </NavItem>
                <NavItem className="my-5">
                  <Link to="/transferencia" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                    <FontAwesomeIcon icon={faMoneyBill} className="fs-1" />
                  </Link>
                </NavItem>
                <NavItem className="my-5">
                  <Nav.Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                    <Button variant="link" onClick={logOut}>
                      <FontAwesomeIcon icon={faPowerOff} className="fs-1" />
                    </Button>
                  </Nav.Link>
                </NavItem>
              </Nav>
            </div>
          </div>
          <div className="col-sm p-3 min-vh-100">
            {selectedComponent === 'opciones' && <Opciones />}
            {selectedComponent === 'transacciones' && <Tabla_Transacciones/>}
            {selectedComponent === 'transferencia' && <HacerTransferencia/>}
            {selectedComponent === 'contactos' && <Tabla_Contactos/>}
            {selectedComponent === 'perfil' && <EditarPerfil/>}
          </div>
        </div>
      </div>
    </>
  );
};
