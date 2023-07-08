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
      <div className="mx-auto max-w-6xl @container">
        {pizzaData.categories.length > 0 && (
          <div className="mx-auto mb-4 max-w-sm rounded-xl bg-white p-4 @[480px]:max-w-none">
            <div className="mb-2 text-sm font-semibold uppercase">
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
                  className="rounded bg-black/10 px-2 py-[3px] text-xs font-semibold uppercase transition-colors duration-100"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(230px,100%),1fr))] gap-5">
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
