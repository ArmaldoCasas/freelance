import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';

function App() {
  // Estado principal: la lista de items
  const [items, setItems] = useState(() => {
    const data = localStorage.getItem('items');
    return data ? JSON.parse(data) : [];
  });

  // Estado para el item que se está editando
  const [itemToEdit, setItemToEdit] = useState();

  // Guarda en Local Storage cada vez que items cambia
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

 const addOrUpdateItem = (value) => {
  // Validación 1: que tenga al menos 3 caracteres,value.trim elimina espacios sobrantes
  if (value.trim().length < 3 || value.trim().length > 15) {
    alert("El texto debe tener entre 3 y 15 caracteres.");
    return;
}
  //La variable que se crea aca hace que el formulario no se le puedan incluir simbolos y solo admita lo que dentro
  //el +$
  const validFormat = /^[a-zA-Z0-9 ]+$/;
  if (!validFormat.test(value)) {
    alert("El texto solo puede contener letras, números y espacios.");
    return;
  }

  if (itemToEdit) {
    // Modo editar
    setItems(items.map(item => 
      item.id === itemToEdit.id ? { ...item, value } : item
    ));
    setItemToEdit(null);
  } else {
    // Modo agregar
    const newItem = { id: Date.now(), value };
    setItems([...items, newItem]);
  }
};

  // Elimina un item
  const deleteItem = (id) => {
  if (window.confirm("¿Estás seguro de que quieres eliminar este item?")) {
    setItems(items.filter(item => item.id !== id));
  }
};

  

  // Prepara un item para ser editado
  const editItem = (item) => {
    setItemToEdit(item);
  };
  //Formularios aca abajo + Titulo de la pagina
  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD con Local Storage</h1>
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
