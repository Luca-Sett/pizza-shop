"use client";

import MenuItem from "@/components/MenuItem";
import { PizzaGridItem } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";
import PizzaDetails from "./PizzaDetails";

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PizzaGrid({ pizzas }: { pizzas: PizzaGridItem[] }) {
  const [activePizza, setActivePizza] = useState<PizzaGridItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = (pizza: PizzaGridItem) => {
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
        pizzaId={activePizza?._id}
        onClose={() => setShowDialog(!showDialog)}
      />
    </>
  );
}
