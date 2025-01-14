import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface Ticket {
  number: number;
  status: "comprado" | "apartado";
}

interface ConsultaFormProps {
  tickets: Ticket[];
  email?: string;
}

export default function ConsultaForm({ tickets }: ConsultaFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [modalEmail, setModalEmail] = useState("");

  const handleOpenModal = () => {
    setModalEmail(inputEmail);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      <div className="flex w-full flex-col md:flex-nowrap gap-4 max-w-lg mx-auto">
        <Input
          label="Email"
          type="email"
          placeholder="Ingrese su correo"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className="w-full"
        />
        <Button
          color="primary"
          onPress={handleOpenModal}
          className="text-xl"
          isDisabled={!isEmailValid(inputEmail)}
        >
          Consultar boletos
        </Button>
      </div>

      <Modal
        backdrop="blur"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="3xl"
      >
        <ModalContent className="bg-fondo text-white">
          <ModalHeader className="text-2xl flex flex-col items-center justify-center">
            <span>Boletos de:</span>
            <p className="text-primary">{modalEmail}</p>
          </ModalHeader>
          <ModalBody>
            <main className="max-w-screen-xl mx-auto px-8 md:px-10 py-4 lg:py-8 leading-tight">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.number}
                    className={`p-4 rounded-lg shadow ${
                      ticket.status === "comprado"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <p className="text-lg font-semibold text-slate-800">
                      Nº {ticket.number}
                    </p>
                    <p
                      className={`text-sm ${
                        ticket.status === "comprado"
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </main>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
