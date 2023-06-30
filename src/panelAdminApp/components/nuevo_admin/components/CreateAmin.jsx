import React from 'react'
import { FormAdmin } from './FormAdmin'
import { Admin } from "../models/models.admin"
export const CreateAmin = () => {
    console.log(Admin);
  return (
   <>
   
        <div className='container'>
       
        <FormAdmin adminProp={Admin}
                    titleButton={'Crear Administrador'}
                    option={1}></FormAdmin>
        </div>
   </>
  )
}
