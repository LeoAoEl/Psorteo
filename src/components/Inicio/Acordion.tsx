import { Accordion, AccordionItem } from "@nextui-org/react";
import { acordion } from "@constants/acordion";

export default function Acordion() {
  const itemClases = {
    base: "py-2 w-full rounded-xl ",
    title: "font-bold text-slate-200 ",
    trigger:
      "py-0 p-4 bg-fondo hover:bg-secondary transition-all duration-200 rounded-xl h-auto  flex items-center text-white",
    indicator: "text-slate-800 font-bold",
    content: "rounded-xl p-4",
  };

  return (
    <main className="max-w-screen-xl mx-auto px-8 md:px-10 py-8 md:py-10 leading-tight ">
      <Accordion
        className="rounded-xl "
        itemClasses={itemClases}
        showDivider={true}
        variant="splitted"
      >
        {acordion.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            className="bg-secondary/20 text-xl "
          >
            <p className="prose-lg text-slate-200">{item.desc}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
