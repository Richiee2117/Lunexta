"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { ServiceSlug } from "@/lib/constants";
import ServicePreview from "@/components/servicios/ServicePreview";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export default function ServiceDetailContent({
  slug,
  otherSlugs,
}: {
  slug: ServiceSlug;
  otherSlugs: ServiceSlug[];
}) {
  const { t } = useLanguage();
  const service = t.services.find((s) => s.slug === slug)!;
  const otherServices = otherSlugs.map((s) => t.services.find((svc) => svc.slug === s)!);

  return (
    <>
      <section className="relative bg-ink px-6 pb-20 pt-40 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
          >
            {t.servicios.servicesPrefix} / {service.index}
          </motion.p>

          <TextReveal
            as="h1"
            text={service.heroTagline}
            delay={0.15}
            className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-dim"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      <section className="relative bg-ink-raised px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <motion.ul
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {service.features.map((feature) => (
              <motion.li key={feature} variants={fadeInUp} className="flex gap-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-a to-accent-b" />
                <span className="text-lg text-foreground">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <ServicePreview deviceType={service.deviceType} />
          </motion.div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-ink-raised to-ink px-6 py-24 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <p className="text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            {t.servicios.needsService(service.title)}
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/contacto">{t.servicios.ctaQuote}</MagneticButton>
          </div>
        </motion.div>
      </section>

      <section className="relative bg-ink px-6 py-14 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground-dim/70">
            {t.servicios.otherServices}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                scroll={false}
                data-cursor="link"
                className="text-sm text-foreground-dim transition-colors hover:text-foreground"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
