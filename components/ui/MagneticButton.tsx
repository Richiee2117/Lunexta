"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "ghost";
  strength?: number;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300";

const variants: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  primary: "bg-gradient-to-r from-accent-a to-accent-b text-ink",
  ghost: "border border-border text-foreground hover:border-accent-b/60",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  strength = 16,
}: MagneticButtonProps) {
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: springX, y: springY }}
      whileHover={
        variant === "primary"
          ? { boxShadow: "0 0 42px -8px #7c3aed, 0 0 20px -6px #22d3ee" }
          : undefined
      }
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        scroll={false}
        data-cursor="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      data-cursor="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </button>
  );
}
