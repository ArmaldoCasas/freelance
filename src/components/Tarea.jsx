import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';

function Tarea() {
  // Estado principal: la lista de tareas
  const [tareas, setTareas] = useState(() => {
    const data = localStorage.getItem('tareas');
    return data ? JSON.parse(data) : [];
  });

  // Estado para la tarea que se está editando
  const [tareaToEdit, setTareaToEdit] = useState();

  // Guarda en Local Storage cada vez que tareas cambia
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const addOrUpdateTarea = (value) => {
    
    // La variable que se crea acá hace que el formulario no se le puedan incluir símbolos y solo admita lo que dentro
    const validFormat = /^[a-zA-Z0-9 ]+$/;
    if (!validFormat.test(value)) {
      alert("El texto solo puede contener letras, números y espacios.");
      return;
    }

    if (tareaToEdit) {
      // Modo editar
      setTareas(tareas.map(tarea =>
        tarea.id === tareaToEdit.id ? { ...tarea, value } : tarea
      ));
      setTareaToEdit(null);
    } else {
      // Modo agregar
      const newTarea = { id: Date.now(), value };
      setTareas([...tareas, newTarea]);
    }
  };

  // Elimina una tarea
  const deleteTarea = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setTareas(tareas.filter(tarea => tarea.id !== id));
    }
  };

  // Prepara una tarea para ser editada
  const editTarea = (tarea) => {
    setTareaToEdit(tarea);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h2>Tareas</h2>
      <Form addOrUpdateItem={addOrUpdateTarea} itemToEdit={tareaToEdit} />
      <List items={tareas} deleteItem={deleteTarea} editItem={editTarea} />
    </div>
  );
}

export default Tarea;
