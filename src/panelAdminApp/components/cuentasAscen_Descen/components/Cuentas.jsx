import React from "react";
import { useState, useEffect } from "react";
import { apiCuentas } from "../api/apiCuentas";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong , faDownLong} from '@fortawesome/free-solid-svg-icons';

export const Cuentas = () => {
  const [cuenta, setCuenta] = useState([]);
  const [opcion, setOpcion] = useState({ valor: "+", titulo: " por mayor movimiento" });

  const cambiarList = async (valor) => {
    console.log(valor);
    setOpcion({ valor: valor.valor, titulo: valor.titulo });
    viewCuentalList(valor.valor);
  };
  const viewCuentalList = async (valor) => {
    const getLisCuentaFromAPI = await apiCuentas(valor);
    setCuenta(getLisCuentaFromAPI);
  };
  useEffect(() => {
    viewCuentalList(opcion.valor);
  }, []);

  return (
    <>
    <br />
      <div className="container">
        <Card>
          <Card.Body>
            
          
            <h1>Cuentas {opcion.titulo} </h1>
            <div>
            <Button
              variant="danger"
              onClick={() => cambiarList({ valor: "-", titulo: "por mayor movimiento" })}
            >
              <FontAwesomeIcon icon={faDownLong} className="mx-1"/>
              Descendente
            </Button>
            <Button
              variant="danger"
              onClick={() => cambiarList({ valor: "+", titulo: "por menor movimiento" })}
              className="mx-2"
            >
              <FontAwesomeIcon icon={faUpLong} className="mr-1"/>
              Ascendente
            </Button>

            </div>
          
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Cantidad de transacciones</th>
                  <th>Total en sus Transacciones</th>
                </tr>
              </thead>
              <tbody>
                {cuenta.map((c) => {
                  return (
                    <tr key={c._id}>
                      <td  scope="col">{c._id} </td>
                      <td scope="col">{c.count} </td>
                      <td><span className="badge badge-soft-primary mb-0">{c.totalAmount}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
