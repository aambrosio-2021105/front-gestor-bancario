import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { formOptions, formContactoHelper } from "../helpers/formContactoHelper";
import { apiTipoCuenta } from "../api/apiContactos";
import Dropdown from "react-bootstrap/Dropdown";
import Card from 'react-bootstrap/Card';


export const FormContacto = ({ contactoProp, titleButton, option, inputType }) => {
    const [contacto, setContacto] = useState(contactoProp);
    const [tipoCuenta, setTipoCuenta] = useState([]);
    const [valoresSeleccionados, setValoresSeleccionados] = useState({
        cuenta: "",
      });
    const viewTipoCuentaList = async () => {
        const getListTipoCuenta = await apiTipoCuenta();
        setTipoCuenta(getListTipoCuenta);
      };

      const idCuenta = (tipoScuenta) => {
        console.log(tipoScuenta.nombre);
        setValoresSeleccionados({
            cuenta: tipoScuenta.nombre,
        });
        setContacto(() => ({ ...contacto, tipo_de_cuenta: tipoScuenta._id }));
      };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions)


    useEffect(() => { setContacto({ ...contacto }),viewTipoCuentaList() }, []);

    const crud = async () => await formContactoHelper(contacto, option);

    return (
        <>
          <Card>
      <Card.Body>
      <main>
                <Link className="btn btn-secondary" to="/contactos">Volver</Link>
                <form onSubmit={handleSubmit(crud)}>
                    <fieldset className="mt-5">
                        <legend>Informacion General</legend>
                        <label>Nombre del Contacto</label>
                        <input
                            {...register("nombre")}
                            className="form-control"
                            value={contacto.nombre}
                            onChange={({ target: { value } }) => {
                                setContacto(() => ({ ...contacto, nombre: value }));
                            }}
                        />
                        {errors.nombre && (<span>{errors.nombre.message}</span>)}
                        {inputType === 'hidden' ? [] : (<label>Numero de cuenta</label>)}
                        <input
                            {...register("no_cuenta")}
                            type={inputType}
                            className="form-control"
                            value={contacto.no_cuenta}
                            onChange={({ target: { value } }) => {
                                setContacto(() => ({ ...contacto, no_cuenta: value }));
                            }}
                        />
                        {errors.no_cuenta && (<span>{errors.no_cuenta.message}</span>)}
                        {inputType === 'hidden' ? [] : (<label>Banco del usuario</label>)}
                        <input
                            {...register("banco_del_beneficiario")}
                            type={inputType}
                            className="form-control"
                            value={contacto.banco_del_beneficiario}
                            onChange={({ target: { value } }) => {
                                setContacto(() => ({ ...contacto, banco_del_beneficiario: value }));
                            }}
                        />
                        {errors.banco_del_beneficiario && (<span>{errors.banco_del_beneficiario.message}</span>)}
                        {inputType === 'hidden' ? [] : <label>Tipo de cuenta</label>}
                        
                      
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
                          value={contacto.tipo_de_cuenta}
                          key={t._id}
                          onClick={() => idCuenta(t)}
                        >
                          {t.nombre}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                
                        {errors.tipo_de_cuenta && (<span>{errors.tipo_de_cuenta.message}</span>)}
                    </fieldset>
                    <button type="submit" className="btn btn-success mt-2" onClick={crud}>{titleButton}</button>
                </form>
            </main>
      </Card.Body>
    </Card>
           
        </>
    )
}