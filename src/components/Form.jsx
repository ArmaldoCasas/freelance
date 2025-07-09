import React, { useState, useEffect } from 'react';

function Form({ tipo, addOrUpdateItem, itemToEdit, clientes = [] }) {

  const [inputValue, setInputValue] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [tiempoEstimado, setTiempoEstimado] = useState("");
  const [tiempoReal, setTiempoReal] = useState("");
  const [valorHora, setValorHora] = useState("");

  //Edicion de item 
  useEffect(() => {
    if (itemToEdit) {
      //Si hay item para editar, precarga sus valores en el formulario
      setInputValue(itemToEdit.value || "");
      setClienteId(itemToEdit.clienteId || "");
      setTiempoEstimado(itemToEdit.tiempoEstimado || "");
      setTiempoReal(itemToEdit.tiempoReal || "");
      setValorHora(itemToEdit.valorHora || "");
    } else {
      //Si no hay item para editar, vacía los campos para agregar un item nuevo
      setInputValue("");
      setClienteId("");
      setTiempoEstimado("");
      setTiempoReal("");
      setValorHora("");
    }
  }, [itemToEdit]);

  //Envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      //Si el formulario es tipo 'tarea', envia todos los campos
      if (tipo === 'tarea') {
        addOrUpdateItem(inputValue, clienteId, tiempoEstimado, tiempoReal, valorHora);
      } else {
        //Si no, envia solo el nombre
        addOrUpdateItem(inputValue);
      }
      //Vacía los campos del formulario despues del envio
      setInputValue("");
      setClienteId("");
      setTiempoEstimado("");
      setTiempoReal("");
      setValorHora("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*Nombre de cliente o tarea*/}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder={tipo === 'cliente' ? "Nombre del cliente" : "Nombre de la tarea"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {/* Solo se muestra si tipo es 'tarea' y hay clientes disponibles */}
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

      {/* Campos adicionales para tareas */}
      {tipo === "tarea" && (
        <>
          {/* Tiempo estimado */}
          <div className="mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Tiempo estimado(horas)"
              value={tiempoEstimado}
              onChange={(e) => setTiempoEstimado(e.target.value)}
            />
          </div>
          {/* Tiempo real */}
          <div className="mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Tiempo real(horas)"
              value={tiempoReal}
              onChange={(e) => setTiempoReal(e.target.value)}
            />
          </div>
          {/* Valor por hora */}
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
       {/* Botón que cambia dependiendo de si se está editando o agregando */}
       <button type="submit" class="btn btn-outline-secondary">{itemToEdit ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}

export default Form;

