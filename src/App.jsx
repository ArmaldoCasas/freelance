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
  const [itemToEdit, setItemToEdit] = useState(null);

  // Guarda en Local Storage cada vez que items cambia
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Agrega o actualiza un item
  const addOrUpdateItem = (value) => {
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
    setItems(items.filter(item => item.id !== id));
  };

  // Prepara un item para ser editado
  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD con Local Storage</h1>
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
