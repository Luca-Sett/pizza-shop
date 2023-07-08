"use client";

import { PizzaBasketItem } from "@/lib/types";
import { gpb } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BasketItem({
  item,
  sizes,
  updateQuantity,
  updateSizeIndex,
  removeItem,
}: {
  item: PizzaBasketItem;
  sizes: number[];
  updateQuantity: (newQuantity: number) => void;
  updateSizeIndex: (newSizeIndex: number) => void;
  removeItem: () => void;
}) {
  const price = gpb.format(item.quantity * item.pizza.prices[item.sizeIndex]);

  return (
    <>
      <h3 className="font-semibold">{item.pizza.name}</h3>
      <div className="flex flex-col gap-2 text-sm font-medium">
        <div className="flex justify-between">
          <span>Size</span>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
            }}
          >
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => updateSizeIndex(index)}
                className="relative px-2 py-[3px]"
              >
                <span className="relative z-10">{size}&rdquo;</span>
                {item.sizeIndex === index && (
                  <motion.div
                    layoutId={`sizeIndicator-${item.id}`}
                    className="absolute inset-0 z-0 rounded bg-black/10"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <span>Quantity</span>
          <div className="flex gap-1">
            <motion.button
              animate={{ scale: 1 }}
              whileHover={{ scale: item.quantity === 1 ? 1 : 1.05 }}
              whileTap={{ scale: item.quantity === 1 ? 1 : 0.95 }}
              className="rounded bg-black/10 px-2 py-[3px] transition-opacity disabled:opacity-40"
              disabled={item.quantity === 1}
              onClick={() => updateQuantity(item.quantity - 1)}
            >
              -
            </motion.button>
            <div className="w-4 rounded py-[3px] text-center">
              {item.quantity}
            </div>
            <motion.button
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded bg-black/10 px-2 py-[3px]"
              onClick={() => updateQuantity(item.quantity + 1)}
            >
              +
            </motion.button>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-semibold">
        <motion.button
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded bg-red-bg px-2 py-0.5 text-sm uppercase text-red-fg"
          onClick={removeItem}
        >
          Remove
        </motion.button>
        <div>{price}</div>
      </div>
    </>
  );
}
