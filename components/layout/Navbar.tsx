"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { EASE_ORGANIC } from "@/lib/motion-variants";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSolid(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_ORGANIC, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        solid || menuOpen ? "border-b border-border bg-ink/95" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link
          href="/"
          scroll={false}
          data-cursor="link"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Lunexta<span className="bg-gradient-to-r from-accent-a to-accent-b bg-clip-text text-transparent">.</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {t.nav.links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  scroll={false}
                  data-cursor="link"
                  className={`text-sm font-medium tracking-wide transition-colors duration-500 hover:text-foreground ${
                    active ? "text-foreground" : "text-foreground-dim"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute left-1/2 top-full mt-2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-a to-accent-b"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Link
            href="/contacto"
            scroll={false}
            data-cursor="button"
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-all duration-500 hover:border-accent-b/60"
          >
            {t.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          data-cursor="button"
          className="relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="h-0.5 w-6 rounded-full bg-foreground"
            transition={{ duration: 0.3, ease: EASE_ORGANIC }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="h-0.5 w-6 rounded-full bg-foreground"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="h-0.5 w-6 rounded-full bg-foreground"
            transition={{ duration: 0.3, ease: EASE_ORGANIC }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_ORGANIC }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {t.nav.links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      scroll={false}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-3 text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                        active ? "text-foreground" : "text-foreground-dim"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacto"
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
                >
                  {t.nav.cta}
                </Link>
                <LanguageToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
