import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faFloppyDisk , faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { apiAdmin, apiAdminDelete, apiAdminUpdate } from "../api/Admin";
import Swal from "sweetalert2";

export const EditarPerfil = () => {
  const [admin, setAdmin] = useState({});
  const [inputNombre, setInputNombre] = useState("");
  const [inputCorreo, setInputCorreo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await apiAdmin();
      setAdmin(adminData);
      setInputNombre(adminData.nombre || "");
      setInputCorreo(adminData.correo || "");
    };
    fetchAdminData();
  }, []);
  
  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await apiAdmin();
      setAdmin(adminData);
    };
    fetchAdminData();
  }, []);

  const handleDeleteAccount = async () => {
    let result = await apiAdminDelete();
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Cuenta Eliminado",
        text: "Se ha eliminado correctamente",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Error",
        text: "No se ha podido eliminar",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    }
    setShowModal(false); // Hide the modal after deleting the account
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Call the apiAdminUpdate function with the input values
      let result = await apiAdminUpdate(
        inputNombre,
        inputCorreo,
        inputPassword
      );
      // Handle the result as needed
      if (result) {
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Cambios guardados",
          text: "Los cambios se han guardado correctamente",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
      } else {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se ha podido guardar los cambios",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBContainer className="py-5" fluid>
      <MDBRow className=" d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h3>Mi Perfil</h3>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "4rem" }}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 pb-1">
                <div className="flex-fill mx-3">
                  <p className="fw-bold mb-4 pb-2">Mi Nombre: </p>
                  <MDBInput
                    id="form1"
                    type="text"
                    size="lg"
                    className="mb-4"
                    value={inputNombre}
                    onClick={() => setIsInputClicked(true)}
                    onChange={(e) => setInputNombre(e.target.value)}
                  />
                  <p className="fw-bold mb-4 pb-2">Mi Correo Electrónico: </p>
                  <div className="form-outline">
                    <MDBInput
                      className="mb-4"
                      id="form2"
                      type="text"
                      size="lg"
                      value={inputCorreo}
                      onClick={() => setIsInputClicked(true)}
                      onChange={(e) => setInputCorreo(e.target.value)}
                    />
                  </div>
                  <p className="fw-bold mb-4 pb-2">Mi Contraseña:</p>
                  <div className="form-outline">
                    <MDBInput
                      id="form1"
                      type="password"
                      size="lg"
                      value={inputPassword}
                      onClick={() => setIsInputClicked(true)}
                      onChange={(e) => setInputPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p
                  className="text-danger text-cent
                  er text-decoration-underline"
                  onClick={handleOpenModal}
                >
                  Eliminar Mi Cuenta
                </p>
              </div>
              {isInputClicked && (
                <div className="text-center">
                  <MDBBtn
                    color="success"
                    size="lg"
                    block
                    onClick={handleSaveChanges}
                    className="mx-1"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} className="mx-2" />
                    Cancelar
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    size="lg"
                    block
                    onClick={()=>setIsInputClicked(false)}
                    className="mx-1"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} className="mx-2"/>
                    Cancelar
                  </MDBBtn>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade${showModal ? " show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                ¿Estás seguro de que deseas eliminar tu cuenta?
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Esta acción es irreversible y eliminará todos tus datos de forma
                permanente.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteAccount()}
              >
                Eliminar Cuenta
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Bootstrap Modal */}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </MDBContainer>
  );
};
