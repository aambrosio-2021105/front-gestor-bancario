import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import { apiTipoCuenta } from "../api/apiCuenta";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { formCuentaHelper, formOptions } from "../helpers/formCuentaHelper";
export const FormCuenta = ({ CuentaProp, option }) => {
  const [tipoCuenta, setTipoCuenta] = useState([]);
  const [cuenta, setCuenta] = useState(CuentaProp);
  const viewTipoCuentaList = async () => {
    const getListTipoCuenta = await apiTipoCuenta();
    setTipoCuenta(getListTipoCuenta);
  };

  const [valoresSeleccionados, setValoresSeleccionados] = useState({
    cuenta: "",
  });
  useEffect(() => {
    viewTipoCuentaList();
  }, []);

  const idCuenta = (tipoScuenta) => {
    console.log(tipoScuenta.nombre);
    setValoresSeleccionados({
        cuenta: tipoScuenta.nombre,
    });
    setCuenta(() => ({ ...cuenta, tipo_de_cuenta: tipoScuenta._id }));
  };
  console.log(cuenta);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    setCuenta({ ...cuenta });
  }, []);
  const crud = async () => {

    await formCuentaHelper(cuenta, option);

}
  return (
    <>
      <div className="container">
        <Card className="mt-5">
          <Card.Body>
            <form className="formulario" onSubmit={handleSubmit(crud)}>
              <fieldset>
                <legend>Informacion General</legend>
                <label>Tipo de Cuenta</label>
                <Dropdown id="dropdown-variants-Primary">
                  <Dropdown.Toggle
                    variant="success"
                    className="w-100"
                    id="dropdown-variants-Primary"
                  >
                    {valoresSeleccionados.cuenta || "Tipo de Cuenta"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="w-100">
                    {tipoCuenta.map((t) => {
                      return (
                        <Dropdown.Item
                          {...register("tipo_de_cuenta")}
                          value={cuenta.tipo_de_cuenta}
                          key={t._id}
                          onClick={() => idCuenta(t)}
                        >
                          {t.nombre}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                {errors.tipo_de_cuenta && (
                  <span>{errors.tipo_de_cuenta.message}</span>
                )}
                <label htmlFor="cliente">No. Cuenta de Cliente</label>
                <input
                  {...register("cliente")}
                  type="text"
                  className="form-control"
                  value={cuenta.cliente}
                  onChange={({ target: { value } }) => {
                    setCuenta(() => ({ ...cuenta, cliente: value }));
                  }}
                />
                {errors.cliente && <span>{errors.cliente.message}</span>}
               

                <label>saldo</label>
                <input
                  {...register("saldo")}
                  type="number"
                  className="form-control"
                  value={cuenta.saldo}
                  onChange={({ target: { value } }) => {
                    setCuenta(() => ({ ...cuenta, saldo: value }));
                  }}
                />
                {errors.saldo && <span>{errors.saldo.message}</span>}
    

                
              
              </fieldset>
              <button
                type="submit"
                className="btn btn-success"
                onClick={crud}
              >
                {"Crear Cuenta"}
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
