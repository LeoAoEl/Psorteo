interface ProcesoPagoProps {
  precioTotal: number;
  confirmarCompra: () => void;
}

export default function ProcesoPago({
  precioTotal,
  confirmarCompra,
}: ProcesoPagoProps) {
  return (
    <div className="mb-6">
      <div className="bg-aFondo p-4 rounded mb-4 text-slate-50">
        <h3 className="font-bold mb-2">Instrucciones de Pago:</h3>
        <p>
          1. Realiza una transferencia o depósito a una de las siguientes
          cuentas:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Banco A: 1234-5678-9012-3456</li>
          <li>Banco B: 9876-5432-1098-7654</li>
          <li>Banco C: 9236-1452-6058-2864</li>
        </ul>
        <p>
          2. Envía el comprobante de pago al siguiente número de WhatsApp: +52
          123 456 7890
        </p>
      </div>
      <button
        onClick={confirmarCompra}
        className="bg-primary flex mx-auto items-center justify-center text-slate-700 px-4 py-2 rounded text-3xl hover:bg-primary/90"
      >
        Apartar boletos
      </button>
    </div>
  );
}
