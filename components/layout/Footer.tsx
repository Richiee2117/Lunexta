"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-ink-raised px-6 py-14 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 border-t border-border pt-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-lg font-bold tracking-tight text-foreground">
            Lunexta<span className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-transparent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-foreground-dim/70">{t.brand.taglineAlt}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-dim">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground-dim/60">
            {t.footer.navigation}
          </p>
          {t.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              scroll={false}
              data-cursor="link"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground-dim">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground-dim/60">
            {t.footer.contact}
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            data-cursor="link"
            className="transition-colors hover:text-foreground"
          >
            {CONTACT.email}
          </a>
          <p>{t.footer.location}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl text-xs text-foreground-dim/50">
        © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
