import { type SelectedTicketsProps } from "../../types/tickets";

export default function SelectedTickets({
  selectedTickets,
}: SelectedTicketsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selectedTickets.map((ticket) => (
        <div
          key={ticket.numero}
          className="bg-green-200 text-green-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium"
        >
          {ticket.numero}
        </div>
      ))}
    </div>
  );
}
