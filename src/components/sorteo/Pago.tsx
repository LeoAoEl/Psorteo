import CreditCard from "@components/pago/CreditCard";
import { Transferencia } from "@constants/pago/MetodoPago";
import { Spinner } from "@nextui-org/react";
interface ProcesoPagoProps {
  precioTotal: number;
  confirmarCompra: () => void;
  isConfirm: boolean;
}

export default function ProcesoPago({
  precioTotal,
  confirmarCompra,
  isConfirm,
}: ProcesoPagoProps) {
  return (
    <div className="mb-6">
      <div className="bg-aFondo p-4 rounded mb-4 text-slate-50">
        <h3 className="font-bold mb-2">Instrucciones de Pago:</h3>
        <p>
          1. Realiza una transferencia o depósito a una de las siguientes
          cuentas:
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-evenly py-4">
          {Transferencia.map((objeto) => (
            <CreditCard {...objeto} />
          ))}
        </div>
        <p>
          2. Envía el comprobante de pago al siguiente número de WhatsApp: +52
          123 456 7890
        </p>
        <p className=" py-2">
          3. Se enviará un correo de confrimación sobre tus boletos comprados
        </p>
      </div>
      <button
        onClick={confirmarCompra}
        disabled={isConfirm}
        className={`bg-primary flex mx-auto items-center justify-center text-slate-700 px-4 py-2 rounded text-3xl hover:bg-primary/90 ${
          isConfirm ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isConfirm ? (
          <>
            <Spinner
              className=" text-slate-950"
              color={"current"}
              labelColor={"foreground"}
              label="Procesando..."
            />
          </>
        ) : (
          "Apartar boletos"
        )}
      </button>
    </div>
  );
}
