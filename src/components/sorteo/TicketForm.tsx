import { useState } from "react";
import SelectedTickets from "./SelectedTickets";
import TicketList from "./TickedList";
import SearchTickets from "./SearchTickets";
import { toast } from "react-toastify";
import { type TicketFormProps } from "../../types/tickets";

export default function TicketForm({
  maxTickets,
  price,
  tickets,
}: TicketFormProps) {
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [ticketsPerPage, setTicketsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSelectRandom = () => {
    const availableTickets = tickets.filter(
      (ticket) => ticket.estado === "libre" && !selectedTickets.includes(ticket)
    );
    const randomTickets = availableTickets
      .sort(() => 0.5 - Math.random())
      .slice(0, maxTickets);
    setSelectedTickets(randomTickets);
  };

  return (
    <div className="max-w-4xl mx-auto text-slate-200 py-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{maxTickets} NÚMEROS ✏️</h1>
        <p className="text-xl">
          {maxTickets} NÚMEROS ❌ ${price} PESOS
        </p>
      </div>

      <SelectedTickets selectedTickets={selectedTickets} />

      <SearchTickets
        tickets={tickets}
        selectedTickets={selectedTickets}
        setSelectedTickets={setSelectedTickets}
      />

      <TicketList
        tickets={tickets}
        selectedTickets={selectedTickets}
        maxTickets={maxTickets}
        setSelectedTickets={setSelectedTickets}
        ticketsPerPage={ticketsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={handleSelectRandom}
          className="btn-secondary"
        >
          Seleccionar al azar
        </button>
        <button
          type="button"
          onClick={() =>
            toast.success(
              `Boletos seleccionados: ${selectedTickets
                .map((t) => t.numero)
                .join(", ")}`
            )
          }
          className="btn-primary"
        >
          Apartar boletos
        </button>
      </div>
    </div>
  );
}
