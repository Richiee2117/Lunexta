"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CONTACT } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion-variants";

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto max-w-xl"
    >
      {submitted ? (
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-accent-a/30 bg-ink-raised px-8 py-10 text-center"
        >
          <p className="text-xl font-semibold text-foreground">{t.contactForm.thanksName(name)}</p>
          <p className="mt-3 text-sm text-foreground-dim">
            {t.contactForm.receivedMessage(email)}
          </p>
        </motion.div>
      ) : (
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-ink-raised p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.contactForm.namePlaceholder}
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground-dim/60 focus:border-accent-b focus:outline-none"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.contactForm.emailPlaceholder}
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground-dim/60 focus:border-accent-b focus:outline-none"
            />
          </div>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.contactForm.messagePlaceholder}
            rows={4}
            className="resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground-dim/60 focus:border-accent-b focus:outline-none"
          />
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-foreground-dim/70">{CONTACT.email}</p>
            <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
              {t.contactForm.submit}
            </MagneticButton>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}
