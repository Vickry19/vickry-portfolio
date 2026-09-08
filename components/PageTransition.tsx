"use client";

import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <motion.div
      initial={{
        scaleY: 0,
        transformOrigin: "bottom",
      }}
      animate={{
        scaleY: 0,
      }}
      exit={{
        scaleY: 1,
        transformOrigin: "bottom",
      }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 z-[999] bg-white"
    />
  );
}