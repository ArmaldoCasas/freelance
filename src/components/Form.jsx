import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit, clientes = [] }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedClienteId, setSelectedClienteId] = useState("");
// Si hay un item para editar, carga su valor en el input si no queda en blanco(Defualt)
  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
      setSelectedClienteId(itemToEdit.clienteId || "");
    } else {
      setInputValue("");
      setSelectedClienteId("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      if (clientes.length > 0) {
        addOrUpdateItem(inputValue, Number(selectedClienteId));
      } else {
        addOrUpdateItem(inputValue);
      }

      setInputValue("");
      setSelectedClienteId("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nombre"
      />
      {clientes.length > 0 && (
        <select
          value={selectedClienteId}
          onChange={(e) => setSelectedClienteId(Number(e.target.value))}
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>
              {c.value}
            </option>
          ))}
        </select>
      )}
      <button type="submit" class="btn btn-outline-secondary">{itemToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}

export default Form;
