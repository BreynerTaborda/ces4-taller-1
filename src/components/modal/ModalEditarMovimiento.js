import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalCommon from "./ModalCommon";
import ModalConfirmacionSaldo from "./ModalConfirmacionSaldo";
import './ModalEditarMovimiento.css'

function ModalEditarMovimiento({
  modalShow,
  setModalShow,
  hadleEditarMovimiento,
  movimientoEditar, 
  setMovimientoEditar,
  saldoInsuficiente,
  setSaldoInsuficiente
}) {
  const [nombre, setNombre] = useState(movimientoEditar.nombre);
  const [cantidad, setCantidad] = useState(movimientoEditar.cantidad);
  const [selectTipoMovimiento, setSelectTipoMovimiento] = useState(movimientoEditar.tipoMovimiento);
  const [modalShowConfirmacion, setModalShowConfirmacion] = useState(false);
  const [datosModal, setDatosModal] = useState({ titulo: "", contenido: "", movimiento: {} });

  useEffect(() => {
    setSelectTipoMovimiento(movimientoEditar.tipoMovimiento === "Ingreso"? "1":"2" );
    setNombre(movimientoEditar.nombre)
    setCantidad(movimientoEditar.cantidad);
  }, [movimientoEditar,setMovimientoEditar])
  

  const handleInputNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleInputCantidad = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    if (e.target.value <= 0) {
      e.target.value = "";
    }
    setCantidad(e.target.value);
  };

  const handleSelectTipoMovimiento = (e) => {
    setSelectTipoMovimiento(e.target.value);
  };

  const handleConfirmarEditarMovimiento = () =>{
    const nombreTipoMoviminto = selectTipoMovimiento === "1" ? "Ingreso" : "Gasto";

    const newMoviminetoEditado = {
      id:movimientoEditar.id, 
      tipoMovimiento:nombreTipoMoviminto, 
      nombre:nombre, 
      cantidad:cantidad
    }

    setMovimientoEditar(newMoviminetoEditado)
    hadleEditarMovimiento(newMoviminetoEditado);
  }

  const handleCloseModal = () =>{
    setModalShow(false);
    setSaldoInsuficiente(false);
  }

  return (
    <ModalCommon modalShow={modalShow} setModalShow={setModalShow}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Editar Movimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {saldoInsuficiente && <div className="pSaldoInsuficiente">
            No cuenta con saldo suficiente para realizar este movimiento.
          </div>}
          <form>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleSelectTipoMovimiento}
                defaultValue={selectTipoMovimiento}
              >
                <option value="1">
                  Ingreso
                </option>
                <option value="2">Gasto</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                aria-describedby="emailHelp"
                value={nombre}
                onChange={handleInputNombre}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Cantidad
              </label>
              <input
                type="text"
                className="form-control"
                id="cantidad"
                aria-describedby="emailHelp"
                value={cantidad}
                onChange={handleInputCantidad}
              />
            </div>
          </form>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
        <Button
          onClick={handleConfirmarEditarMovimiento}
          className={`btn btn-primary ${
            cantidad !== "" && nombre !== "" ? "" : "disabled"
          }`}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </ModalCommon>
  );
}

export default ModalEditarMovimiento;
