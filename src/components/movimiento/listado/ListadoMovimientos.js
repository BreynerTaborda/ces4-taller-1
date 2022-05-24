import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { BsXLg, BsSearch } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import ModalConfirmacionSaldo from "../../modal/ModalConfirmacionSaldo";
import ModalEditarMovimiento from "../../modal/ModalEditarMovimiento";
import ModalEditarEliminarMovimiento from "../../modal/ModalEliminarMovimiento";
import "./ListadoMovimientos.css";

function ListadoMovimientos({
  movimientos,
  setMovimientos,
  cantidadMovimientos,
  setCantidadMovimientos,
  saldoFinal,
  setSaldofinal,
  saldoInicialRegistrado,
}) {
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [buscar, setBuscar] = useState("");
  const [movimientosFiltrados, setMovimientosFiltrados] = useState([]);
  const [modalShowEliminar, setModalShowEliminar] = useState(false);
  const [modalShowEditar, setModalShowEditar] = useState(false);
  const [datosModal, setDatosModal] = useState({ titulo: "", contenido: "", movimiento: {} });
  const [movimientoEditar, setMovimientoEditar] = useState({nombre:"", cantidad:"", tipoMovimiento:""});
  const [saldoInsuficiente, setSaldoInsuficiente] = useState(false);
  
  const formatterPeso = new Intl.NumberFormat('es-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  })

  useEffect(() => {
    if (movimientos) {
      setMovimientosFiltrados(movimientos);
      handleFiltarProductos(tipoFiltro, buscar);
    }
  }, [movimientos]);

  const handleChangeRadioButton = (e) => {
    const newTipoFiltro = e.target.attributes.id.value;
    setTipoFiltro(newTipoFiltro);
    handleFiltarProductos(newTipoFiltro, buscar);
  };

  const handleFiltarProductos = (newTipoFiltro, newBucar) => {
    setMovimientosFiltrados(movimientos);
    console.log(movimientos);
    let newMovimientosFiltrados = movimientos;
    console.log(newMovimientosFiltrados);

    if (newTipoFiltro === "Ingreso") {
      newMovimientosFiltrados = movimientos.filter(
        (movimiento) => movimiento.tipoMovimiento === "Ingreso"
      );

      console.log("INGRESO");
      console.log(newMovimientosFiltrados);
    } else if (newTipoFiltro === "Gasto") {
      newMovimientosFiltrados = movimientos.filter(
        (movimiento) => movimiento.tipoMovimiento === "Gasto"
      );

      console.log(newMovimientosFiltrados);
    }

    if (newBucar !== "") {
      let expresion = new RegExp(`.*${newBucar.toUpperCase()}.*`, "gi");

      newMovimientosFiltrados = newMovimientosFiltrados.filter((movimiento) =>
        movimiento.nombre.toUpperCase().match(expresion)
      );
      console.log("ASDASDSAD");
    }

    console.log(newMovimientosFiltrados);
    setMovimientosFiltrados(newMovimientosFiltrados);
  };

  const handleChangeInputBuscar = (e) => {
    const newBucar = e.target.value;

    setBuscar(newBucar);
    console.log(newBucar);

    handleFiltarProductos(tipoFiltro, newBucar);
  };

  const handleIconEliminar = (movimiento) => {
    
    const newDatosModal  = {
      titulo: "Elminiar movimiento",
      contenido: `¿Esta segudo que desea eliminar el movimineto con nombre: "${movimiento.nombre}" y valor "${movimiento.cantidad}"?`,
      movimiento:movimiento
    }
    console.log(newDatosModal)

    setDatosModal(newDatosModal);
    setModalShowEliminar(true);
  };

  const handleIconEditar = (movimiento) =>{
    setMovimientoEditar(movimiento);
    setTimeout(() => {
      setModalShowEditar(true);
    }, 250);
    
  }

  const hadleEliminarMovimiento = () =>{
    
    const newMovimientos = movimientos.filter((movimiento) => movimiento.id !== datosModal.movimiento.id);
    
    let newSaldoFinal;

    if(datosModal.movimiento.tipoMovimiento === "Ingreso"){
      newSaldoFinal = Number(saldoFinal) - Number(datosModal.movimiento.cantidad)
    }else{
      newSaldoFinal = Number(saldoFinal) + Number(datosModal.movimiento.cantidad)
    }
    
    setSaldofinal(newSaldoFinal);
    setMovimientos(newMovimientos);
    setCantidadMovimientos(cantidadMovimientos - 1)
    setModalShowEliminar(false);
  }

  const handleEditarMovimiento = (movimientoEdit) =>{
    console.log("Estamos viendo que,", movimientoEdit)

    let saldoInsuficiente = false;
    const newMoviminetos = movimientos.map((movimiento) => {
      if(movimiento.id === movimientoEdit.id){
        if(movimiento.tipoMovimiento === movimientoEdit.tipoMovimiento){
          let newSaldoFinal;
          if(movimiento.cantidad > movimientoEdit.cantidad){
            if(movimiento.tipoMovimiento === "Ingreso"){
              newSaldoFinal = Number(saldoFinal) - (Number(movimiento.cantidad) - Number(movimientoEdit.cantidad))
            }else{
              newSaldoFinal = Number(saldoFinal) + (Number(movimiento.cantidad) - Number(movimientoEdit.cantidad))
            }
            setSaldofinal(newSaldoFinal);  
            movimiento.nombre = movimientoEdit.nombre;
            movimiento.cantidad = movimientoEdit.cantidad;
          }else{
            if(movimiento.tipoMovimiento === "Ingreso"){
              newSaldoFinal = Number(saldoFinal) + (Number(movimientoEdit.cantidad) - Number(movimiento.cantidad))
              setSaldofinal(newSaldoFinal);
              movimiento.nombre = movimientoEdit.nombre;
              movimiento.cantidad = movimientoEdit.cantidad;
            }else{
              newSaldoFinal = Number(saldoFinal) - (Number(movimientoEdit.cantidad) - Number(movimiento.cantidad))

              if(newSaldoFinal < 0){
                console.log("asdasdsad");
                saldoInsuficiente = true;
                setSaldoInsuficiente(true);
              }else{
                setSaldofinal(newSaldoFinal);
                movimiento.nombre = movimientoEdit.nombre;
                movimiento.cantidad = movimientoEdit.cantidad;
              }
            } 
          }
          
        }else{
          let newSaldoFinal;
          if(movimientoEdit.tipoMovimiento === "Gasto"){
            newSaldoFinal = Number(saldoFinal) - Number(movimiento.cantidad);
            if(Number(saldoFinal) < Number(movimientoEdit.cantidad)){
              saldoInsuficiente = true;
              setSaldoInsuficiente(true);
            }else{
              newSaldoFinal = Number(newSaldoFinal) - Number(movimientoEdit.cantidad);
              movimiento.nombre = movimientoEdit.nombre;
              movimiento.cantidad = movimientoEdit.cantidad;
              movimiento.tipoMovimiento = movimientoEdit.tipoMovimiento
            }
            
          }else{
            newSaldoFinal = Number(saldoFinal) + Number(movimiento.cantidad);
            movimiento.nombre = movimientoEdit.nombre;
            movimiento.cantidad = movimientoEdit.cantidad;
            movimiento.tipoMovimiento = movimientoEdit.tipoMovimiento
            newSaldoFinal = Number(newSaldoFinal) + Number(movimientoEdit.cantidad);
            console.log(saldoFinal);
          }
          
          setSaldofinal(newSaldoFinal);
        }
      }

      return movimiento;
    })

    
    console.log("1---",saldoInsuficiente);
    setMovimientos(newMoviminetos);
    setTimeout(() => {
      if(!saldoInsuficiente){
        console.log("ENTROOOOOO",saldoInsuficiente,saldoInsuficiente);
        setModalShowEditar(false);
      }
    }, 500);
    
  }

  return (
    <div className="row listaMovimientos">
      <div className="row vertical tituloListaMkovimientos">
        <div className="col">Listado movimiento</div>
        <div className="col end">
          <p className="pTotal">
            <span className="spanTotal">{cantidadMovimientos}</span>
          </p>
        </div>
      </div>
      <div className="row filtros">
        <div className="col">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon1"
              onKeyUp={handleChangeInputBuscar}
            />
          </InputGroup>
        </div>
        <div className="col centerTipoFiltro">
          <div className="mb-3">
            <Form.Check
              inline
              label="Todos"
              name="tipoFiltro"
              type="radio"
              id={"Todos"}
              defaultChecked={tipoFiltro === "Todos" ? true : false}
              onChange={handleChangeRadioButton}
            />
            <Form.Check
              inline
              label="Ingreso"
              name="tipoFiltro"
              type="radio"
              id={"Ingreso"}
              defaultChecked={tipoFiltro === "Ingreso" ? true : false}
              onChange={handleChangeRadioButton}
            />
            <Form.Check
              inline
              label="Gasto"
              name="tipoFiltro"
              type="radio"
              id={"Gasto"}
              defaultChecked={tipoFiltro === "Gasto" ? true : false}
              onChange={handleChangeRadioButton}
            />
          </div>
        </div>
      </div>
      {movimientos &&
        movimientosFiltrados.map((movimiento) => (
          <div className="row movimientos" key={movimiento.id}>
            <div className="col">
              <span className="iconEliminarMovimiento">
                <BsXLg onClick={() => handleIconEliminar(movimiento)} />
              </span>
              <span className="iconEditarMovimiento">
                <MdEdit onClick={() => handleIconEditar(movimiento)} />
              </span>
            </div>
            <div className="col">
              <p>{movimiento.nombre}</p>
            </div>
            <div className="col">
              <p>
                <span
                  className={
                    movimiento.tipoMovimiento === "Ingreso"
                      ? "movimientoIngreso"
                      : "movimientoGasto"
                  }
                >
                  {formatterPeso.format(movimiento.cantidad)}
                </span>
              </p>
            </div>
          </div>
        ))}

        {!saldoInicialRegistrado && <div className="sinSaldoInicialRegistrado">
          Por favor registre el saldo inicial
        </div>}
      <ModalEditarEliminarMovimiento
        modalShow={modalShowEliminar}
        setModalShow={setModalShowEliminar}
        titulo={datosModal.titulo}
        contenido={datosModal.contenido}
        hadleEliminarMovimiento={hadleEliminarMovimiento}
      />

      <ModalEditarMovimiento 
        modalShow={modalShowEditar}
        setModalShow={setModalShowEditar} 
        hadleEditarMovimiento={handleEditarMovimiento}
        movimientoEditar={movimientoEditar}
        setMovimientoEditar={setMovimientoEditar}
        saldoInsuficiente={saldoInsuficiente}
        setSaldoInsuficiente={setSaldoInsuficiente}
      />
    </div>
  );
}

export default ListadoMovimientos;
