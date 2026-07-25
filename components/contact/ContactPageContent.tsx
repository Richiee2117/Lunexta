"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import TextReveal from "@/components/ui/TextReveal";
import ContactForm from "@/components/contact/ContactForm";
import { viewportOnce } from "@/lib/motion-variants";

export default function ContactPageContent() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ink to-ink-raised px-6 pb-24 pt-40 lg:px-12 lg:pt-48">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
        >
          {t.contacto.eyebrow}
        </motion.p>

        <TextReveal
          as="h1"
          text={t.contacto.heading}
          delay={0.15}
          className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-6 max-w-lg text-foreground-dim"
        >
          {t.contacto.subtext}
        </motion.p>
      </div>

      <div className="mt-14">
        <ContactForm />
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center" aria-hidden>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mx-auto h-px w-16 origin-center bg-gradient-to-r from-accent-a to-accent-b"
        />
      </div>
    </section>
  );
}
