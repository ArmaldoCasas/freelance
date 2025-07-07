import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registro de elementos para Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart() {
  const [dataGrafico, setDataGrafico] = useState(null);

  useEffect(() => {
    try {
      const tareasRaw = localStorage.getItem("tareas");
      if (!tareasRaw) return;

      const tareas = JSON.parse(tareasRaw);
      if (!Array.isArray(tareas) || tareas.length === 0) return;

      const resumen = {};
      tareas.forEach((tarea) => {
        const clienteId = tarea.clienteId || "Sin cliente";
        const horas = parseFloat(tarea.tiempoReal) || 0;
        const valor = parseFloat(tarea.valorHora) || 0;
        const total = horas * valor;

        if (!resumen[clienteId]) {
          resumen[clienteId] = { horas: 0, facturacion: 0 };
        }

        resumen[clienteId].horas += horas;
        resumen[clienteId].facturacion += total;
      });

      const clientesRaw = localStorage.getItem("clientes");
      const clientes = clientesRaw ? JSON.parse(clientesRaw) : [];

      const labels = Object.keys(resumen).map((id) => {
        const cliente = clientes.find((c) => c.id.toString() === id);
        return cliente ? cliente.value : "Cliente eliminado";
      });

      const horas = Object.values(resumen).map((r) => r.horas);
      const facturacion = Object.values(resumen).map((r) => r.facturacion);

      setDataGrafico({
        labels,
        datasets: [
          {
            label: "Horas trabajadas",
            data: horas,
            backgroundColor: "#8884d8",
          },
          {
            label: "Facturación ($)",
            data: facturacion,
            backgroundColor: "#82ca9d",
          },
        ],
      });
    } catch (error) {
      console.error("Error generando gráfico:", error);
    }
  }, []);

  return (
    <div>
      <h4 className="mb-3">Reporte de rendimiento y facturación</h4>
      {dataGrafico ? (
        <Bar data={dataGrafico} />
      ) : (
        <p className="text-muted">No hay datos disponibles para graficar.</p>
      )}
    </div>
  );
}

export default BarChart;