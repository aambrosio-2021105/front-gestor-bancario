import { Link } from "react-router-dom";
import { User } from "../models/users.models";
import { FormUser } from "./FormUser";

export const CreateUser = () => {
  return (
    <>
      <div className="container">
      <Link className="btn btn-secondary mt-3" to="/users">Volver</Link>
        <h1>Agregar un usuario</h1>
        <FormUser userProp={User} 
          titleButton={'Agregar Usuario'}
          option={1} inputType={'text'}/>
      </div>
    </>
  )
}
