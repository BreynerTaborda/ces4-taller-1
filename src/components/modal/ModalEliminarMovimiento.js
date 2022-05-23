import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ModalCommon from './ModalCommon'

function ModalEditarEliminarMovimiento({modalShow, setModalShow, titulo, contenido, hadleEliminarMovimiento}) {
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
        <Button onClick={hadleEliminarMovimiento}>Aceptar</Button>
      </Modal.Footer>
    </ModalCommon>
  )
}

export default ModalEditarEliminarMovimiento