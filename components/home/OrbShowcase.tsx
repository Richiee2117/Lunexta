"use client";

import { motion } from "framer-motion";
import ServicePreview from "@/components/servicios/ServicePreview";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { EASE_ORGANIC } from "@/lib/motion-variants";

export default function OrbShowcase({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6 lg:items-end lg:pr-10 xl:pr-24">
      <div className="relative w-full max-w-[280px] pb-12 sm:max-w-[340px] md:max-w-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.35, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.4, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.8 }}
          className="relative z-10 w-full"
        >
          <ServicePreview deviceType="browser" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          exit={{ opacity: 0, scale: 0.3, rotate: -14 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 15,
            mass: 0.7,
            delay: 0.14,
          }}
          className="absolute -bottom-6 -left-6 z-20 w-[36%] origin-bottom-left shadow-2xl sm:-left-10"
        >
          <ServicePreview deviceType="phone" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: 14 }}
          animate={{ opacity: 1, scale: 1, rotate: 6 }}
          exit={{ opacity: 0, scale: 0.3, rotate: 14 }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 15,
            mass: 0.7,
            delay: 0.26,
          }}
          className="absolute -bottom-8 -right-4 z-20 w-[48%] origin-bottom-right shadow-2xl sm:-right-8"
        >
          <ServicePreview deviceType="pos" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: EASE_ORGANIC, delay: 0.4 }}
      >
        <button
          type="button"
          onClick={onClose}
          data-cursor="button"
          className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-dim transition-colors hover:text-foreground"
        >
          {t.orbShowcase.back}
        </button>
      </motion.div>
    </div>
  );
}
