"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { dictionaries, type Dictionary, type Lang } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "lunexta-lang";
const listeners = new Set<() => void>();
let currentLang: Lang = "es";

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Lang {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "es";
}

function applyLang(lang: Lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  listeners.forEach((listener) => listener());
}

function setLang(lang: Lang) {
  window.localStorage.setItem(STORAGE_KEY, lang);
  applyLang(lang);
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if ((stored === "es" || stored === "en") && stored !== currentLang) {
      applyLang(stored);
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
