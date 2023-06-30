import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export const GetTransacciones = ({ transacciones }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric" };
    return time.toLocaleTimeString("es-ES", options);
  };
  return (
    <div className="container">
      <Card>
        <Card.Body>
        <h3 className="text-center">Historial de Transacciones</h3>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Cuenta De Origen</th>
                <th>Cuenta Destino</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente encargado</th>
                <th>Tipo de Transaccion</th>
                <th>Tipo de Ingreso</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((t) => {
                return (
                  <tr key={t._id}>
                    <td>{t.cuenta_origen}</td>
                    <td>{t.cuenta_destino}</td>
                    <td>{formatDate(t.fecha_y_hora)}</td>
                    <td>{formatTime(t.fecha_y_hora)}</td>
                    <td>{t.transaccion_del_cliente.nombre}</td>
                    <td>{t.tipo_de_transaccion.nombre}</td>
                    <td>{t.tipo_de_ingreso}</td>
                    <td>Q.{t.monto}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
