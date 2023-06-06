"use client";

import { Pizza } from "@/lib/types";
import { Dialog, Transition } from "@headlessui/react";
import { motion, MotionContext } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

export default function PizzaDetails({
  show,
  pizza,
  onClose,
}: {
  show: boolean;
  pizza: Pizza | null;
  onClose: () => void;
}) {
  const [size, setSize] = useState(10);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (show) {
      setSize(10);
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
                  src={`/${pizza?.image}`}
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
                  <div className="flex flex-col gap-1.5 mb-1">
                    <div className="flex flex-wrap gap-1.5">
                      {pizza?.isVegetarian && (
                        <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-green-bg text-green-fg">
                          Vegetarian
                        </span>
                      )}
                      {pizza?.isHot && (
                        <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-red-bg text-red-fg">
                          Hot
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-black/10">
                        Pizza Base
                      </span>
                      <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-black/10">
                        Tomato Sauce
                      </span>
                      <span className="font-semibold text-[0.6875rem] uppercase rounded px-1.5 py-0.5 bg-black/10">
                        Mozzarella
                      </span>
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-3 h-16 bg-black/10 rounded-lg p-1 font-semibold text-lg">
                    <button className="relative" onClick={() => setSize(10)}>
                      {size === 10 && (
                        <motion.div
                          layoutId="size"
                          className="absolute inset-0 bg-white rounded z-0"
                        />
                      )}
                      <span className="relative z-10">10&rdquo;</span>
                    </button>
                    <button className="relative" onClick={() => setSize(12)}>
                      {size === 12 && (
                        <motion.div
                          layoutId="size"
                          className="absolute inset-0 bg-white rounded z-0"
                        />
                      )}
                      <span className="relative z-10">12&rdquo;</span>
                    </button>
                    <button className="relative" onClick={() => setSize(14)}>
                      {size === 14 && (
                        <motion.div
                          layoutId="size"
                          className="absolute inset-0 bg-white rounded z-0"
                        />
                      )}
                      <span className="relative z-10">14&rdquo;</span>
                    </button>
                  </div> */}

                  <div className="grid grid-rows-1 grid-cols-3 h-16 bg-black/10 rounded-lg p-1 font-semibold text-lg">
                    <motion.div
                      layout
                      style={{
                        gridColumnStart: size === 10 ? 1 : size === 12 ? 2 : 3,
                      }}
                      className="row-start-1 bg-white rounded relative z-0"
                    />
                    <button
                      onClick={() => setSize(10)}
                      className="row-start-1 col-start-1 relative z-10"
                    >
                      10&rdquo;
                    </button>
                    <button
                      onClick={() => setSize(12)}
                      className="row-start-1 col-start-2 relative z-10"
                    >
                      12&rdquo;
                    </button>
                    <button
                      onClick={() => setSize(14)}
                      className="row-start-1 col-start-3 relative z-10"
                    >
                      14&rdquo;
                    </button>
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
                      className="text-center"
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
                  <div className="text-2xl font-medium text-center">£5.50</div>
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
