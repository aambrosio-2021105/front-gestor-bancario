import { useEffect, useState } from 'react'
import { apiTransacionId } from '../api/apiTransacion';
import { useLocation } from 'react-router-dom';
import { GetTransacciones } from './GetTransacciones';

export const TablaTransaccionId = () => {
    let { search } = useLocation();
    let query = new URLSearchParams(search);

    let cuenta = query.get('cuenta');
    const [transacciones, setTransacciones] = useState([]);

    const viewTransacciones = async () => {
        const getListTransacciones = await apiTransacionId(cuenta);
        setTransacciones(getListTransacciones);
        console.log(getListTransacciones);
    }

    useEffect(() => { viewTransacciones(); }, []);

    return (
        <GetTransacciones transacciones={transacciones} />
    )
}
