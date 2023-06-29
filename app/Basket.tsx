"use client";

import BasketItem from "@/components/BasketItem";
import { getStripe, gpb } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { BasketContext } from "./Provider";

export default function Basket({ sizes }: { sizes: number[] }) {
  const scrollable = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/checkout", {
      method: "POST",
      body: JSON.stringify(
        items.map((item) => ({
          name: `${sizes[item.sizeIndex]}" ${item.pizza.name}`,
          quantity: item.quantity,
          price: Math.round(item.pizza.prices[item.sizeIndex] * 100),
        }))
      ),
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({ sessionId: data.id });
    console.warn(error.message);
  };

  const { items, updateItem, removeItem, justAdded } =
    useContext(BasketContext);

  const updateScroll = () => {
    if (scrollable.current === null) return;
    if (scrollable.current.scrollHeight === scrollable.current.clientHeight) {
      setScroll(-1);
    } else {
      setScroll(
        scrollable.current.scrollTop /
          (scrollable.current.scrollHeight - scrollable.current.clientHeight)
      );
    }
  };

  // Add scroll listener to update scroll state
  useEffect(() => {
    updateScroll();
    if (scrollable.current) {
      scrollable.current.addEventListener("scroll", updateScroll);
    }
  }, []);

  // Scroll basket to bottom when item is added
  useEffect(() => {
    if (justAdded) {
      scrollable.current?.scrollTo({
        top: scrollable.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [items, justAdded]);

  const totalPrice = gpb.format(
    items.reduce(
      (total, item) =>
        total + item.quantity * item.pizza.prices[item.sizeIndex],
      0
    )
  );

  return (
    <div className="md:p-8 md:pl-0 h-full">
      <div className="grid grid-rows-[auto_1fr_auto] h-full bg-white md:rounded-2xl overflow-hidden">
        <div
          className="flex flex-col gap-1 p-8 transition-shadow"
          style={{
            boxShadow:
              scroll > 0.01 ? "0 0 20px #00000010" : "0 0 20px #00000000",
          }}
        >
          <div className="bg-dark h-0.5 rounded"></div>
          <h2 className="uppercase font-semibold text-center">Basket</h2>
          <div className="bg-dark h-0.5 rounded"></div>
        </div>

        <motion.div
          className="flex flex-col gap-4 overflow-auto px-8"
          ref={scrollable}
          layoutScroll
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { type: "spring", bounce: 0.2, duration: 0.6 },
                }}
                key={item.id}
                className="bg-off-white rounded-lg p-4 flex flex-col gap-4"
              >
                <BasketItem
                  item={item}
                  sizes={sizes}
                  updateQuantity={(newQuantity: number) => {
                    updateItem(index, { ...item, quantity: newQuantity });
                  }}
                  updateSizeIndex={(newSizeIndex: number) => {
                    updateItem(index, { ...item, sizeIndex: newSizeIndex });
                  }}
                  removeItem={() => removeItem(index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div
          className="p-8 pt-6 transition-shadow"
          style={{
            boxShadow:
              scroll >= 0 && scroll < 0.99
                ? "0 0 20px #00000010"
                : "0 0 20px #00000000",
          }}
        >
          <div className="grid grid-cols-2 bg-red/10 font-semibold text-lg rounded-lg">
            <div className="text-red py-2 text-center">{totalPrice}</div>
            <motion.button
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={handleSubmit}
              className="text-white bg-red py-2 rounded-lg"
            >
              Order
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
