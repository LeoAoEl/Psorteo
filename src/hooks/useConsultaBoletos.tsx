import { useState } from "react";
import axios from "axios";
import type { SorteoResponse } from "../types/tickets";
import { toast } from "react-toastify";

interface Ticket {
  id: number;
  numero_boleto: number;
  estado: "confirmado" | "apartado";
  nombre: string;
}

export default function useBoletos() {
  const [boletos, setBoletos] = useState<Ticket[]>([]);
  const [sorteoActivo, setSorteoActivo] = useState<
    SorteoResponse["sorteo"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBoletos = async (correo: string) => {
    if (!correo) {
      toast.error("Por favor, proporciona un correo válido.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      setBoletos([]);
      setSorteoActivo(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<Ticket[]>(
        `https://administradorsorteosback-production.up.railway.app/boletos/correo/${correo}`
      );

      setBoletos(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        toast.error("No hay boletos asociados a este correo.", {
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

  return {
    boletos,
    sorteoActivo,
    isLoading,
    fetchBoletos,
  };
}
