"use client";

import { motion } from "framer-motion";
import { gpb } from "@/lib/utils";
import { Pizza } from "@/lib/types";
import Image from "next/image";

const variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function MenuItem({
  pizza,
  onClick,
  isPriorityImage,
}: {
  pizza: Pizza;
  onClick: () => void;
  isPriorityImage: boolean;
}) {
  return (
    <motion.button
      className="bg-white rounded-xl p-4 flex flex-col cursor-pointer text-left w-full max-w-sm mx-auto"
      variants={variants}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      animate={{ scale: 1 }}
      onClick={onClick}
    >
      <Image
        src="/margherita.webp"
        alt={pizza.name}
        width="320"
        height="221"
        priority={isPriorityImage}
        className="rounded-lg mb-3 w-full"
      />

      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex gap-3 mb-3">
          <h3 className="font-semibold w-full">{pizza.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="font-normal text-xs uppercase">From</span>
            <span className="font-medium">{gpb.format(pizza.prices[0])}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {pizza.categories.map((category) => (
            <span
              key={category.name}
              style={{
                backgroundColor: category.colourBg,
                color: category.colourFg,
              }}
              className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
