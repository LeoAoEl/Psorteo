import React from "react";
import { toast } from "react-toastify";

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
      toast.warning("No puedes seleccionar más de 10 boletos", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
      });
    }
  };

  const getBoletoCss = (estado: string, isSelected: boolean) => {
    switch (estado) {
      case "libre":
        return isSelected
          ? "bg-blue-500 text-white"
          : "bg-green-200 hover:bg-green-300";
      case "apartado":
        return "bg-slate-300 opacity-50 cursor-not-allowed";
      case "confirmado":
        return "bg-slate-300 cursor-not-allowed opacity-50";
      default:
        return "";
    }
  };

  return (
    <div className="mb-6">
      <h2 className=" text-slate-200 text-xl font-semibold mb-2">
        Selección de Boletos
      </h2>
      <div className="flex justify-center  gap-8 space-x-4 mb-4 text-slate-200 text-lg">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 mr-2"></div>
          <span>Libre</span>
        </div>
        {/* <div className="flex items-center">
          <div className="w-4 h-4 bg-primary opacity-80  mr-2"></div>
          <span>Vendido</span>
        </div> */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-slate-300 opacity-50 mr-2"></div>
          <span>Vendido</span>
        </div>
      </div>
      <div className="grid md:grid-cols-8 grid-cols-4 lg:grid-cols-10 gap-2 mb-4">
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
