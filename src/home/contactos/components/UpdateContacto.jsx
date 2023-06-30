import { Modal } from "react-bootstrap";
import { FormContacto } from "./FormContacto";

export const UpdateContacto = ({ isOpen, onClose, contactoEdit }) => {
    if (!isOpen) return null;

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header>
                    <Modal.Title className="text-dark">
                        ID: {contactoEdit._id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormContacto
                        contactoProp={contactoEdit}
                        titleButton="Actualizar"
                        option={2}
                        inputType={'hidden'}
                    ></FormContacto>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={onClose}>
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
