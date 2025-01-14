import { type TicketListProps } from "../../types/tickets";

export default function TicketList({
  tickets,
  selectedTickets,
  maxTickets,
  setSelectedTickets,
  ticketsPerPage,
  currentPage,
  setCurrentPage,
}: TicketListProps) {
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const toggleTicketSelection = (ticket: Ticket) => {
    if (ticket.estado === "confirmado") return; // No permite seleccionar boletos confirmados.
    if (selectedTickets.includes(ticket)) {
      setSelectedTickets((prev) => prev.filter((t) => t !== ticket));
    } else if (selectedTickets.length < maxTickets) {
      setSelectedTickets((prev) => [...prev, ticket]);
    }
  };

  const currentTickets = tickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  return (
    <div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {currentTickets.map((ticket) => (
          <div
            key={ticket.numero}
            className={`${
              ticket.estado === "libre"
                ? "bg-green-100 text-detalle"
                : ticket.estado === "apartado"
                  ? "bg-primary text-slate-800"
                  : "text-white"
            } p-2 rounded text-center text-xs md:text-sm cursor-pointer ${
              ticket.estado === "confirmado"
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-80"
            } transition-opacity`}
            onClick={() => toggleTicketSelection(ticket)}
          >
            {ticket.numero}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <select
          value={ticketsPerPage}
          onChange={(e) => setTicketsPerPage(Number(e.target.value))}
          className="p-2 rounded border border-gray-300"
        >
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Anterior
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
