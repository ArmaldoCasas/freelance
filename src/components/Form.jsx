import React, { useState, useEffect } from 'react';

function Form({ tipo, addOrUpdateItem, itemToEdit, clientes = [] }) {
  const [inputValue, setInputValue] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [tiempoEstimado, setTiempoEstimado] = useState("");
  const [tiempoReal, setTiempoReal] = useState("");
  const [valorHora, setValorHora] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value || "");
      setClienteId(itemToEdit.clienteId || "");
      setTiempoEstimado(itemToEdit.tiempoEstimado || "");
      setTiempoReal(itemToEdit.tiempoReal || "");
      setValorHora(itemToEdit.valorHora || "");
    } else {
      setInputValue("");
      setClienteId("");
      setTiempoEstimado("");
      setTiempoReal("");
      setValorHora("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (tipo === 'tarea') {
        addOrUpdateItem(inputValue, clienteId, tiempoEstimado, tiempoReal, valorHora);
      } else {
        addOrUpdateItem(inputValue);
      }
      setInputValue("");
      setClienteId("");
      setTiempoEstimado("");
      setTiempoReal("");
      setValorHora("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder={tipo === 'cliente' ? "Nombre del cliente" : "Nombre de la tarea"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {tipo === "tarea" && clientes.length > 0 && (
        <div className="mb-2">
          <select
            className="form-select"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Seleccionar el cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.value}
              </option>
            ))}
          </select>
        </div>
      )}

      {tipo === "tarea" && (
        <>
          <div className="mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Tiempo estimado(horas)"
              value={tiempoEstimado}
              onChange={(e) => setTiempoEstimado(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Tiempo real(horas)"
              value={tiempoReal}
              onChange={(e) => setTiempoReal(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Valor por hora"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
            />
          </div>
        </>
      )}
       <button type="submit" class="btn btn-outline-secondary">{itemToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}

export default Form;
