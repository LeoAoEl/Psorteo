import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function Formulario() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="flex w-full flex-col md:flex-nowrap gap-4 max-w-lg mx-auto">
        <Input
          label="Email"
          type="email"
          placeholder="Ingrese su correo"
          className="w-full"
          value={email}
          onChange={handleEmailChange}
        />
        <Button
          color="primary"
          onPress={handleOpenModal}
          className="text-xl"
          isDisabled={!isEmailValid}
        >
          Consultar boletos
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
        <ModalContent className="bg-fondo text-white">
          <ModalHeader className="text-2xl flex items-center justify-center">
            Boletos de <span className="text-primary"> Marcos Avalos</span>
          </ModalHeader>
          <ModalBody>
            <main className="max-w-screen-xl mx-auto px-8 md:px-10 py-4 lg:py-8 leading-tight">
              <p>
                Aquí puedes incluir la información sobre los boletos
                relacionados con el correo ingresado.
              </p>
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
