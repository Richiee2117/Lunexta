"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const lenisRef = useLenis();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Reset scroll once the old page has mostly faded out, so the jump
    // happens while it's nearly invisible instead of colliding with a
    // visible crossfade.
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 260);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // The new route almost always has a different document height than the
    // one Lenis last measured. Without an explicit resize, Lenis keeps
    // using the stale scroll limit, so wheel/trackpad scrolling can stop
    // short of the real bottom of the page even though the DOM is taller.
    const raf = requestAnimationFrame(() => lenisRef?.current?.resize());
    const settleTimer = setTimeout(() => lenisRef?.current?.resize(), 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
    };
  }, [pathname, lenisRef]);

  return (
    <div className="grid">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.985, y: 10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
          }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: { duration: 0.4, ease: [0.6, 0, 0.8, 0.2] },
          }}
          className="[grid-area:1/1]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
