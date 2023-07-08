"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderNowButton() {
  return (
    <Link href="/order" className="w-max">
      <motion.span
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        className="inline-block rounded-lg bg-red px-6 py-2 font-semibold uppercase text-white"
      >
        Order Now
      </motion.span>
    </Link>
  );
}
