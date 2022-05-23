import React, { useState } from "react";
import "./RegistroMovimientos.css";
import {v4 as uuidv4} from 'uuid'
import ModalConfirmacionSaldo from "../../modal/ModalConfirmacionSaldo";
import FormularioRegistroMovimineto from "./FormularioRegistroMovimineto";

function RegistroMovimientos({ movimientos, setMovimientos, cantidadMovimientos, setCantidadMovimientos, saldoFinal, setSaldofinal, saldoInicialRegistrado }) {
  
  return (
    <div className="row">
      <div className="tituloRegistroMovimientos">
        <p className="pTitulo">Registro</p>
      </div>
      <FormularioRegistroMovimineto 
        movimientos = {movimientos} 
        setMovimientos = {setMovimientos}
        cantidadMovimientos = {cantidadMovimientos}
        setCantidadMovimientos = {setCantidadMovimientos}
        saldoFinal = {saldoFinal}
        setSaldofinal = {setSaldofinal}
        saldoInicialRegistrado = {saldoInicialRegistrado}
      />
    </div>
  );
}

export default RegistroMovimientos;
