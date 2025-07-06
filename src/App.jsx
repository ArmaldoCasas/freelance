import React from 'react';
import Cliente from './components/Cliente';
import Tarea from './components/Tarea';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Control de Clientes y Tareas</h1>
      <Cliente />
      <Tarea />
    </div>
  );
}

export default App;
  


