"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

type CursorKind = "default" | "button" | "link" | "text";

export default function CustomCursor() {
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reducedMotion;

  const [kind, setKind] = useState<CursorKind>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("cursor-driven");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function handleOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const value = target?.getAttribute("data-cursor") as CursorKind | null;
      setKind(value ?? "default");
    }

    function handleOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest?.("[data-cursor]")) setKind("default");
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.body.classList.remove("cursor-driven");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isInteractive = kind === "button" || kind === "link";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-foreground/50"
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: isInteractive ? 44 : kind === "text" ? 3 : 16,
        height: isInteractive ? 44 : kind === "text" ? 22 : 16,
        borderRadius: kind === "text" ? "2px" : "999px",
        backgroundColor: isInteractive ? "rgba(245,245,247,0.1)" : "rgba(245,245,247,0.9)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    />
  );
}
