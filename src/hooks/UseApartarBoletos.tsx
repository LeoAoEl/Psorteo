import { useState } from "react";
import axios from "axios";
import { type DatosUsuario } from "../types/tickets";
import { toast } from "react-toastify";

export function useApartarBoletos() {
  const [isApartando, setIsApartando] = useState(false);

  const apartarBoletos = async (
    boletosIds: number[],
    datosUsuario: DatosUsuario
  ) => {
    if (boletosIds.length === 0) {
      toast.error("Selecciona al menos un boleto", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return false;
    }

    if (
      !datosUsuario.nombre ||
      !datosUsuario.correo ||
      !datosUsuario.telefono
    ) {
      toast.error("Completa todos los datos del formulario", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return false;
    }

    setIsApartando(true);

    try {
      const response = await axios.put(
        "http://localhost:5000/boletos/apartar",
        {
          ids: boletosIds,
          nombre: datosUsuario.nombre,
          celular: datosUsuario.telefono,
          correo: datosUsuario.correo,
        }
      );

      toast.success("¡Boletos apartados con éxito!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.error || "Error al apartar los boletos";
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
      return false;
    } finally {
      setIsApartando(false);
    }
  };

  return {
    apartarBoletos,
    isApartando,
  };
}
