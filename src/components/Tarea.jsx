import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';

function Tarea() {
  // Estado principal: la lista de tareas
  const [tareas, setTareas] = useState(() => {
    const data = localStorage.getItem('tareas');
    return data ? JSON.parse(data) : [];
  });

  const [clientes, setClientes] = useState(() => {
    const data = localStorage.getItem('clientes');
    return data ? JSON.parse(data) : [];
  });

  const [tareaToEdit, setTareaToEdit] = useState();

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const addOrUpdateTarea = (value, clienteId, tiempoEstimado, tiempoReal, valorHora) => {
    if (!clienteId) {
      alert("Selecciona un cliente.");
      return;
    }

    const validFormat = /^[a-zA-Z0-9 ]+$/;
    if (!validFormat.test(value)) {
      alert("El nombre solo puede contener letras, números y espacios.");
      return;
    }

    const tareaBase = {
      value,
      clienteId,
      tiempoEstimado,
      tiempoReal,
      valorHora
    };

    if (tareaToEdit) {
      // Modo editar
      setTareas(tareas.map(t =>
        t.id === tareaToEdit.id ? { ...t, ...tareaBase } : t
      ));
      setTareaToEdit(null);
    } else {
      const newTarea = { id: Date.now(), ...tareaBase };
      setTareas([...tareas, newTarea]);
    }
  };

  const deleteTarea = (id) => {
    if (window.confirm("¿Eliminar esta tarea?")) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };

  const editTarea = (tarea) => {
    setTareaToEdit(tarea);
  };

  return (
    <div>
      <Form
        tipo="tarea"
        addOrUpdateItem={addOrUpdateTarea}
        itemToEdit={tareaToEdit}
        clientes={clientes}
      />
      <List
        items={tareas}
        deleteItem={deleteTarea}
        editItem={editTarea}
        clientes={clientes}
      />
    </div>
  );
}

export default Tarea;
