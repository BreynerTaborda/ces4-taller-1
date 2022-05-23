import React from "react";
import { Button, Modal } from "react-bootstrap";
import ModalCommon from "./ModalCommon";

function ModalConfirmacionSaldo({
  modalShow,
  setModalShow,
  titulo,
  contenido,
}) {
  return (
    <ModalCommon modalShow={modalShow} setModalShow={setModalShow}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
         {contenido}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </ModalCommon>
  );
}

export default ModalConfirmacionSaldo;
