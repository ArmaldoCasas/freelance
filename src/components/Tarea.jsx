import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';

function Tarea() {
  // Estado principal: la lista de tareas
  const [tareas, setTareas] = useState(() => {
    const data = localStorage.getItem('tareas');
    return data ? JSON.parse(data) : [];
  });
  // Estado De los Clientes
  const [clientes, setClientes] = useState(() => {
    const data = localStorage.getItem('clientes');
    return data ? JSON.parse(data) : [];
  });
  // Guarda en Local Storage cada vez que tareas cambia
  const [tareaToEdit, setTareaToEdit] = useState();
  // Estado para la tarea que se está editando
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);
  // Guarda en Local Storage cada vez que tareas cambia
  const addOrUpdateTarea = (value, clienteId) => {
    if (!clienteId) {
      alert("Selecciona un cliente.");
      return;
    }
    // La variable que se crea acá hace que el formulario no se le puedan incluir símbolos y solo admita lo que dentro
    const validFormat = /^[a-zA-Z0-9 ]+$/;
    if (!validFormat.test(value)) {
      alert("El nombre solo puede contener letras, números y espacios.");
      return;
    }

    if (tareaToEdit) {
      // Modo editar
      setTareas(tareas.map(t =>
        t.id === tareaToEdit.id ? { ...t, value, clienteId } : t
      ));
      setTareaToEdit(null);
    } else {
      // Modo agregar
      const newTarea = { id: Date.now(), value, clienteId };
      setTareas([...tareas, newTarea]);
    }
  };
  // Elimina una tarea
  const deleteTarea = (id) => {
    if (window.confirm("¿Eliminar esta tarea?")) {
      setTareas(tareas.filter(t => t.id !== id));
    }
  };
  // Prepara una tarea para ser editada
  const editTarea = (tarea) => {
    setTareaToEdit(tarea);
  };

  return (
 <div >
      <Form
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
