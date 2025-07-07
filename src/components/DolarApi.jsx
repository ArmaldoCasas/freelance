import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div>
      {dolarValue ? (
      <div className="col-md-6">
        <div className="p-3 mb-2 bg-primary text-white">
          <p>1 USD = ${dolarValue} CLP </p>
        </div>
      </div>
      ) : (
        <p>cargando valor del dólar...</p>
      )}
    </div>
  );
}

export default DolarAPI;