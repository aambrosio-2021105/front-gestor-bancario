import { Modal } from 'react-bootstrap';
import { ListCuentas } from './ListCuentas';

export const ModalCuenta = ({ isOpen, onClose, id }) => {
    if (!isOpen) return null;
    if (id === undefined) return null;

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header>
                    <Modal.Title className="text-dark">ID: {id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Estas son las cuentas del usuario seleccionado:</h4>
                    <ListCuentas userCuentas={id} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={onClose}>
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
