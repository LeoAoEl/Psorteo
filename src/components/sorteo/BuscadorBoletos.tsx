import React, { useState } from "react";

interface BuscadorBoletosProps {
  boletos: { id: number; estado: "libre" | "apartado" | "confirmado" }[];
  seleccionarBoleto: (id: number) => void;
}

export default function BuscadorBoletos({
  boletos,
  seleccionarBoleto,
}: BuscadorBoletosProps) {
  const [busqueda, setBusqueda] = useState("");

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo permite números
    setBusqueda(value);
  };

  const boletosFiltrados = boletos
    .filter(
      (boleto) =>
        boleto.id.toString().padStart(5, "0").includes(busqueda) &&
        boleto.estado === "libre"
    )
    .slice(0, 15); // Limita a 15 resultados

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar número de boleto"
        value={busqueda}
        onChange={handleBusqueda}
        className="w-full p-2 border rounded mb-2"
        maxLength={5}
      />
      {busqueda && (
        <div className="grid grid-cols-5 gap-2">
          {boletosFiltrados.map((boleto) => (
            <button
              key={boleto.id}
              onClick={() => seleccionarBoleto(boleto.id)}
              className="bg-green-200 p-2 rounded hover:bg-green-300"
            >
              {boleto.id.toString().padStart(5, "0")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
