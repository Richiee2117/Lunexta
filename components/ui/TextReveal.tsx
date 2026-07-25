"use client";

import { motion } from "framer-motion";
import { EASE_ORGANIC } from "@/lib/motion-variants";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as = "h2",
}: TextRevealProps) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, ease: EASE_ORGANIC, delay: delay + i * 0.05 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
