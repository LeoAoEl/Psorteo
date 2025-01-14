import { useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import TicketForm from "./TicketForm";
import { type TicketModalProps } from "../../types/tickets";

export default function TicketModal({ tickets }: TicketModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [maxTickets, setMaxTickets] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const openModal = (newMaxTickets: number, newPrice: number) => {
    setMaxTickets(newMaxTickets);
    setPrice(newPrice);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex justify-center gap-4">
        <button onClick={() => openModal(1, 25)} className="btn-primary">
          1 Boleto X $25 pesos
        </button>
        <button onClick={() => openModal(5, 100)} className="btn-primary">
          5 Boletos X $100 pesos
        </button>
        <button onClick={() => openModal(10, 200)} className="btn-secondary">
          10 Boletos X $200 pesos
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalContent className="bg-aFondo">
          <ModalBody>
            <TicketForm
              maxTickets={maxTickets}
              price={price}
              tickets={tickets}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
