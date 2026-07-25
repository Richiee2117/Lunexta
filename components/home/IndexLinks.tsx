"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { viewportOnce } from "@/lib/motion-variants";

export default function IndexLinks() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-ink px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-12 text-sm font-semibold uppercase tracking-[0.3em] text-accent-b"
        >
          {t.home.exploreEyebrow}
        </motion.p>

        <div className="flex flex-col border-t border-border">
          {t.pagesPreview.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link
                href={item.href}
                scroll={false}
                data-cursor="button"
                className="group relative flex items-center justify-between gap-6 border-b border-border py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-sm font-semibold text-transparent">
                    {item.index}
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-b sm:text-3xl">
                      {item.title}
                    </p>
                    <p className="mt-2 max-w-md text-sm text-foreground-dim">{item.teaser}</p>
                  </div>
                </div>

                <motion.span
                  aria-hidden
                  className="shrink-0 text-2xl text-foreground-dim transition-colors duration-300 group-hover:text-accent-b"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>

                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent-a to-accent-b transition-[width] duration-500 ease-out group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
