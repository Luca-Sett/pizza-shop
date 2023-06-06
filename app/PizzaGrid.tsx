"use client";

import MenuItem from "@/components/MenuItem";
import { Pizza } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";
import PizzaDetails from "./PizzaDetails";

const pizzas: Pizza[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    name: `Margherita ${i}`,
    price: 5.5,
    image: "margherita.webp",
    isVegetarian: true,
    isHot: false,
  }));

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PizzaGrid() {
  const [activePizza, setActivePizza] = useState<Pizza | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = (pizza: Pizza) => {
    setActivePizza(pizza);
    setShowDialog(!showDialog);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5"
        >
          {pizzas.map((pizza, i) => (
            <MenuItem
              key={i}
              pizza={pizza}
              i={i}
              onClick={() => toggleDialog(pizza)}
            />
          ))}
        </motion.div>
      </div>

      <PizzaDetails
        show={showDialog}
        pizza={activePizza}
        onClose={() => setShowDialog(!showDialog)}
      />
    </>
  );
}
