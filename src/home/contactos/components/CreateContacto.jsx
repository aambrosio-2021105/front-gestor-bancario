import { Contacto } from "../models/contacto.models";
import { FormContacto } from "./FormContacto";

export const CreateContacto = () => {
  return (
    <>
      <div className="container">
        <h1>Agregar a favorito</h1>
        <FormContacto contactoProp={Contacto} 
          titleButton={'Agregar Contacto'}
          option={1} inputType={'text'}/>
      </div>
    </>
  )
}
