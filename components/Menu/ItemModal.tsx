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
              <div className="flex flex-col gap-4 bg-white rounded-2xl p-6 m-4 max-h-[calc(100dvh-2rem)] overflow-auto">
                <Image
                  src="/margherita.webp"
                  alt={pizza.name}
                  width="320"
                  height="221"
                  className="rounded-lg w-full"
                />

                <div>
                  <Dialog.Title as={Fragment}>
                    <h3 className="text-2xl font-semibold w-full">
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
                          className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5"
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
                        className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-black/10"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="grid bg-black/10 rounded-lg p-1 font-semibold text-lg"
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
                          className="absolute inset-0 bg-white rounded z-0"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 h-16 font-semibold text-lg">
                  <motion.button
                    animate={{ scale: 1 }}
                    whileHover={{ scale: quantity === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: quantity === 1 ? 1 : 0.95 }}
                    className="transition-opacity px-2 py-[3px] bg-black/10 rounded-lg disabled:opacity-40 select-none"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </motion.button>

                  <input
                    className="text-center w-1/2 mx-auto"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.valueAsNumber)}
                  />

                  <motion.button
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2 py-[3px] bg-black/10 rounded-lg select-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>

                <div className="text-2xl font-medium text-center">{price}</div>

                <div className="flex flex-wrap gap-4 font-semibold">
                  <motion.button
                    onClick={onClose}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-max grow bg-red-bg text-red-fg py-2 rounded-lg uppercase px-4 text-sm"
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
                    className="w-max grow text-white bg-red py-2 rounded-lg uppercase px-4 text-sm"
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
