import React, { useState, useMemo } from "react";
import { Input } from "@heroui/react";

interface BuscadorBoletosProps {
  boletos: {
    id: number;
    numero: string;
    estado: "libre" | "apartado" | "confirmado";
  }[];
  seleccionarBoleto: (id: number) => void;
}

export default function BuscadorBoletos({
  boletos,
  seleccionarBoleto,
}: BuscadorBoletosProps) {
  const [busqueda, setBusqueda] = useState("");

  // Filtra en TODOS los boletos (60k)
  const boletosFiltrados = useMemo(() => {
    return boletos
      .filter(
        (boleto) =>
          boleto.numero.includes(busqueda) && boleto.estado === "libre"
      )
      .slice(0, 15);
  }, [busqueda, boletos]);

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setBusqueda(value);
  };

  return (
    <div className="w-full lg:w-2/3 items-center justify-center">
      <div>
        <Input
          type="text"
          label="Buscar número de boleto"
          value={busqueda}
          onChange={handleBusqueda}
          className="mb-2"
          maxLength={5}
        />
      </div>
      {busqueda && (
        <div className="grid grid-cols-5 gap-2">
          {boletosFiltrados.map((boleto) => (
            <button
              key={boleto.id}
              onClick={() => seleccionarBoleto(boleto.id)}
              className="bg-green-200 p-2 rounded hover:bg-green-300"
            >
              {boleto.numero.padStart(5, "0")} {/* Formato 00001 */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
