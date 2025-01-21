export default function Ofertas() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-slate-200">
        Ofertas Especiales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary p-4 text-center rounded flex items-center justify-center flex-col">
          <h3 className="font-bold">¡Compra 5 boletos!</h3>
          <p>Obtén un 20% de descuento en tu compra total.</p>
        </div>
        <div className="bg-gradient-to-r from-primary via-secondary text-center to-primary p-4 rounded flex items-center justify-center flex-col">
          <h3 className="font-bold">¡Compra 10 boletos!</h3>
          <p>Obtén un 40% de descuento en tu compra total.</p>
        </div>
      </div>
    </div>
  );
}
