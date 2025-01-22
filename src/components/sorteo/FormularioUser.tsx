import React from "react";
import { Input } from "@heroui/react";

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
        <Input
          type="text"
          name="nombre"
          label="Nombre completo"
          onChange={handleChange}
          className=""
        />
        <Input
          type="email"
          name="correo"
          label="Correo Electrónico"
          onChange={handleChange}
        />
        <Input
          type="tel"
          name="telefono"
          label="Teléfono"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
