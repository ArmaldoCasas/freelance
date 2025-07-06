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
    // La variable que se crea acá hace que el formulario no se le puedan incluir símbolos y solo admita lo que dentro
    const validFormat = /^[a-zA-Z0-9 ]+$/;
    if (!validFormat.test(value)) {
      alert("El texto solo puede contener letras, números y espacios.");
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
  //Elimina un cliente
  const deleteCliente = (id) => {
    if (window.confirm("¿Eliminar este cliente?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  // Edita un cliente
  const editCliente = (cliente) => {
    setClienteToEdit(cliente);
  };

  // Prepara un cliente para ser editado
  return (
 <div
  style={{
    border: '1px solid #ccc',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // sombra
    maxWidth: '1600px', //lo alarga
    margin: '0 auto 20px auto'    // lo centra
  }}
>
      <h2>Clientes</h2>
      <Form addOrUpdateItem={addOrUpdateCliente} itemToEdit={clienteToEdit} />
      <List items={clientes} deleteItem={deleteCliente} editItem={editCliente} />
    </div>
  );
}

export default Cliente;
