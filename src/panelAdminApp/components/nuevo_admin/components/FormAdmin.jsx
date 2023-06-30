import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formOptions, formAdminHelper } from "../helpers/formAdminHelper";
import { useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
export const FormAdmin = ({ adminProp, titleButton, option }) => {
  const [admin, setAdmin] = useState(adminProp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    setAdmin({ ...admin });
  }, []);

  const crud = async () => {
    await formAdminHelper(admin, option);
  };
  return (
    <>
      <Card className="mt-5">
        <Card.Body>
          <main>
          <h3>{titleButton} </h3>
            <form className="formulario" onSubmit={handleSubmit(crud)}>
              <fieldset className="mt-5">
                <legend>Informacion del Nuevo Admin</legend>
                <div className="row">
                  <div className="col-6">
                  <label>Nombre del Usuario</label>
                  <input
                    {...register("nombre")}
                    type="text"
                    className="form-control"
                    value={admin.nombre}
                    onChange={({ target: { value } }) => {
                      setAdmin(() => ({ ...admin, nombre: value }));
                    }}
                  />
                  {errors.nombre && <span>{errors.nombre.message}</span>}
                  </div>
                  <div className="col-6">
                    <label>Username del Admin</label>
                    <input
                      {...register("username")}
                      type="text"
                      className="form-control"
                      value={admin.username}
                      onChange={({ target: { value } }) => {
                        setAdmin(() => ({ ...admin, username: value }));
                      }}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                  </div>
                    <br />
                  <label>Correo del Admin</label>
                    <div className="col-6">
                    <InputGroup className="mb-3">
                      <Form.Control
                        {...register("correo")}
                        type="text"
                        className="form-control"
                        value={admin.correo}
                        onChange={({ target: { value } }) => {
                          setAdmin(() => ({ ...admin, correo: value }));
                        }}
                      />
                      <InputGroup.Text id="basic-addon2">
                        @example.com
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.correo && <span>{errors.correo.message}</span>}
                  </div>
                  <div className="col-6">
                    <label>Passowrd del Admin</label>
                    <input
                      {...register("password")}
                      type="text"
                      className="form-control"
                      value={admin.password}
                      onChange={({ target: { value } }) => {
                        setAdmin(() => ({ ...admin, password: value }));
                      }}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                  </div>
                </div>
              </fieldset>
              <br />
              <button type="submit" className="btn btn-success">
                {titleButton}
              </button>
            </form>
          </main>
        </Card.Body>
      </Card>
    </>
  );
};
