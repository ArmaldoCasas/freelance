import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';

function Cliente() {
  // Estado principal: la lista de clientes
  const [clientes, setClientes] = useState(() => {
    const data = localStorage.getItem('clientes');
    return data ? JSON.parse(data) : [];
  });

  // Estado para el cliente que se está editando
  const [clienteToEdit, setClienteToEdit] = useState();

  // Guarda en Local Storage cada vez que clientes cambia
  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const addOrUpdateCliente = (value) => {
    // Validación 1: que tenga al menos 3 caracteres, value.trim elimina espacios sobrantes
    if (value.trim().length < 3 || value.trim().length > 15) {
      alert("El texto debe tener entre 3 y 15 caracteres.");
      return;
    }

    const validFormat = /^[a-zA-Z0-9 ]+$/;
    if (!validFormat.test(value)) {
      alert("Solo se permiten letras, números y espacios.");
      return;
    }

    if (clienteToEdit) {
      // Modo editar
      setClientes(clientes.map(cliente =>
        cliente.id === clienteToEdit.id ? { ...cliente, value } : cliente
      ));
      setClienteToEdit(null);
    } else {
      // Modo agregar
      const newCliente = { id: Date.now(), value };
      setClientes([...clientes, newCliente]);
    }
  };

  const deleteCliente = (id) => {
    if (window.confirm("¿Eliminar este cliente?")) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  // Edita un cliente
  const editCliente = (cliente) => {
    setClienteToEdit(cliente);
  };

  return (
 <div>

      <Form tipo={"cliente"} addOrUpdateItem={addOrUpdateCliente} itemToEdit={clienteToEdit} />
      <List items={clientes} deleteItem={deleteCliente} editItem={editCliente} />
    </div>
  );
}

export default Cliente;
