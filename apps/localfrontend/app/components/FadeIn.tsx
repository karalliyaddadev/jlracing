"use client";

import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: "up" | "left" | "right";
  amount?: number;
}

export default function FadeIn({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
  amount = 0.15,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{
        opacity: 0,
        y: direction === "up" ? 36 : 0,
        x: direction === "left" ? -36 : direction === "right" ? 36 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
