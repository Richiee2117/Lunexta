"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import TextReveal from "@/components/ui/TextReveal";
import CountUp from "@/components/ui/CountUp";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export default function ExperienciaContent() {
  const { t } = useLanguage();
  const EXPERIENCE = t.experiencia;
  return (
    <>
      <section className="relative bg-ink px-6 pb-20 pt-40 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
          >
            {EXPERIENCE.eyebrow}
          </motion.p>

          <TextReveal
            as="h1"
            text={EXPERIENCE.heading}
            delay={0.15}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-dim"
          >
            {EXPERIENCE.intro}
          </motion.p>
        </div>
      </section>

      <section className="relative bg-ink-raised px-6 py-20 lg:px-12">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4"
        >
          {EXPERIENCE.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <p className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm text-foreground-dim">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
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
            {EXPERIENCE.capabilitiesLabel}
          </motion.p>

          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-10 sm:grid-cols-2"
          >
            {EXPERIENCE.capabilities.map((cap, i) => (
              <motion.div key={cap.title} variants={fadeInUp} className="flex gap-6">
                <span className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-sm font-semibold text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{cap.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground-dim">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-ink to-ink-raised px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            {EXPERIENCE.commitment}
          </p>
        </motion.div>
      </section>
    </>
  );
}
