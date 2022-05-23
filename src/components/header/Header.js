import React, { useEffect, useState } from "react";
import { FaMoneyBillAlt, FaDollarSign } from "react-icons/fa";
import RegistroMovimientos from "../movimiento/registro/RegistroMovimientos";
import "./Header.css";
import { FaCheck } from "react-icons/fa";

const Header = ({ saldoFinal, setSaldofinal, saldoInicialRegistrado, setSaldoInicialRegistrado}) => {
  
  const [saldoInicialFormato, setSaldoInicialFormato] = useState("");
  const [saldoFinalFormato, setSaldoFinalFormato] = useState("");
  const [saldoInicial, setSaldoInical] = useState("");
  

  useEffect(() => {
    const formatterPeso = new Intl.NumberFormat('es-US', {
      style: 'decimal',
      minimumFractionDigits: 0
    })

    setSaldoFinalFormato(formatterPeso.format(saldoFinal))
  
  }, [saldoFinal,setSaldofinal])
  

  const handleInputSaldoInicial = (e) =>{
    e.target.value = e.target.value.replace(/\D/g, '');

    const formatterPeso = new Intl.NumberFormat('es-US', {
      style: 'decimal',
      minimumFractionDigits: 0
    })

    if(e.target.value <= 0){
      e.target.value = "";
    }

    setSaldoInical(e.target.value);
    setSaldoInicialFormato(formatterPeso.format(e.target.value));
  }

  const handleConfirmarSaldoInicial = () =>{
    setSaldoInicialRegistrado(true);
    setSaldofinal(saldoInicial);
  }

  return (
    <div className="row header">
      <div className="col-5">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-2">
            <FaMoneyBillAlt className="logo" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 nombreLogo">
            <h6>Seguimiento Financiero</h6>
          </div>
        </div>
      </div>
      <div className="col"></div>
      <div className="col-5">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <label htmlFor="saldoInicial" className="form-label">
              Saldo Inicial
            </label>
            <div className="mb-3 center input-group">
              <span className="input-group-text" id="basic-addon1">
                <FaDollarSign />
              </span>
              <input
                type="text"
                className={`form-control ${saldoInicialRegistrado ? "disabledSaldoInicial" : ""}`}
                id="saldoInicial"
                aria-describedby="basic-addon1"
                value={saldoInicialRegistrado ? saldoInicialFormato : saldoInicial}
                onChange={handleInputSaldoInicial}
              />
              {!saldoInicialRegistrado && <button class={`btn btn-outline-primary ${saldoInicial !== ""? "":"disabledSaldoInicial"}`} type="button" id="button-addon1" onClick={handleConfirmarSaldoInicial}><FaCheck /></button>}
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 center">
            <label htmlFor="saldoFinal" className="form-label">
              Saldo Final
            </label>
            <div className="mb-3 center input-group">
              <span className="input-group-text" id="basic-addon2">
                <FaDollarSign />
              </span>
              <input
                type="text"
                className="form-control"
                id="saldoFinal"
                aria-describedby="basic-addon2"
                disabled
                value={saldoFinalFormato}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
