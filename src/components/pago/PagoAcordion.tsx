import { Accordion, AccordionItem } from "@nextui-org/react";
import { metodos } from "@constants/pago/pagoA";

const BancoIconos = {
  Santander: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.822 22.04c0 6.941 7.608 12.114 8.306 18.096c0 0 1.381-1.381 1.381-4.736s-7.127-13.368-7.127-16.577c0-2.475.231-3.464 1.454-4.907c0 5.598 9.094 11.836 9.094 17.932c0 0 1.381-1.382 1.381-4.736s-7.127-13.368-7.127-16.577c0-2.475.231-3.464 1.453-4.907c0 4.452 5.754 9.34 8.108 16.56h0C39.123 23.942 43.5 27.55 43.5 31.717c0 5.885-8.73 10.656-19.5 10.656S4.5 37.602 4.5 31.716c0-4.29 4.637-7.986 11.322-9.676"
      ></path>
    </svg>
  ),
  BBVA: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M38.5 5.5h-29c-2.2 0-4 1.8-4 4v29c0 2.2 1.8 4 4 4h29c2.2 0 4-1.8 4-4v-29c0-2.2-1.8-4-4-4"
      ></path>
      <path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m31.191 19.799l-3.348 8l-3.348-8m7.038 6.402l3.348-8l3.348 8m-17.546-2.402a2 2 0 1 1 0 4h-3.3v-8h3.3a2 2 0 1 1 0 4m0 0h-3.3m-4.313 0a2 2 0 1 1 0 4h-3.3v-8h3.3a2 2 0 1 1 0 4m.001 0h-3.3"
      ></path>
    </svg>
  ),
  Coppel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="#fff"
        d="M.738 2.879a.716.716 0 0 0-.738.74v16.762c0 .428.35.74.738.74h22.52a.74.74 0 0 0 .739-.74V3.619c.039-.428-.31-.74-.738-.74Zm6.614 6.34c1.167 0 2.1.935 2.1 2.101c0 .234-.04.427-.079.621h12.058v1.868h-.973v2.527h-.97v-1.283h-.935v1.283h-.972v-2.527H9.373c.04.194.079.428.079.623a2.09 2.09 0 0 1-2.1 2.1c-1.011 0-1.83-.7-2.063-1.634a3.4 3.4 0 0 1-.62.077a2.09 2.09 0 0 1-2.102-2.1c0-1.167.934-2.1 2.101-2.1c.234 0 .427 0 .621.079c.234-.934 1.052-1.635 2.063-1.635m0 1.168c-.545 0-.973.428-.934.933c0 .506.428.932.934.932a.945.945 0 0 0 .933-.932a.947.947 0 0 0-.933-.933M4.668 11.94a.947.947 0 0 0-.933.934c0 .506.428.934.933.934a.947.947 0 0 0 .934-.934a.947.947 0 0 0-.934-.934m2.684 1.518a.947.947 0 0 0-.934.934c0 .505.428.933.934.933a.947.947 0 0 0 .933-.933a.947.947 0 0 0-.933-.934"
      ></path>
    </svg>
  ),
};

export default function PagoAcordion() {
  const itemClases = {
    base: "py-2 w-full rounded-xl ",
    title: "font-bold text-white ",
    trigger:
      "py-0 p-4 bg-fondo hover:bg-secondary transition-all duration-200 rounded-xl h-auto  flex items-center text-white",
    indicator: "text-white font-bold",
    content: "rounded-xl p-4",
  };

  return (
    <main className="max-w-screen-xl mx-auto px-8 md:px-10 py-8 md:py-10 leading-tight ">
      <Accordion
        className="rounded-xl"
        itemClasses={itemClases}
        showDivider={false}
        variant="splitted"
      >
        {metodos.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            className="bg-secondary/20 text-xl"
          >
            <ul>
              {Object.entries(item).map(([banco, metodo]) => {
                if (banco === "title") return null;
                return (
                  <li key={banco} className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {BancoIconos[banco]}
                      <h3 className="text-white font-semibold text-lg">
                        {banco}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {metodo.map(({ tarjeta, clave, nombre }, idx) => (
                        <div
                          key={idx}
                          className="bg-secondary/30 border-white border text-white rounded-xl p-4"
                        >
                          <p className="text-sm">Tarjeta: {tarjeta}</p>
                          {clave && <p className="text-sm">Clave: {clave}</p>}
                          {nombre && (
                            <p className="text-sm">Nombre: {nombre}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
