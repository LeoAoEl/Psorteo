import { useState } from "react";
import { useBoletos } from "@hooks/userConsultaBoletos";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function ConsultaForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [emailToQuery, setEmailToQuery] = useState<string | null>(null);
  const { boletos, isLoading, fetchBoletos } = useBoletos();

  const handleOpenModal = async () => {
    if (inputEmail) {
      await fetchBoletos(inputEmail); // Llamar al API al abrir el modal
    }
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
        scrollBehavior={"inside"}
        backdrop="blur"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="4xl"
      >
        <ModalContent className="bg-fondo text-white">
          <ModalHeader className="text-2xl flex flex-col items-center justify-center">
            <span>Boletos de: {boletos[0]?.nombre} </span>
            <p className="text-primary">{emailToQuery}</p>
          </ModalHeader>
          <ModalBody>
            <main className="max-w-screen-xl mx-auto px-8 md:px-10 py-4 lg:py-8 leading-tight">
              {isLoading ? (
                <p className="text-center">Cargando boletos...</p>
              ) : boletos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center text-center lg:grid-cols-4 gap-2 md:gap-6">
                  {boletos.map((boleto) => (
                    <div
                      key={boleto.id}
                      className={`p-6  rounded-lg shadow-md ${
                        boleto.estado === "apartado"
                          ? "bg-orange-700 "
                          : "bg-blue-900"
                      }`}
                    >
                      <p className="text-lg md:text-2xl font-semibold text-slate-200 ">
                        Nº {boleto.numero_boleto}
                      </p>
                      <p
                        className={`text-sm  ${
                          boleto.estado === "confirmado"
                            ? " text-slate-200"
                            : "text-slate-200"
                        }`}
                      >
                        {boleto.estado.charAt(0).toUpperCase() +
                          boleto.estado.slice(1)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-red-500">
                  No se encontraron boletos para este correo.
                </p>
              )}
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
