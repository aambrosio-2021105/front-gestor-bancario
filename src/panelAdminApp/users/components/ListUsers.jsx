import 'boxicons/css/boxicons.min.css';
import { useEffect, useState } from 'react';
import { apiUsuario } from '../api/apiUsuario';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { User } from '../models/users.models';
import { apiUsuarioDelete } from '../api/apiUsuario';
import { UpdateUser } from './UpdateUser';
import { ModalCuenta } from './ModalCuenta';
import Card from 'react-bootstrap/Card';
export const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalCuenta, setShowModalCuenta] = useState(false);
  const [user, setUser] = useState(User);
  const [ids, setId] = useState(0);

  const viewUsers = async () => setUsers(await apiUsuario());

  const handleOpenModal = (u) => {
    setShowModal(true);
    setUser(u);
  }

  const handleOpenModalCuenta = (id) => {
    setShowModalCuenta(true);
    setId(id);
  }

  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalCuenta = () => setShowModalCuenta(false);

  const eliminarUsuario = async (id) => {
    let result = await apiUsuarioDelete(id);
    if (result) {
      setUsers(users.filter((u) => u._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Usuario Eliminado',
        text: 'Se ha eliminado correctamente',
        showConfirmButton: true,
        confirmButtonText: "Ok"
      });
    }
  }

  useEffect(() => { viewUsers(); }, [showModal, showModalCuenta]);

  return (
    <>
    <br />
    <div className='container'>
    <Card>
      <Card.Body>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="mb-3">
              <h5 className="card-title">Lista de Clientes <span className="text-muted fw-normal ms-2">({users.length})</span></h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
              <div>
                <Link to={'/create-users'} className="btn btn-primary">
                  <i className="bx bx-plus me-1"></i> Agregar cliente
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">No. DPI</th>
                  <th scope="col">Cuentas</th>
                  <th scope="col" style={{ width: '200px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{u.nombre}</a></td>
                      <td><span className="badge badge-soft-primary mb-0">{u.username}</span></td>
                      <td>{u.DPI}</td>
                      <td>
                        <button className="btn btn-primary ms-8 w-100"
                        onClick={() => handleOpenModalCuenta(u._id)}>
                        Ver cuentas
                      </button></td>
                      <td>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <a href="#" data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                              className="px-2 text-primary"
                              onClick={() => handleOpenModal(u)}>
                              <i className="bx bx-pencil font-size-18"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                              className="px-2 text-danger"
                              onClick={() => eliminarUsuario(u._id)}>
                              <i className="bx bx-trash-alt font-size-18"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <UpdateUser
        userEdit={user}
        isOpen={showModal}
        onClose={() => handleCloseModal()}
      ></UpdateUser>
      <ModalCuenta
        id={ids}
        isOpen={showModalCuenta}
        onClose={() => handleCloseModalCuenta()}
      ></ModalCuenta>
      </Card.Body>
    </Card>
    </div>
   
      
    </>
  );
};
