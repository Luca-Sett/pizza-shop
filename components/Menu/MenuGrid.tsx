"use client";

import MenuItem from "./MenuItem";
import { Pizza, PizzaData } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ItemModal from "./ItemModal";

export default function MenuGrid({ pizzaData }: { pizzaData: PizzaData }) {
  const [activePizza, setActivePizza] = useState(pizzaData.pizzas[0]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleDialog = (pizza: Pizza) => {
    setActivePizza(pizza);
    setShowDialog(!showDialog);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredPizzas = selectedCategory
    ? pizzaData.pizzas.filter((pizza) =>
        pizza.categories.some((category) => category.name === selectedCategory)
      )
    : pizzaData.pizzas;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {pizzaData.categories.length > 0 && (
          <div className="mb-4 bg-white p-4 rounded-xl">
            <div className="font-semibold text-sm uppercase mb-2">
              Filter by Category
            </div>
            <div className="flex flex-wrap gap-2">
              {pizzaData.categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => toggleCategory(category.name)}
                  style={{
                    backgroundColor:
                      selectedCategory === category.name
                        ? category.colourBg
                        : "",
                    color:
                      selectedCategory === category.name
                        ? category.colourFg
                        : "",
                  }}
                  className="transition-colors duration-100 font-semibold text-xs uppercase rounded px-2 py-[3px] bg-black/10"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-5">
          <AnimatePresence mode="popLayout">
            {filteredPizzas.map((pizza, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                layout
                key={pizza.name}
              >
                <MenuItem
                  pizza={pizza}
                  onClick={() => toggleDialog(pizza)}
                  isPriorityImage={index <= 12}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ItemModal
        show={showDialog}
        pizza={activePizza}
        sizes={pizzaData.sizes}
        onClose={() => setShowDialog(!showDialog)}
      />
    </>
  );
}
