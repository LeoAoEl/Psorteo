import { useState, useEffect } from "react";
import axios from "axios";
import type { SorteoResponse, Boleto } from "../types/tickets";
import { toast } from "react-toastify";

export function useBoletos() {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [sorteoActivo, setSorteoActivo] = useState<
    SorteoResponse["sorteo"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoletos = async () => {
    try {
      const response = await axios.get<SorteoResponse>(
        "https://administradorsorteosback-production.up.railway.app/sorteos/activo"
      );
      // TODO: Filtrar boletos: Solo Libres y Confirmados
      // const boletosFiltrados = response.data.boletos.filter(
      //   (boleto) => boleto.estado === "libre" || boleto.estado === "confirmado"
      // );
      setBoletos(response.data.boletos);
      setSorteoActivo(response.data.sorteo);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        toast.error("No hay sorteos activos en este momento.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        toast.error(
          "Error al cargar los boletos. Por favor, intente más tarde.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
          }
        );
      }
      setBoletos([]);
      setSorteoActivo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoletos();
  }, []);

  return {
    boletos,
    sorteoActivo,
    isLoading,
    recargarBoletos: fetchBoletos,
  };
}
