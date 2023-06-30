import React from "react";
import { useState, useEffect } from "react";
import { apiAllClientes } from "../api/apiUsuarios";

export const VerUsuarios = () => {
  const [clientes, setClientes] = useState([]);
  const viewClienteList = async () => {
    const getListClientesFomrApi = await apiAllClientes();
    setClientes(getListClientesFomrApi);
  };

  useEffect(() => {
    viewClienteList();
  }, []);
  console.log(clientes);
  return (
    <>
      <div className="container">
        <h1>Lista de Clientes</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>No_cuenta</th>
              <th>DPI</th>
              <th>Direccion</th>
              <th>Celular</th>
              <th>Correo</th>
              <th>Nombre de trabajo</th>
              <th>Ingreso mensuales</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => {
              return (
                <tr key={c._id}>
                  <td className="table-primary"><textarea 
                      className="form-control" 
                      rows="4"
                      disabled={true} 
                      defaultValue={c._id}>
                    </textarea> </td>
                  <td className="table-primary">{c.nombre} </td>
                  <td className="table-primary">{c.username} </td>
                  <td className="table-primary"><textarea 
                      className="form-control" 
                      rows="4"
                      disabled={true} 
                      defaultValue={c.no_cuenta}>
                    </textarea>  </td>
                  <td className="table-primary">{c.DPI} </td>
                  
                  <td className="table-primary">
                    <textarea 
                      className="form-control" 
                      rows="4"
                      disabled={true} 
                      defaultValue={c.direccion}>
                    </textarea> 
                  </td>
                  <td className="table-primary">{c.celular} </td>
                  <td className="table-primary"><textarea 
                      className="form-control" 
                      rows="4"
                      disabled={true} 
                      defaultValue={c.correo}>
                    </textarea>  </td>
                  <td className="table-primary">{c.nombre_de_trabajo} </td>
                  <td className="table-primary">{c.ingresos_mesuales} </td>
                  <td className="table-primary">{c.rol} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
