"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Basket from "./Basket";

export default function BasketWrapper({ sizes }: { sizes: number[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.aside
        className="fixed top-0 bottom-0 right-0 w-[360px] z-20"
        animate={{
          x: open ? "0%" : "100%",
        }}
      >
        <Basket sizes={sizes} />
      </motion.aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-10"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-0 w-full bg-white uppercase font-semibold py-4 shadow-[0_0_1rem_#00000030]"
      >
        View Basket
      </button>
    </>
  );
}
