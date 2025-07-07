import React from 'react';
import { useState } from 'react';
import Cliente from './components/Cliente';
import Tarea from './components/Tarea';
import DolarAPI from './components/DolarApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './components/BarChart';


function App() {
  const [tareas, setTareas] = useState([]);
return (
  <>
  <header>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 mx-auto" style={{ letterSpacing: 2 }}>
          FREELANCE
        </span>
      </div>
    </nav>
  </header>
    <div className="container py-4">
      <h1 className="text-center mb-4">Control de Clientes y Tareas</h1>
      <div className="row g-4">
        
        {/* Card Cliente */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">Clientes</h3>
              <Cliente />
            </div>
          </div>
        </div>

        {/* Card Tarea */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">Tareas</h3>
              <Tarea tareas={tareas} setTareas={setTareas}/>
            </div>
          </div>
        </div>
        
        {/* Card valor dolar */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">Dolar Hoy</h3>
              <DolarAPI />
            </div>
          </div>
        </div>

        {/* Card grafico*/}
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title mb-3">Reportes</h3>
              <BarChart tareas={tareas}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default App;
  


