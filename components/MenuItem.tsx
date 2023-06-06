"use client";

import { Pizza } from "@/lib/types";
import { motion } from "framer-motion";

const gpb = new Intl.NumberFormat("en-gb", {
  style: "currency",
  currency: "GBP",
});

const variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function MenuItem({
  pizza,
  i,
  onClick,
}: {
  pizza: Pizza;
  i: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="bg-white rounded-xl p-4 flex flex-col cursor-pointer text-left"
      variants={variants}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      animate={{ scale: 1 }}
      onClick={onClick}
    >
      <img
        src={`/${pizza.image}`}
        alt={pizza.name}
        width="320"
        height="221"
        className="rounded-lg mb-3 w-full"
      />

      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex gap-3 mb-3">
          <h3 className="font-semibold w-full">{pizza.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="font-normal text-xs uppercase">From</span>
            <span className="font-medium">{gpb.format(pizza.price)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {pizza.isVegetarian && (
            <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-green-bg text-green-fg">
              Vegetarian
            </span>
          )}
          {pizza.isHot && (
            <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-red-bg text-red-fg">
              Hot
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
