import React from "react";

interface FormularioUsuarioProps {
  setDatosUsuario: React.Dispatch<
    React.SetStateAction<{
      nombre: string;
      correo: string;
      telefono: string;
    }>
  >;
}

export default function FormularioUsuario({
  setDatosUsuario,
}: FormularioUsuarioProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosUsuario((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-slate-200">
        Datos del Participante
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre Completo"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}
