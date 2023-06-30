import { useEffect, useState } from 'react'
import { apiTransacion } from '../api/apiTransacion';
import { GetTransacciones } from './GetTransacciones';

export const Tabla_Transacciones = () => {
  const [transacciones, setTransacciones] = useState([]);

  const viewTransacciones = async () => {
    const getListTransacciones = await apiTransacion();
    setTransacciones(getListTransacciones);
  }

  useEffect(() => { viewTransacciones(); }, []);

  return (
    <GetTransacciones transacciones={transacciones} />      
  )
}
