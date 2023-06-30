import { useState, useEffect } from "react";
import { apiCuentasUser } from "../api/apiUsuario";

export const ListCuentas = ({ userCuentas }) => {
    const [cuentas, setCuentas] = useState([]);
    const viewCuentas = async () => setCuentas(await apiCuentasUser(userCuentas));
    useEffect(() => { viewCuentas(); }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const options = { hour: 'numeric', minute: 'numeric' };
        return time.toLocaleTimeString('es-ES', options);
    }
    return (
        <>
            {
                cuentas.map((c) => (
                    <div className="card mb-3" key={c._id}>
                        <div className="card-body">
                            <p className="card-title">Numero de cuenta: {c._id}</p>
                            <p className="card-text">Saldo: {c.saldo}</p>
                            <p className="card-text">Tipo de cuenta: {c.tipo_de_cuenta.nombre}</p>
                            <p className="card-text">
                                <small className="text-muted">Fecha de creacion: {formatDate(c.fecha_y_hora_de_apertura)}</small>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">Hora de creacion: {formatTime(c.fecha_y_hora_de_apertura)}</small>
                            </p>
                        </div>
                    </div>
                ))
            }
        </>
    );                
}
