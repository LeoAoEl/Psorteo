import React from "react";

interface SeleccionAleatoriaProps {
  onSeleccionAleatoria: (cantidad: number) => void;
}

const SeleccionAleatoria: React.FC<SeleccionAleatoriaProps> = ({
  onSeleccionAleatoria,
}) => {
  return (
    <div className="flex mb-2 space-x-2 w-full lg:w-1/3 items-center  justify-center">
      <button
        onClick={() => onSeleccionAleatoria(1)}
        className="bg-primary text-slate-700 px-3 py-1 rounded text-sm hover:bg-primary/90"
      >
        1 Boleto Aleatorio
      </button>
      <button
        onClick={() => onSeleccionAleatoria(5)}
        className=" bg-gradient-to-r from-primary to-secondary text-slate-700 px-3 py-1 rounded text-sm hover:opacity-85"
      >
        5 Boletos Aleatorios
      </button>
      <button
        onClick={() => onSeleccionAleatoria(10)}
        className=" bg-gradient-to-r from-secondary via-primary to-secondary text-slate-700 px-3 py-1 rounded text-sm hover:opacity-85"
      >
        10 Boletos Aleatorios
      </button>
    </div>
  );
};

export default SeleccionAleatoria;
