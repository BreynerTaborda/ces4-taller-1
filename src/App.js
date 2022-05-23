import "./App.css";
import Header from "./components/header/Header";
import { useState } from "react";
import RegistroMovimientos from "./components/movimiento/registro/RegistroMovimientos";
import ListadoMovimientos from "./components/movimiento/listado/ListadoMovimientos";

function App() {
  const [saldoFinal, setSaldofinal] = useState(0);
  const [movimientos, setMovimientos] = useState([]);
  const [cantidadMovimientos, setCantidadMovimientos] = useState(0);
  const [saldoInicialRegistrado, setSaldoInicialRegistrado] = useState(false);

  return (
    <>
      <div className="container">
        <Header 
          saldoFinal = {saldoFinal}
          setSaldofinal = {setSaldofinal}
          saldoInicialRegistrado = {saldoInicialRegistrado}
          setSaldoInicialRegistrado = {setSaldoInicialRegistrado}
        />
        <div className="row tarjetas">
          <div className="col colRegistroMovimientos">
            <RegistroMovimientos
              movimientos={movimientos}
              setMovimientos={setMovimientos}
              cantidadMovimientos={cantidadMovimientos}
              setCantidadMovimientos={setCantidadMovimientos}
              saldoFinal = {saldoFinal}
              setSaldofinal = {setSaldofinal}
              saldoInicialRegistrado = {saldoInicialRegistrado}
            />
          </div>
          <div className="col">
            <ListadoMovimientos
              movimientos={movimientos}
              setMovimientos={setMovimientos}
              cantidadMovimientos={cantidadMovimientos}
              setCantidadMovimientos={setCantidadMovimientos}
              saldoFinal = {saldoFinal}
              setSaldofinal = {setSaldofinal}
              saldoInicialRegistrado = {saldoInicialRegistrado}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
