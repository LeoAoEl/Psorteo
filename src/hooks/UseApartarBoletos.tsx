import { useState } from "react";
import axios from "axios";
import { type DatosUsuario } from "../types/tickets";
import { toast } from "react-toastify";

export default function useApartarBoletos() {
  const [isApartando, setIsApartando] = useState(false);

  const apartarBoletos = async (
    boletosIds: number[],
    datosUsuario: DatosUsuario,
    total: string
  ) => {
    if (boletosIds.length === 0) {
      toast.error("Selecciona al menos un boleto", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
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
        hideProgressBar: true,
      });
      return false;
    }

    setIsApartando(true);

    try {
      const response = await axios.put(
        "https://administradorsorteosback-production.up.railway.app/boletos/apartar",
        {
          ids: boletosIds,
          nombre: datosUsuario.nombre,
          celular: datosUsuario.telefono,
          correo: datosUsuario.correo,
          total: total,
        }
      );
      alert("¡Boletos apartados con éxito!");

      /* toast.success("¡Boletos apartados con éxito!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
      }); */

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
