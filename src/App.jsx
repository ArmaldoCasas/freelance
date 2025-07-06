import React from 'react';
import Cliente from './components/Cliente';
import Tarea from './components/Tarea';
import DolarAPI from './components/DolarApi';
function App() {
  return (
    <div>
      <h1>Control de Clientes y Tareas</h1>
      <Cliente />
      <Tarea />
      <DolarAPI/>
    </div>
  );
}

export default App;
  


