import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { formOptions, formUserHelper } from "../helpers/formUserHelper";
import Dropdown from 'react-bootstrap/Dropdown';
import { apiTipoCuenta } from "../api/apiUsuario";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const FormUser = ({ userProp, titleButton, option, inputType }) => {
    const [user, setUser] = useState(userProp);
    const [tipoCuenta, setTipoCuenta] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(formOptions);

    const viewTipoCuentas = async () => setTipoCuenta(await apiTipoCuenta());

    useEffect(() => { viewTipoCuentas(); }, []);

    useEffect(() => { setUser({ ...user }); }, []);

    const crud = async () => await formUserHelper(user, option);

    const idTipoCuenta = (tc) => {
        setUser(() => ({ ...user, tipo_de_cuenta: tc._id }))
        setValoresSeleccionados({
            cuenta: tc.nombre
        }); 
    }
    const [valoresSeleccionados, setValoresSeleccionados] = useState({
        cuenta: "",
      });
    return (
        <>
            <Card>
                <Card.Body>
                    <main>
                        <form onSubmit={handleSubmit(crud)}>
                            <fieldset>
                                <legend>Informacion General</legend>
                                <label>Nombre del Cliente</label>
                                <input
                                    {...register("nombre")}
                                    className="form-control"
                                    value={user.nombre}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, nombre: value }));
                                    }}
                                />
                                {errors.nombre && (<span>{errors.nombre.message}</span>)}
                                <label>Nombre de usuario</label>
                                <input
                                    {...register("username")}
                                    className="form-control"
                                    value={user.username}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, username: value }));
                                    }}
                                />
                                {errors.username && (<span>{errors.username.message}</span>)}
                                {inputType === 'hidden' ? [] : (<label>DPI del usuario</label>)}
                                <input
                                    {...register("DPI")}
                                    type={inputType}
                                    className="form-control"
                                    value={user.DPI}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, DPI: value }));
                                    }}
                                />
                                {errors.DPI && (<span>{errors.DPI.message}</span>)}
                                <label>Direccion del usuario</label>
                                <textarea
                                    {...register("direccion")}
                                    className="form-control"
                                    value={user.direccion}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, direccion: value }));
                                    }}
                                />
                                {errors.direccion && (<span>{errors.direccion.message}</span>)}
                                <label>Celular del Usuario</label>
                                <input
                                    {...register("celular")}
                                    className="form-control"
                                    type="tel"
                                    value={user.celular}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, celular: value }));
                                    }}
                                />
                                {errors.celular && (<span>{errors.celular.message}</span>)}
                                <label>Correo del Usuario</label>
                                <InputGroup> 
                                    <Form.Control
                                        {...register("correo")}
                                        value={user.correo}
                                        className="form-control"
                                        type="email"
                                        onChange={({ target: { value } }) => {
                                            setUser(() => ({ ...user, correo: value }));
                                        }}
                                    />
                                    <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                                </InputGroup>
                                {errors.correo && (<span>{errors.correo.message}</span>)}
                                {inputType === 'hidden' ? [] : (<label>Password del usuario</label>)}
                                <input
                                    {...register("password")}
                                    type={inputType}
                                    className="form-control"
                                    value={user.password}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, password: value }));
                                    }}
                                />
                                {errors.password && (<span>{errors.password.message}</span>)}
                                <label>Nombre del trabajo del Usuario</label>
                                <textarea
                                    {...register("nombre_de_trabajo")}
                                    className="form-control"
                                    value={user.nombre_de_trabajo}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, nombre_de_trabajo: value }));
                                    }}
                                />
                                {errors.nombre_de_trabajo && (<span>{errors.nombre_de_trabajo.message}</span>)}
                                <label>Ingresos mensuales del Usuario</label>
                                <input
                                    {...register("ingresos_mensuales")}
                                    type="number"
                                    className="form-control"
                                    value={user.ingresos_mensuales}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, ingresos_mensuales: value }));
                                    }}
                                />
                                {errors.ingresos_mensuales && (<span>{errors.ingresos_mensuales.message}</span>)}
                                {inputType === 'hidden' ? [] : (<label>Seleccione un tipo de cuenta</label>)}
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" className="w-100" id="dropdown-basic" style={{ visibility: inputType }}>
                                    {valoresSeleccionados.cuenta || "Tipo de Cuenta"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        {
                                            tipoCuenta.map((t) => {
                                                return (
                                                    <Dropdown.Item
                                                        {...register("tipo_de_cuenta")}
                                                        value={user.tipo_de_cuenta}
                                                        key={t._id}
                                                        onClick={() => idTipoCuenta(t)}
                                                    >
                                                        {t.nombre}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                {inputType === 'hidden' ? [] : (<label>Saldo inicial de la cuenta</label>)}
                                <input
                                    {...register("saldoInicial")}
                                    type={inputType}
                                    className="form-control"
                                    value={user.saldoInicial === undefined ? 0 : user.saldoInicial}
                                    onChange={({ target: { value } }) => {
                                        setUser(() => ({ ...user, saldoInicial: value }));
                                    }}
                                />
                                {errors.saldoInicial && (<span>{errors.saldoInicial.message}</span>)}
                            </fieldset>
                            <button type="submit" className="btn btn-success mt-2" onClick={crud}>{titleButton}</button>
                        </form>
                    </main>
                </Card.Body>
            </Card>

        </>
    )
}
