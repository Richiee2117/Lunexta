"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Lang } from "@/lib/i18n/dictionary";

const OPTIONS: Lang[] = ["es", "en"];

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border p-0.5 text-xs font-semibold uppercase tracking-wide ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          data-cursor="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${
            lang === option
              ? "bg-gradient-to-r from-accent-a to-accent-b text-ink"
              : "text-foreground-dim hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
