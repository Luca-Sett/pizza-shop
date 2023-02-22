"use client";

import { motion } from "framer-motion";

export default function Title() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      className="flex flex-col gap-2"
    >
      <div className="grid items-center justify-center gap-2 grid-cols-[1fr_auto_1fr]">
        <div className="bg-white/50 h-0.5 w-full" />
        <h2 className="text-sm uppercase font-semibold text-white/80 lg:text-base">
          Welcome To
        </h2>
        <div className="bg-white/50 h-0.5 w-full" />
      </div>
      <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
        Luca's Pizzeria
      </h1>
      <div className="grid items-center justify-center gap-2 grid-cols-[1fr_auto_1fr]">
        <div className="bg-white/50 h-0.5 w-full" />
        <h2 className="text-sm uppercase font-semibold text-white/80 lg:text-base">
          The Best Pizza Ever
        </h2>
        <div className="bg-white/50 h-0.5 w-full" />
      </div>
    </motion.div>
  );
}
