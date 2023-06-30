import { Modal } from "react-bootstrap";
import { FormUser } from "./FormUser";

export const UpdateUser = ({ isOpen, onClose, userEdit }) => {

    return (
        <>
            <Modal show={isOpen}>
                <Modal.Header>
                    <Modal.Title className="text-dark">
                        ID: {userEdit._id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormUser userProp={userEdit}
                        titleButton={'Actualizar Usuario'}
                        option={2} inputType={'hidden'} />
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
