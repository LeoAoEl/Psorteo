import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormularioUsuario from "./FormularioUser";
import SelectorBoletos from "./SelectorBoletos";
import { useBoletos } from "@hooks/useBoletos";
import useApartarBoletos from "@hooks/UseApartarBoletos";
import Ofertas from "./Ofertas";
import ProcesoPago from "./Pago";
import BoletosSeleccionados from "./BoletosSeleccionados";
import BuscadorBoletos from "./BuscadorBoletos";
import { type DatosUsuario } from "../../types/tickets";
import SeleccionAleatoria from "./GenerarAleatorio";

const DESCUENTO_5 = 0.2;
const DESCUENTO_10 = 0.4;

export default function Sorteo() {
  const [isConfirm, setIsConfirm] = useState(false);
  const { boletos, sorteoActivo, isLoading, recargarBoletos } = useBoletos();
  const { apartarBoletos, isApartando } = useApartarBoletos();
  const [boletosSeleccionados, setBoletosSeleccionados] = useState<number[]>(
    []
  );
  const [datosUsuario, setDatosUsuario] = useState<DatosUsuario>({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [paginaActual, setPaginaActual] = useState(1);
  const boletosPerPage = 100;

  //Función calcular precio total
  const calcularPrecioTotal = () => {
    if (!sorteoActivo) return { total: 0, descuento: 0 };
    const cantidad = boletosSeleccionados.length;
    const precioBase = cantidad * 5; // Precio fijo por boleto
    let descuento = 0;

    if (cantidad >= 10) {
      descuento = precioBase * DESCUENTO_10;
    } else if (cantidad >= 5) {
      descuento = precioBase * DESCUENTO_5;
    }

    return { total: precioBase - descuento, descuento };
  };

  //Función confirmar compra
  const confirmarCompra = async () => {
    if (boletosSeleccionados.length === 0) {
      toast.warning("Selecciona al menos un boleto", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
      });
      return;
    }
    if (
      !datosUsuario.nombre ||
      !datosUsuario.correo ||
      !datosUsuario.telefono
    ) {
      toast.warning("Completa todos los datos del formulario", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
      });
      return;
    }

    setIsConfirm(true);
    const success = await apartarBoletos(
      boletosSeleccionados,
      datosUsuario,
      calcularPrecioTotal().total.toString()
    );
    setIsConfirm(false);

    if (success) {
      setBoletosSeleccionados([]);
      recargarBoletos();
    } else {
      toast.error(
        "Error al apartar los boletos. Por favor, intenta de nuevo.",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          draggable: true,
        }
      );
    }
  };

  //Función generar boletos aleatorios
  const [mensaje, setMensaje] = useState<{
    tipo: "success" | "error";
    texto: string;
  } | null>(null);
  const seleccionarBoletoAleatorio = useCallback(
    (cantidad: number) => {
      const boletosLibres = boletos.filter((b) => b.estado === "libre");

      if (boletosLibres.length < cantidad) {
        setMensaje({
          tipo: "error",
          texto: "No hay suficientes boletos libres",
        });

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => setMensaje(null), 3000);
        return;
      }

      const seleccionados = boletosLibres
        .sort(() => 0.5 - Math.random())
        .slice(0, cantidad)
        .map((b) => parseInt(b.numero_boleto));
      setBoletosSeleccionados(seleccionados);

      setMensaje({
        tipo: "success",
        texto: `Se han seleccionado ${cantidad} boletos aleatoriamente`,
      });

      setTimeout(() => setMensaje(null), 3000);
    },
    [boletos]
  );

  if (isLoading)
    return <div className="text-center text-slate-200">Cargando sorteo...</div>;
  if (!sorteoActivo)
    return (
      <div className="text-center text-slate-200">
        No hay sorteos activos en este momento.
      </div>
    );

  const boletosPaginados = boletos
    .slice((paginaActual - 1) * boletosPerPage, paginaActual * boletosPerPage)
    .map((boleto) => ({
      id: boleto.ID_BOLETO,
      numero: boleto.numero_boleto,
      estado: boleto.estado,
    }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-slate-200">
        {sorteoActivo.nombre}
      </h1>
      <FormularioUsuario setDatosUsuario={setDatosUsuario} />
      <Ofertas />
      <div className=" flex flex-col-reverse  md:flex-row mx-auto gap-4 mb-6">
        <BuscadorBoletos
          boletos={boletosPaginados.map((b) => ({
            id: b.id,
            numero: b.numero,
            estado: b.estado,
          }))}
          seleccionarBoleto={(id) => {
            if (!boletosSeleccionados.includes(id)) {
              setBoletosSeleccionados((prev) => [...prev, id]); // Aquí trabajas con ID_BOLETO
            }
          }}
        />

        <SeleccionAleatoria
          onSeleccionAleatoria={seleccionarBoletoAleatorio}
          mensaje={mensaje}
        />
      </div>
      <SelectorBoletos
        boletos={boletosPaginados.map((b) => ({
          id: b.id, // ID_BOLETO
          numero: b.numero, // numero_boleto
          estado: b.estado,
        }))}
        boletosSeleccionados={boletosSeleccionados}
        setBoletosSeleccionados={setBoletosSeleccionados}
      />

      <div className="flex justify-center mt-4 mb-6">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="bg-primary text-slate-700 px-4 py-2 rounded mr-2 disabled:opacity-50 hover:bg-primary/90"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-slate-200">
          Página {paginaActual} de {Math.ceil(boletos.length / boletosPerPage)}
        </span>
        <button
          onClick={() =>
            setPaginaActual((prev) =>
              Math.min(prev + 1, Math.ceil(boletos.length / boletosPerPage))
            )
          }
          disabled={paginaActual === Math.ceil(boletos.length / boletosPerPage)}
          className="bg-primary text-slate-700 px-4 py-2 rounded ml-2 disabled:opacity-50 hover:bg-primary/90"
        >
          Siguiente
        </button>
      </div>
      <BoletosSeleccionados
        boletosSeleccionados={boletosSeleccionados}
        deseleccionarBoleto={(id) => {
          setBoletosSeleccionados((prev) => prev.filter((b) => b !== id));
        }}
        precioTotal={calcularPrecioTotal().total}
        descuento={calcularPrecioTotal().descuento}
      />
      <ProcesoPago
        precioTotal={calcularPrecioTotal().total}
        confirmarCompra={confirmarCompra}
        isConfirm={isConfirm}
      />
      <ToastContainer />
    </div>
  );
}
