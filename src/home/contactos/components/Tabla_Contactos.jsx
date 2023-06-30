import 'boxicons/css/boxicons.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { apiContactos, apiContactosDelete } from '../api/apiContactos';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { UpdateContacto } from './UpdateContacto';
import { Contacto } from '../models/contacto.models';

export const Tabla_Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contacto, setContacto] = useState(Contacto);
  
  const viewContactos = async () => {
    const getContactos = await apiContactos();
    setContactos(getContactos);
  }

  useEffect(() => { viewContactos(); }, [showModal]);

  const handleOpenModal = (c) => {
    console.log(c);
    setShowModal(true);
    setContacto(c);
  }

  const handleCloseModal = () => setShowModal(false);

  const eliminarContacto = async (id) => {
    let result = await apiContactosDelete(id);
    if (result) {
      setContactos(contactos.filter((c) => c._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Contacto Eliminado',
        text: 'Se ha eliminado correctamente',
        showConfirmButton: true,
        confirmButtonText: "Ok"
      });
    }
  }

  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="mb-3">
              <h5 className="card-title">Lista de Favoritos <span className="text-muted fw-normal ms-2">({contactos.length})</span></h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
              <div>
                <Link to={'/create-contactos'} className="btn btn-primary">
                  <i className="bx bx-plus me-1"></i> Agregar favorito
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
                  <th scope="col">Banco del contacto</th>
                  <th scope="col">Numero de cuenta</th>
                  <th scope="col">Tipo de cuenta</th>
                  <th scope="col" style={{ width: '200px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contactos.map((c) => {
                  return (
                    <tr key={c._id}>
                      <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{c.nombre}</a></td>
                      <td><span className="badge badge-soft-success mb-0">{c.banco_del_beneficiario}</span></td>
                      <td>{c.no_cuenta}</td>
                      <td>{c.tipo_de_cuenta.nombre}</td>
                      <td>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <a href="#" data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
                              className="px-2 text-primary"
                              onClick={() => handleOpenModal(c)}>
                              <i className="bx bx-pencil font-size-18"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                              className="px-2 text-danger"
                              onClick={() => eliminarContacto(c._id)}>
                              <i className="bx bx-trash-alt font-size-18"></i>
                            </a>
                          </li>
                          <li className="list-inline-item dropdown">
                            <Link to={`/transferencia?cuenta=${c._id}`} className="btn btn-primary">Transferir</Link>
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
      <UpdateContacto
        contactoEdit={contacto}
        isOpen={showModal}
        onClose={() => handleCloseModal()}
      ></UpdateContacto>
    </>
  );
};
