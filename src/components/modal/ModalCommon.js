
import React, { Children } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactDOM from 'react-dom';

function ModalCommon({modalShow, setModalShow, children}) {
  return (
    ReactDOM.createPortal(
    <>
    <Modal
      show={modalShow}
      onHide={setModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {children}
    </Modal>
    </>
    , document.getElementById('modal'))
  );
}

export default ModalCommon;
