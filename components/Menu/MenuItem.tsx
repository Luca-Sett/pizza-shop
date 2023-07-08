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
        className="mx-auto flex h-full w-full max-w-sm cursor-pointer flex-col rounded-xl bg-white p-4 text-left"
        type="button"
        onClick={onClick}
      >
        <motion.div layout className="w-full">
          <Image
            src="/margherita.webp"
            alt={pizza.name}
            width="320"
            height="221"
            priority={isPriorityImage}
            className="mb-3 w-full rounded-lg"
          />
        </motion.div>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-3 flex gap-3">
            <motion.h3 layoutId="pizzaName" className="w-full font-semibold">
              {pizza.name}
            </motion.h3>
            <motion.div
              layoutId="pizzaPrice"
              className="flex items-baseline gap-1"
            >
              <span className="text-xs font-normal uppercase">From</span>
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
                className="rounded px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase"
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
