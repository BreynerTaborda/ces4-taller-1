import React, { useState } from "react";
import "./RegistroMovimientos.css";
import { v4 as uuidv4 } from "uuid";
import ModalConfirmacionSaldo from "../../modal/ModalConfirmacionSaldo";

function FormularioRegistroMovimineto({
  movimientos,
  setMovimientos,
  cantidadMovimientos,
  setCantidadMovimientos,
  saldoFinal,
  setSaldofinal,
  saldoInicialRegistrado,
}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [selectTipoMovimiento, setSelectTipoMovimiento] = useState("1");
  const [modalShowConfirmacion, setModalShowConfirmacion] = useState(false);
  const [datosModal, setDatosModal] = useState({ titulo: "", contenido: "" });

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

  const handleRegistrarMovimiento = (e) => {
    e.preventDefault();

    let newDatosModal;
    const nombreTipoMoviminto =
      selectTipoMovimiento === "1" ? "Ingreso" : "Gasto";

    if (
      Number(saldoFinal) < Number(cantidad) &&
      nombreTipoMoviminto === "Gasto"
    ) {
      newDatosModal = {
        titulo: "Error",
        contenido:
          "No cuenta con saldo suficiente para realizar este movimiento.",
      };

      console.log(newDatosModal);
    } else {
      newDatosModal = {
        titulo: "Registro Movimiento",
        contenido: `${nombreTipoMoviminto} fue agregado con éxito.`,
      };

      const newMovimiento = {
        id: uuidv4(),
        tipoMovimiento: nombreTipoMoviminto,
        nombre: nombre,
        cantidad: cantidad,
      };

      let newSaldoFinal;

      if (nombreTipoMoviminto === "Gasto") {
        newSaldoFinal = Number(saldoFinal) - Number(cantidad);
      } else if (nombreTipoMoviminto === "Ingreso") {
        newSaldoFinal = Number(saldoFinal) + Number(cantidad);
      }

      setMovimientos([...movimientos, newMovimiento]);
      setCantidadMovimientos(cantidadMovimientos + 1);
      setSaldofinal(newSaldoFinal);
      handleCancelarRegistro();
    }

    setDatosModal(newDatosModal);
    setModalShowConfirmacion(true);
  };

  const handleCancelarRegistro = () => {
    setCantidad("");
    setNombre("");
  };

  return (
    <>
      <form onSubmit={handleRegistrarMovimiento}>
        <div className="mb-3">
          <select
            className={`form-select ${saldoInicialRegistrado ? "":"disabledSaldoInicial"}`}
            aria-label="Default select example"
            onChange={handleSelectTipoMovimiento}
          >
            <option value="1" selected>
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
            className={`form-control ${
              saldoInicialRegistrado ? "" : "disabledSaldoInicial"
            }`}
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
            className={`form-control ${
              saldoInicialRegistrado ? "" : "disabledSaldoInicial"
            }`}
            id="cantidad"
            aria-describedby="emailHelp"
            value={cantidad}
            onChange={handleInputCantidad}
          />
        </div>
        <div className="mb-3 center">
          <button
            type="button"
            className={`btn btn-secondary cancelar ${
              cantidad !== "" && nombre !== "" ? "" : "disabled"
            }`}
            onClick={handleCancelarRegistro}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${
              cantidad !== "" && nombre !== "" ? "" : "disabled"
            }`}
          >
            Agregar movimiento
          </button>
        </div>
      </form>
      <ModalConfirmacionSaldo
        modalShow={modalShowConfirmacion}
        setModalShow={setModalShowConfirmacion}
        titulo={datosModal.titulo}
        contenido={datosModal.contenido}
      />
    </>
  );
}

export default FormularioRegistroMovimineto;
