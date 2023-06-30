import React from 'react'
import { FormCuenta } from './FormCuenta'
import { Cuenta } from '../models/cuenta.models'

export const CreateCuenta = () => {
  return (
    <>
        <div className='container'>
        <FormCuenta CuentaProp={Cuenta}
                    option={1}></FormCuenta>
        </div>
    </>
    
  )
}
