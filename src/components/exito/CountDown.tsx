import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date("2025-05-14T23:59:59");
      const difference = +end - +now;

      const newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="  bg-gradient-to-r from-secondary/80 to-primary/80 text-black py-20">
      <div className="container mx-auto text-center items-center justify-center flex  flex-col h-screen min-h-screen ">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ¡Gran Primer Sorteo!
        </motion.h1>
        <p className="text-xl mb-10">
          No te pierdas la oportunidad de ganar increíbles premios
        </p>
        <div className="flex justify-center space-x-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * Object.keys(timeLeft).indexOf(unit),
              }}
            >
              <div className="text-4xl font-bold">{value}</div>
              <div className="text-sm uppercase">{unit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
