"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";
import OrbShowcase from "@/components/home/OrbShowcase";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { EASE_ORGANIC } from "@/lib/motion-variants";

const LunextaOrb = dynamic(() => import("@/components/three/LunextaOrb"), {
  ssr: false,
  loading: () => null,
});

function StaticOrb({ onActivate }: { onActivate: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      data-cursor="button"
      onClick={onActivate}
      whileTap={{ scale: 0.94 }}
    >
      <div
        className="h-[340px] w-[340px] rounded-full opacity-70 blur-2xl md:h-[440px] md:w-[440px]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #7c3aed 0%, #22d3ee 45%, #0a0a0b 75%)",
        }}
      />
    </motion.div>
  );
}

export default function HomeHero() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  // Mounted for the lifetime of the page — no isNearHero gate — so scrolling
  // away and back never remounts the WebGL context. LunextaOrb pauses its
  // own render loop internally once it's effectively out of view instead.
  const show3D = !reducedMotion && !isMobile;

  const [showcase, setShowcase] = useState(false);
  // Drives the orb's shrink/grow around the click-to-showcase transition
  // through Three.js's own scale instead of a CSS transform — a CSS
  // `scale` on an ancestor of the <canvas> is what caused the orb to
  // render oversized/mispositioned when returning from the showcase.
  const activationScale = useMotionValue(1);

  function handleActivate() {
    animate(activationScale, 0.5, { duration: 0.42, ease: EASE_ORGANIC });
    // Let the click pulse visibly deform the orb before it dissolves into
    // the interface, instead of swapping the instant you click.
    setTimeout(() => setShowcase(true), 420);
  }

  function handleClose() {
    setShowcase(false);
    animate(activationScale, 1, { type: "spring", stiffness: 70, damping: 15, mass: 0.9 });
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Shrinks and fades all the way out like a planet drifting away, rather
  // than stopping partway and then hard-cutting to a fallback.
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.2, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ opacity: orbOpacity }}>
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: showcase ? 0 : 1 }}
          transition={{ duration: 0.45, ease: EASE_ORGANIC }}
          style={{ pointerEvents: showcase ? "none" : "auto" }}
        >
          {show3D ? (
            <LunextaOrb
              scrollIntensity={scrollYProgress}
              orbScale={orbScale}
              activationScale={activationScale}
              onActivate={handleActivate}
              paused={showcase}
            />
          ) : (
            <StaticOrb onActivate={handleActivate} />
          )}
        </motion.div>

        <AnimatePresence>
          {showcase && <OrbShowcase onClose={handleClose} />}
        </AnimatePresence>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ORGANIC, delay: 0.3 }}
          className="mb-6 bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-sm font-semibold uppercase tracking-[0.3em] text-transparent"
        >
          {t.brand.name}
        </motion.p>

        <TextReveal
          as="h1"
          text={t.brand.tagline}
          delay={0.45}
          className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_ORGANIC, delay: 0.9 }}
          className="mt-6 max-w-xl text-lg text-foreground-dim"
        >
          {t.home.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_ORGANIC, delay: 1.1 }}
          className="mt-10"
        >
          <MagneticButton href="/contacto">{t.nav.cta}</MagneticButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {!showcase && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, delay: 2, times: [0, 0.15, 0.6, 0.8, 1] }}
            className="pointer-events-none absolute bottom-24 right-6 z-10 hidden text-xs font-medium uppercase tracking-[0.2em] text-foreground-dim/70 lg:block lg:right-12"
          >
            {t.home.hint}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-foreground/25 pt-2">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-accent-b"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
