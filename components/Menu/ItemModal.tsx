"use client";

import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Fragment, useContext, useEffect, useState } from "react";
import { Pizza } from "@/lib/types";
import { gpb } from "@/lib/utils";
import { BasketContext } from "../Basket/BasketProvider";
import Image from "next/image";

export default function ItemModal({
  show,
  pizza,
  sizes,
  onClose,
}: {
  show: boolean;
  pizza: Pizza;
  sizes: number[];
  onClose: () => void;
}) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useContext(BasketContext);

  const price = gpb.format(quantity * pizza.prices[sizeIndex]);

  useEffect(() => {
    if (show) {
      setSizeIndex(0);
      setQuantity(1);
    }
  }, [show]);

  return (
    <Transition show={show} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="duration-300"
          enterFrom="opacity-0 scale-95 translate-y-4"
          leave="duration-300"
          leaveTo="opacity-0 scale-95 translate-y-4"
        >
          <Dialog.Panel className="fixed inset-0 grid place-items-center">
            <div className="w-full max-w-md">
              <div className="m-4 flex max-h-[calc(100dvh-2rem)] flex-col gap-4 overflow-auto rounded-2xl bg-white p-6">
                <Image
                  src="/margherita.webp"
                  alt={pizza.name}
                  width="320"
                  height="221"
                  className="w-full rounded-lg"
                />

                <div>
                  <Dialog.Title as={Fragment}>
                    <h3 className="w-full text-2xl font-semibold">
                      {pizza.name}
                    </h3>
                  </Dialog.Title>
                </div>

                <div className="flex flex-col gap-1.5">
                  {pizza.categories.length > 0 && (
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
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {pizza.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="rounded bg-black/10 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="grid rounded-lg bg-black/10 p-1 text-lg font-semibold"
                  style={{
                    gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
                  }}
                >
                  {sizes.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => setSizeIndex(index)}
                      className="relative h-10"
                    >
                      <span className="relative z-10">{s}&rdquo;</span>
                      {sizeIndex === index && (
                        <motion.div
                          layoutId="sizeIndicator"
                          className="absolute inset-0 z-0 rounded bg-white"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid h-16 grid-cols-3 text-lg font-semibold">
                  <motion.button
                    animate={{ scale: 1 }}
                    whileHover={{ scale: quantity === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: quantity === 1 ? 1 : 0.95 }}
                    className="select-none rounded-lg bg-black/10 px-2 py-[3px] transition-opacity disabled:opacity-40"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </motion.button>

                  <input
                    className="mx-auto w-1/2 text-center"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.valueAsNumber)}
                  />

                  <motion.button
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="select-none rounded-lg bg-black/10 px-2 py-[3px]"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>

                <div className="text-center text-2xl font-medium">{price}</div>

                <div className="flex flex-wrap gap-4 font-semibold">
                  <motion.button
                    onClick={onClose}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-max grow rounded-lg bg-red-bg px-4 py-2 text-sm uppercase text-red-fg"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      addItem({ id: Date.now(), pizza, quantity, sizeIndex });
                      onClose();
                    }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-max grow rounded-lg bg-red px-4 py-2 text-sm uppercase text-white"
                  >
                    Add to Basket
                  </motion.button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
