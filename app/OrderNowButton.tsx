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
        className="inline-block text-white bg-red py-2 px-6 rounded-lg font-semibold uppercase"
      >
        Order Now
      </motion.span>
    </Link>
  );
}
