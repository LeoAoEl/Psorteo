import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormularioUsuario from "./FormularioUser";
import SelectorBoletos from "./SelectorBoletos";
import Ofertas from "./Ofertas";
import ProcesoPago from "./Pago";
import BoletosSeleccionados from "./BoletosSeleccionados";
import BuscadorBoletos from "./BuscadorBoletos";

interface Boleto {
  id: number;
  estado: "libre" | "apartado" | "confirmado";
}

const PRECIO_BOLETO = 25;
const DESCUENTO_5 = 0.1; // 10% de descuento
const DESCUENTO_10 = 0.2; // 20% de descuento

export default function SorteoForm() {
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState<number[]>(
    []
  );
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [paginaActual, setPaginaActual] = useState(1);
  const boletosPerPage = 100;

  useEffect(() => {
    // Inicializar boletos (asumimos 1000 boletos)
    setBoletos(
      Array.from({ length: 60000 }, (_, i) => ({ id: i + 1, estado: "libre" }))
    );
  }, []);

  const seleccionarBoletoAleatorio = (cantidad: number) => {
    setBoletosSeleccionados([]); // Limpiar selecciones previas
    const boletosLibres = boletos.filter((b) => b.estado === "libre");
    if (boletosLibres.length < cantidad) {
      toast.error("No hay suficientes boletos libres");
      return;
    }
    const seleccionados = boletosLibres
      .sort(() => 0.5 - Math.random())
      .slice(0, cantidad)
      .map((b) => b.id);
    setBoletosSeleccionados(seleccionados);
    actualizarEstadoBoletos(seleccionados, "apartado");
  };

  const actualizarEstadoBoletos = (
    ids: number[],
    estado: "libre" | "apartado" | "confirmado"
  ) => {
    setBoletos((prev) =>
      prev.map((b) => (ids.includes(b.id) ? { ...b, estado } : b))
    );
  };

  const calcularPrecioTotal = () => {
    const cantidad = boletosSeleccionados.length;
    let precioBase = cantidad * PRECIO_BOLETO;
    let descuento = 0;

    if (cantidad >= 10) {
      descuento = precioBase * DESCUENTO_10;
    } else if (cantidad >= 5) {
      descuento = precioBase * DESCUENTO_5;
    }

    return { total: precioBase - descuento, descuento };
  };

  const confirmarCompra = () => {
    if (boletosSeleccionados.length === 0) {
      toast.error("Selecciona al menos un boleto");
      return;
    }
    if (
      !datosUsuario.nombre ||
      !datosUsuario.correo ||
      !datosUsuario.telefono
    ) {
      toast.error("Completa todos los datos del formulario");
      return;
    }
    actualizarEstadoBoletos(boletosSeleccionados, "confirmado");
    toast.success(
      "¡Compra confirmada! Envía tu comprobante de pago por WhatsApp"
    );
    // Aquí va a ir la logíca para enviar el asunto al back
  };

  const deseleccionarBoleto = (id: number) => {
    setBoletosSeleccionados((prev) => prev.filter((b) => b !== id));
    actualizarEstadoBoletos([id], "libre");
  };

  const boletosPaginados = boletos.slice(
    (paginaActual - 1) * boletosPerPage,
    paginaActual * boletosPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <FormularioUsuario setDatosUsuario={setDatosUsuario} />
      <Ofertas />
      <BuscadorBoletos
        boletos={boletos}
        seleccionarBoleto={(id) => {
          if (!boletosSeleccionados.includes(id)) {
            setBoletosSeleccionados((prev) => [...prev, id]);
            actualizarEstadoBoletos([id], "apartado");
          }
        }}
      />
      <div className="flex space-x-2 flex-col md:flex-row mb-4 mx-auto items-center justify-center gap-8">
        <button
          onClick={() => seleccionarBoletoAleatorio(1)}
          className="bg-primary text-slate-700 px-4 py-2 rounded hover:bg-primary/90"
        >
          1 Boleto aleatorio
        </button>
        <button
          onClick={() => seleccionarBoletoAleatorio(5)}
          className="bg-primary text-slate-700 px-4 py-2 rounded hover:bg-primary/90"
        >
          5 Boletos aleatorios
        </button>
        <button
          onClick={() => seleccionarBoletoAleatorio(10)}
          className="bg-primary text-slate-700 px-4 py-2 rounded hover:bg-primary/90"
        >
          10 Boletos aleatorios
        </button>
      </div>
      <SelectorBoletos
        boletos={boletosPaginados}
        boletosSeleccionados={boletosSeleccionados}
        setBoletosSeleccionados={setBoletosSeleccionados}
        seleccionarBoletoAleatorio={seleccionarBoletoAleatorio}
      />
      <div className="flex justify-center mt-4 mb-6">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="bg-primary text-slate-700 px-4 py-2 rounded mr-2 disabled:opacity-50"
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
          className="bg-primary text-slate-700 px-4 py-2 rounded ml-2 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <BoletosSeleccionados
        boletosSeleccionados={boletosSeleccionados}
        deseleccionarBoleto={deseleccionarBoleto}
        precioTotal={calcularPrecioTotal().total}
        descuento={calcularPrecioTotal().descuento}
      />
      <ProcesoPago
        precioTotal={calcularPrecioTotal().total}
        confirmarCompra={confirmarCompra}
      />
    </div>
  );
}
