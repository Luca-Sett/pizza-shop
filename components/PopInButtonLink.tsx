"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ButtonLink({
  children,
  to,
  delay = 0,
  duration = 0.8,
  primary = false,
}: {
  children: React.ReactNode;
  to: string;
  delay?: number;
  duration?: number;
  primary?: boolean;
}) {
  return (
    <Link href={to} className="rounded-xl group outline-none">
      <motion.div
        className={
          `ring-2 ring-transparent flex items-center justify-center gap-1 px-6 py-2 rounded-[inherit] uppercase tracking-wider font-semibold lg:text-lg ` +
          (primary
            ? `group-focus-visible:ring-white opacity-90 hover:opacity-100 group-focus-visible:opacity-100 transition-[box-shadow,opacity] bg-gradient-to-r from-red-600  via-red-600 to-orange-600 shadow-button-sm hover:shadow-button-lg shadow-red-600/50 hover:shadow-red-600/50`
            : `group-focus-visible:ring-red-600 transition-[box-shadow,background-color] text-red-600 bg-white hover:bg-red-50`)
        }
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration, delay, type: "spring" }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
