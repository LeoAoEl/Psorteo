export interface Ticket {
  numero: string; // Número del boleto
  estado: "libre" | "apartado" | "confirmado"; // Estado del boleto
}

// Props para el componente SelectedTickets
export interface SelectedTicketsProps {
  selectedTickets: Ticket[]; // Boletos seleccionados
}

// Props para el componente SearchTickets
export interface SearchTicketsProps {
  tickets: Ticket[]; // Todos los boletos disponibles
  selectedTickets: Ticket[]; // Boletos seleccionados
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>; // Función para actualizar los boletos seleccionados
}

// Props para el componente TicketList
export interface TicketListProps {
  tickets: Ticket[]; // Todos los boletos disponibles
  selectedTickets: Ticket[]; // Boletos seleccionados
  maxTickets: number; // Máximo de boletos permitidos
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>; // Función para actualizar los boletos seleccionados
  ticketsPerPage: number; // Cantidad de boletos por página
  currentPage: number; // Página actual
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Función para actualizar la página actual
}

// Props para el componente TicketForm
export interface TicketFormProps {
  maxTickets: number; // Máximo de boletos permitidos
  price: number; // Precio total
  tickets: Ticket[]; // Todos los boletos disponibles
}

// Props para el componente TicketModal
export interface TicketModalProps {
  tickets: Ticket[]; // Todos los boletos disponibles
}
