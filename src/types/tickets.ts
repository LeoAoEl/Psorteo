export interface Sorteo {
  ID_SORTEO: number;
  nombre: string;
  isActive: number;
  descripcion: string;
  fecha_creacion: string;
}

export interface Boleto {
  ID_BOLETO: number;
  ID_SORTEO: number;
  numero_boleto: string;
  estado: "libre" | "apartado" | "confirmado";
  nombre: string | null;
  celular: string | null;
  correo: string | null;
  fecha_apartado: string | null;
}

export interface DatosUsuario {
  nombre: string;
  correo: string;
  telefono: string;
}

export interface SorteoResponse {
  sorteo: Sorteo;
  boletos: Boleto[];
}

export interface ApartarBoletosResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}
