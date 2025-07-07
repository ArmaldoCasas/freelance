import React from 'react';

function Item({ item, deleteItem, editItem, clientes = [] }) {
  const cliente = clientes.find(c => String(c.id) === String(item.clienteId));

  return (

    // Muestra Nombre de Item
<li style={{ marginBottom: '5px' }}>
      {item.value}
      {clientes.length > 0 &&(
        cliente ? (
           //Si hay clientes asociados a la tarea muestra el nombre con color verde si no muestra sin Cliente de color rojo 
          <span style={{ marginLeft: '10px', color: 'green' }}>
            Cliente: {cliente.value}
          </span>
        ) : (
          <span style={{ marginLeft: '10px', color: 'red' }}>
            Sin cliente
          </span>
  )//Abajo estan los botones de Editar y Eliminar 
      )}
    <button type="button" class="btn btn-outline-primary" onClick={() => editItem(item)} style={{ marginLeft: '10px' }}>Editar</button>
    <button type="button" class="btn btn-outline-danger" onClick={() => deleteItem(item.id)} style={{ marginLeft: '5px' }}>Eliminar</button>
    </li>
  );
}

export default Item;
