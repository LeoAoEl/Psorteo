import React from "react";

interface SeleccionAleatoriaProps {
  onSeleccionAleatoria: (cantidad: number) => void;
  mensaje: { tipo: "success" | "error"; texto: string } | null;
}

const SeleccionAleatoria: React.FC<SeleccionAleatoriaProps> = ({
  onSeleccionAleatoria,
  mensaje,
}) => {
  return (
    <div className="flex flex-col items-center w-full lg:w-1/3">
      {/* Botones */}
      <div className="flex mb-2 space-x-2 w-full items-center justify-center">
        <button
          onClick={() => onSeleccionAleatoria(1)}
          className="bg-primary text-slate-700 px-3 py-1 rounded text-sm hover:bg-primary/90"
        >
          1 Boleto Aleatorio
        </button>
        <button
          onClick={() => onSeleccionAleatoria(5)}
          className="bg-gradient-to-r from-primary to-secondary text-slate-700 px-3 py-1 rounded text-sm hover:opacity-85"
        >
          5 Boletos Aleatorios
        </button>
        <button
          onClick={() => onSeleccionAleatoria(10)}
          className="bg-gradient-to-r from-secondary via-primary to-secondary text-slate-700 px-3 py-1 rounded text-sm hover:opacity-85"
        >
          10 Boletos Aleatorios
        </button>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div
          className={`text-center transition-all ease-in-out  px-4 py-2 rounded ${
            mensaje.tipo === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {mensaje.texto}
        </div>
      )}
    </div>
  );
};

export default SeleccionAleatoria;
