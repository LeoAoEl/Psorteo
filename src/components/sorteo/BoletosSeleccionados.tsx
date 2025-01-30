import React from "react";
import type { Boleto } from "../../types/tickets";

interface Props {
  boletosSeleccionados: number[];
  deseleccionarBoleto: (id: number) => void;
  precioTotal: number;
  descuento: number;
  boletos: Boleto[];
  porcentajeDescuento: number; // Nueva prop
}

const BoletosSeleccionados: React.FC<Props> = ({
  boletosSeleccionados,
  deseleccionarBoleto,
  precioTotal,
  descuento,
  boletos,
  porcentajeDescuento, // Recibe el porcentaje
}) => {
  const obtenerNumeroBoleto = (id: number) => {
    const boleto = boletos.find((b) => b.ID_BOLETO === id);
    return boleto ? boleto.numero_boleto.padStart(5, "0") : "N/A";
  };

  return (
    <div className="bg-aFondo p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2 text-slate-200">
        Boletos Seleccionados
      </h2>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {boletosSeleccionados.map((id) => (
          <div
            key={id}
            className="bg-slate-700 p-2 rounded flex justify-between items-center"
          >
            <span className="text-slate-200">{obtenerNumeroBoleto(id)}</span>
            <button
              onClick={() => deseleccionarBoleto(id)}
              className="text-red-400 hover:text-red-300 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-slate-200">
        <div className="flex justify-between">
          <span>Número de boletos:</span>
          <span>{boletosSeleccionados.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Descuento aplicado:</span>
          <span className="text-green-400">${descuento.toFixed(2)} MXN</span>
        </div>

        {/* Nota de descuento */}
        {porcentajeDescuento > 0 && (
          <div className="text-sm text-slate-400 text-right">
            ({porcentajeDescuento}% de descuento por compra de{" "}
            {boletosSeleccionados.length} boletos)
          </div>
        )}

        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total a pagar:</span>
          <span className="text-primary">${precioTotal.toFixed(2)} MXN</span>
        </div>
      </div>
    </div>
  );
};

export default BoletosSeleccionados;
