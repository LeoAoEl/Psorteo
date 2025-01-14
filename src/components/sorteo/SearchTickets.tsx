import { useState } from "react";
import { Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { type SearchTicketsProps } from "../../types/tickets";

export default function SearchTickets({
  tickets,
  selectedTickets,
  setSelectedTickets,
}: SearchTicketsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.match(/^[0-9]+$/)) {
      toast.error("Por favor, ingrese un número válido.");
      return;
    }
    const foundTickets = tickets.filter(
      (ticket) => ticket.numero === searchQuery
    );
    if (foundTickets.length > 0) {
      setSelectedTickets((prev) => [...prev, ...foundTickets]);
    } else {
      toast.info("No se encontró el boleto con ese número.");
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <Input
        type="text"
        placeholder="Busca tu boleto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Buscar boleto
      </button>
    </div>
  );
}
