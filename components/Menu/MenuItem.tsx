"use client";

import { LayoutGroup, motion } from "framer-motion";
import { gpb } from "@/lib/utils";
import { Pizza } from "@/lib/types";
import Image from "next/image";

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
    <LayoutGroup id={pizza.name}>
      <button
        className="bg-white rounded-xl p-4 flex flex-col cursor-pointer text-left w-full max-w-sm mx-auto h-full"
        type="button"
        onClick={onClick}
      >
        <motion.div layout>
          <Image
            src="/margherita.webp"
            alt={pizza.name}
            width="320"
            height="221"
            priority={isPriorityImage}
            className="rounded-lg mb-3 w-full"
          />
        </motion.div>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex gap-3 mb-3">
            <motion.h3 layoutId="pizzaName" className="font-semibold w-full">
              {pizza.name}
            </motion.h3>
            <motion.div
              layoutId="pizzaPrice"
              className="flex items-baseline gap-1"
            >
              <span className="font-normal text-xs uppercase">From</span>
              <span className="font-medium">{gpb.format(pizza.prices[0])}</span>
            </motion.div>
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
      </button>
    </LayoutGroup>
  );
}
