"use client";

import MenuItem from "@/components/MenuItem";
import { Pizza, PizzaData } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";
import PizzaDetails from "./PizzaDetails";

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PizzaGrid({ pizzaData }: { pizzaData: PizzaData }) {
  const [activePizza, setActivePizza] = useState(pizzaData.pizzas[0]);
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
          className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-5"
        >
          {pizzaData.pizzas.map((pizza, index) => (
            <MenuItem
              key={pizza.name}
              pizza={pizza}
              onClick={() => toggleDialog(pizza)}
              isPriorityImage={index <= 12}
            />
          ))}
        </motion.div>
      </div>

      <PizzaDetails
        show={showDialog}
        pizza={activePizza}
        sizes={pizzaData.sizes}
        onClose={() => setShowDialog(!showDialog)}
      />
    </>
  );
}
