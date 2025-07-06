import React, { useEffect, useState } from "react";

function DolarAPI() {
  const [dolarValue, setDolarValue] = useState(null);

  useEffect(() => {     //useEffect lo que hace es permitirnos declarar un efecto secundario 
    fetch("https://mindicador.cl/api/dolar") //fetch es lo que Llama a la Api
      .then(response => response.json())
      .then(data => {
        setDolarValue(data.serie[0].valor);       //Los then indican que lo que sigue se ejecute despues de que el anterior se complete
      })
      .catch(error => {
        console.error("error al obtener el valor del dólar:", error); //catch es como el try except de python, si un error ocurre evita que la app se rompa y en este caso, lo muestra por pantalla
      });
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "0 auto 20px auto"
      }}
    >
      <h2>Valor del Dólar (CLP)</h2>
      {dolarValue ? (
        <p>1 USD = ${dolarValue} CLP</p>
      ) : (
        <p>cargando valor del dólar...</p>
      )}
    </div>
  );
}

export default DolarAPI;