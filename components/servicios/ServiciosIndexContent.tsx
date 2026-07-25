"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ServiceCard from "@/components/ui/ServiceCard";
import TextReveal from "@/components/ui/TextReveal";
import { staggerContainer, viewportOnce } from "@/lib/motion-variants";

export default function ServiciosIndexContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative bg-ink px-6 pb-20 pt-40 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
          >
            {t.servicios.eyebrow}
          </motion.p>

          <TextReveal
            as="h1"
            text={t.servicios.heading}
            delay={0.15}
            className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          />
        </div>
      </section>

      <section className="relative bg-ink px-6 py-20 lg:px-12">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2"
        >
          {t.services.map((service) => (
            <ServiceCard
              key={service.slug}
              index={service.index}
              title={service.title}
              description={service.shortDescription}
              href={`/servicios/${service.slug}`}
              learnMoreLabel={t.servicios.learnMore}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
}
