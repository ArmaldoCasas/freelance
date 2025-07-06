import React from 'react';
import Item from './Item';
//La funcion llama las otras funciones de los otros archivos y tambien llama a la lista de clientes
function List({ items, deleteItem, editItem, clientes = [] }) {
  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          clientes={clientes}
        />
      ))}
    </ul>
  );
}

export default List;
