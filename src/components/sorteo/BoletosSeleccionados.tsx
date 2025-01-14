import React from "react";

interface BoletosSeleccionadosProps {
  boletosSeleccionados: number[];
  deseleccionarBoleto: (id: number) => void;
  precioTotal: number;
  descuento: number;
}

export default function BoletosSeleccionados({
  boletosSeleccionados,
  deseleccionarBoleto,
  precioTotal,
  descuento,
}: BoletosSeleccionadosProps) {
  const cantidadBoletos = boletosSeleccionados.length;
  let mensajeDescuento = "";

  if (cantidadBoletos >= 10) {
    mensajeDescuento = "Se está aplicando un descuento del 20%";
  } else if (cantidadBoletos >= 5) {
    mensajeDescuento = "Se está aplicando un descuento del 10%";
  }

  return (
    <div className="mb-6 bg-aFondo p-4 rounded text-slate-100">
      <h2 className="text-xl font-semibold mb-2">Boletos Seleccionados</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {boletosSeleccionados.map((id) => (
          <button
            key={id}
            onClick={() => deseleccionarBoleto(id)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            {id.toString().padStart(5, "0")} ✕
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p>Número de boletos: {cantidadBoletos}</p>
          <p>Descuento aplicado: ${descuento.toFixed(2)} MXN</p>
          {mensajeDescuento && (
            <p className="text-sm text-green-600 mt-2">{mensajeDescuento}</p>
          )}
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-lg font-bold text-primary">
            Total a pagar: ${precioTotal.toFixed(2)} MXN
          </p>
        </div>
      </div>
    </div>
  );
}
