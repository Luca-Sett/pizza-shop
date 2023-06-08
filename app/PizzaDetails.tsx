"use client";

import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import useSWR from "swr";
import PizzaDetailsGroq from "@/lib/types";
import { gpb } from "@/lib/utils";

const pizzaFetcher = async (pizzaId: string) => {
  const [pizzaData, sizesData] = await Promise.all([
    client.fetch<PizzaDetailsGroq>(
      groq`*[_type == "pizza" && _id == $pizzaId]{_id, name, categories[]->{_id, name, colourBg, colourFg}, basePrice, ingredients[]->{_id, name, basePrice}}[0]`,
      { pizzaId }
    ),
    client.fetch<{ size: number; basePrice: number }[]>(
      groq`*[_type == "pizzaSize"] | order(size) {size, basePrice}`
    ),
  ]);

  const totalPriceOfToppings = pizzaData.ingredients.reduce(
    (total, ing) => total + ing.basePrice,
    0
  );

  return {
    ...pizzaData,
    prices: sizesData.map(
      (sizeData) =>
        sizeData.basePrice +
        totalPriceOfToppings * (sizeData.size ** 2 / sizesData[0].size ** 2)
    ),
    sizes: sizesData.map((s) => s.size),
    categories: pizzaData.categories ?? [],
  };
};

export default function PizzaDetails({
  show,
  pizzaId,
  onClose,
}: {
  show: boolean;
  pizzaId: string | null;
  onClose: () => void;
}) {
  const [size, setSize] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const {
    data: pizza,
    error,
    isLoading,
  } = useSWR(pizzaId, pizzaFetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (show) {
      setSize(0);
      setQuantity(1);
    }
  }, [show]);

  const shouldShow = show && !isLoading && !error;

  const price = pizza
    ? Math.round((pizza?.prices[size] * quantity) / 0.05) * 0.05
    : null;

  return (
    <Transition show={shouldShow} as={Fragment}>
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
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed inset-0 grid place-items-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl p-6 mx-4">
                <img
                  src={`/margherita.webp`}
                  alt={pizza?.name}
                  width="320"
                  height="221"
                  className="rounded-lg mb-3 w-full"
                />
                <div className="flex flex-col gap-4">
                  <div>
                    <Dialog.Title as={Fragment}>
                      <h3 className="text-2xl font-semibold w-full">
                        {pizza?.name}
                      </h3>
                    </Dialog.Title>
                    <Dialog.Description>Delicously simple!</Dialog.Description>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {pizza && pizza.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {pizza?.categories.map((category) => (
                          <span
                            key={category._id}
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
                      {pizza?.ingredients.map((ingredient) => (
                        <span
                          key={ingredient._id}
                          className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-black/10"
                        >
                          {ingredient.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="grid bg-black/10 rounded-lg p-1 font-semibold text-lg"
                    style={{
                      gridTemplateColumns: `repeat(${pizza?.sizes.length}, 1fr)`,
                    }}
                  >
                    {pizza?.sizes.map((s, index) => (
                      <button
                        key={s}
                        onClick={() => setSize(index)}
                        className="relative h-10"
                      >
                        <span className="relative z-10">{s}&rdquo;</span>
                        {index === size && (
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

                  <div className="text-2xl font-medium text-center">
                    {price && gpb.format(price)}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-4 font-semibold">
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
                      onClick={onClose}
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
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
