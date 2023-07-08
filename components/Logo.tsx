"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Logo() {
  return (
    <motion.div layoutId="logo">
      <Image
        src="title.svg"
        alt="Luca's Pizzeria Logo"
        width="406"
        height="114"
        priority
        className="w-full max-w-sm"
      />
    </motion.div>
  );
}
