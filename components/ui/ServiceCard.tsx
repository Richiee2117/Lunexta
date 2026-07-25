"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks";
import { fadeInUp } from "@/lib/motion-variants";

type ServiceCardProps = {
  index: string;
  title: string;
  description: string;
  href?: string;
  learnMoreLabel?: string;
};

export default function ServiceCard({
  index,
  title,
  description,
  href,
  learnMoreLabel,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), springConfig);
  const glowX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(y, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const card = (
    <motion.div
      variants={fadeInUp}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformPerspective: 900,
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-ink-raised p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(380px circle at ${gx} ${gy}, rgba(124,58,237,0.22), rgba(34,211,238,0.1) 45%, transparent 70%)`
          ),
        }}
      />

      <span className="relative bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-sm font-semibold text-transparent">
        {index}
      </span>

      <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="relative mt-4 text-base leading-relaxed text-foreground-dim">
        {description}
      </p>

      <div className="relative mt-8 h-px w-full bg-border">
        <motion.div
          className="h-px bg-gradient-to-r from-accent-a to-accent-b"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {href && learnMoreLabel && (
        <span className="relative mt-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent-b">
          {learnMoreLabel}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} scroll={false} data-cursor="button" className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}
