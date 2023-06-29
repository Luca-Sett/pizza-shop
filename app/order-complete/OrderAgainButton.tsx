"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderAgainButton() {
  useEffect(() => sessionStorage.clear(), []);

  return (
    <Link href="/">
      <motion.span
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        className="inline-block text-white bg-red py-2 px-4 rounded-lg"
      >
        Order Again
      </motion.span>
    </Link>
  );
}
