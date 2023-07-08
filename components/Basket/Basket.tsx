"use client";

import BasketItem from "./BasketItem";
import { getStripe, gpb } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { BasketContext } from "./BasketProvider";

export default function Basket({ sizes }: { sizes: number[] }) {
  const scrollable = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return alert("Basket is empty");

    setIsLoading(true);

    const res = await fetch("/api/checkout", {
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
      setIsLoading(false);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({ sessionId: data.id });
    console.warn(error.message);
    setIsLoading(false);
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
    <div className="h-full md:p-8 md:pl-0">
      <div className="grid h-full grid-rows-[auto_1fr_auto] overflow-hidden bg-white md:rounded-2xl">
        <div
          className="flex flex-col gap-1 p-8 transition-shadow"
          style={{
            boxShadow:
              scroll > 0.01 ? "0 0 20px #00000010" : "0 0 20px #00000000",
          }}
        >
          <div className="h-0.5 rounded bg-dark"></div>
          <h2 className="text-center font-semibold uppercase">Basket</h2>
          <div className="h-0.5 rounded bg-dark"></div>
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
                className="flex flex-col gap-4 rounded-lg bg-off-white p-4"
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
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 rounded-lg bg-red/10 text-lg font-semibold"
          >
            <div className="py-2 text-center text-red">{totalPrice}</div>
            <motion.button
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="grid place-items-center rounded-lg bg-red py-2 text-white"
            >
              {isLoading ? (
                <span className="material-symbols-rounded animate-spin">
                  progress_activity
                </span>
              ) : (
                "Order"
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
