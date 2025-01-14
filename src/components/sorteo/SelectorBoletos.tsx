import React from "react";

interface SelectorBoletosProps {
  boletos: { id: number; estado: "libre" | "apartado" | "confirmado" }[];
  boletosSeleccionados: number[];
  setBoletosSeleccionados: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SelectorBoletos({
  boletos,
  boletosSeleccionados,
  setBoletosSeleccionados,
}: SelectorBoletosProps) {
  const toggleBoleto = (id: number) => {
    if (boletosSeleccionados.includes(id)) {
      setBoletosSeleccionados((prev) => prev.filter((b) => b !== id));
    } else if (boletosSeleccionados.length < 10) {
      setBoletosSeleccionados((prev) => [...prev, id]);
    } else {
      alert("No puedes seleccionar más de 10 boletos");
    }
  };

  const getBoletoCss = (estado: string, isSelected: boolean) => {
    switch (estado) {
      case "libre":
        return isSelected
          ? "bg-blue-500 text-white"
          : "bg-green-200 hover:bg-green-300";
      case "apartado":
        return "bg-primary cursor-not-allowed";
      case "confirmado":
        return "bg-gray-300 cursor-not-allowed opacity-50";
      default:
        return "";
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-slate-200">
        Selección de Boletos
      </h2>
      <div className="flex justify-center md:justify-start space-x-4 mb-4 text-slate-200">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 mr-2"></div>
          <span>Libre</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-200 mr-2"></div>
          <span>Apartado</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 mr-2"></div>
          <span>Confirmado</span>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-10 gap-2 mb-4">
        {boletos.map((boleto) => (
          <button
            key={boleto.id}
            onClick={() => boleto.estado === "libre" && toggleBoleto(boleto.id)}
            className={`p-2 text-center rounded ${getBoletoCss(boleto.estado, boletosSeleccionados.includes(boleto.id))}`}
            disabled={boleto.estado !== "libre"}
          >
            {boleto.id.toString().padStart(5, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}
