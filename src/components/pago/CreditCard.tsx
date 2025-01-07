import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreditCardProps {
  type: "bbva" | "santander" | "coppel" | string;
  cardNumber: string;
  cardClave?: string;
  cardHolder?: string;
  logoSrc: string;
  logoAlt: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  type,
  cardNumber,
  cardClave,
  cardHolder,
  logoSrc,
  logoAlt,
}) => {
  const backgroundColors: Record<string, string> = {
    bbva: "bg-blue-600",
    santander: "bg-white",
    coppel: "bg-[#ffe525]",
  };

  const textColors: Record<string, string> = {
    bbva: "text-white",
    santander: "text-[#ff0000]",
    coppel: "text-[#235ba6]",
  };

  const bgColor = backgroundColors[type] || "bg-gray-600";
  const textColor = textColors[type] || "text-gray-800";

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${type} copiado al portapapeles`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      (err) => {
        console.error("Error al copiar: ", err);
        toast.error("Error al copiar el texto");
      }
    );
  };

  return (
    <div
      className={`${bgColor} rounded-xl shadow-2xl p-6 relative overflow-hidden max-w-xl`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-opacity-30 to-opacity-50"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <img src={logoSrc} alt={logoAlt} className="h-10" />
        </div>
        <div
          className={`${textColor} text-2xl md:text-3xl font-mono mb-6 cursor-pointer hover:text-opacity-70 transition-colors`}
          onClick={() => copyToClipboard(cardNumber, "Número de tarjeta")}
        >
          {cardNumber}
        </div>
        <div className="flex justify-between items-end">
          {cardClave && (
            <div>
              <div className={`${textColor} text-xs mb-1 opacity-70`}>
                Clave
              </div>
              <div
                className={`${textColor} text-lg font-mono cursor-pointer hover:text-opacity-70 transition-colors`}
                onClick={() => copyToClipboard(cardClave, "Clave")}
              >
                {cardClave}
              </div>
            </div>
          )}
          {cardHolder && (
            <div className="text-right">
              <div className={`${textColor} text-xs mb-1 opacity-70`}>
                TITULAR
              </div>
              <div
                className={`${textColor} text-lg font-semibold cursor-pointer`}
                onClick={() =>
                  copyToClipboard(cardHolder, "Nombre del titular")
                }
              >
                {cardHolder}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreditCard;
