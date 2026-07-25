"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export default function NosotrosContent() {
  const { t } = useLanguage();
  const n = t.nosotros;
  return (
    <>
      <section className="relative overflow-hidden bg-ink px-6 pb-24 pt-40 lg:px-12 lg:pt-48">
        <div className="pointer-events-none absolute -left-24 top-0 select-none text-[16rem] font-bold leading-none text-foreground/[0.03]">
          L
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
          >
            {n.eyebrow}
          </motion.p>

          <TextReveal
            as="h1"
            text={n.heading}
            delay={0.15}
            className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          />

          <motion.div
            variants={staggerContainer(0.15, 0.6)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col gap-6"
          >
            {n.originParagraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className={`text-lg leading-relaxed ${i === 0 ? "text-foreground/90" : "text-foreground-dim"}`}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-ink-raised px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b">
              {n.missionLabel}
            </p>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-foreground">
              {n.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b">
              {n.visionLabel}
            </p>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-foreground">
              {n.vision}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-ink px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
          >
            {n.valuesLabel}
          </motion.p>

          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2"
          >
            {n.values.map((value, i) => (
              <motion.div key={value.title} variants={fadeInUp} className="bg-ink p-10">
                <span className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-sm font-semibold text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground-dim">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-ink-raised px-6 py-24 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <p className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            {n.closingLine}
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/servicios">{n.ctaServices}</MagneticButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}
