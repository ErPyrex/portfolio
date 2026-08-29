"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";

interface NavbarProps {
  t: TranslationSchema;
  lang: "es" | "en";
  setLang: (lang: "es" | "en") => void;
  openBooking: () => void;
}

export default function Navbar({ t, lang, setLang, openBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t.nav_projects, href: "#projects" },
    { name: t.nav_stack, href: "#stack" },
    { name: t.nav_contacto, href: "#contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-5xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-xl rounded-2xl shadow-2xl transition-colors hover:border-zinc-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-orange-500 to-cyan-500 flex items-center justify-center font-mono text-xs font-bold text-white shadow-md">
                P64
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-zinc-950"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-white text-xs sm:text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                Sergio Rodriguez (Pyrex64)
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono leading-none mt-0.5">
                {lang === "es"
                  ? "Ingeniero en Informática"
                  : "Computer Engineer"}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-6 text-xs font-mono text-zinc-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:text-indigo-300 focus-visible:ring-1 focus-visible:ring-indigo-500/50 rounded-sm px-1.5 py-0.5"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              aria-label={
                lang === "es"
                  ? "Cambiar idioma a Inglés"
                  : "Switch language to Spanish"
              }
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-mono font-medium text-zinc-200 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            >
              <Globe className="h-3 w-3 text-zinc-400" aria-hidden="true" />
              <span>{lang === "es" ? "EN" : "ES"}</span>
            </button>

            {/* Contact CTA */}
            <button
              onClick={openBooking}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-1.5 rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <span>{t.nav_cta}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Lang button on mobile too */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              aria-label={lang === "es" ? "Cambiar idioma" : "Switch language"}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            >
              <Globe className="h-3 w-3 text-zinc-400" aria-hidden="true" />
              <span>{lang === "es" ? "EN" : "ES"}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={
                isOpen
                  ? lang === "es"
                    ? "Cerrar menú"
                    : "Close menu"
                  : lang === "es"
                    ? "Abrir menú"
                    : "Open menu"
              }
              className="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-zinc-950 border-t border-zinc-900/50 rounded-b-2xl"
        >
          <div className="space-y-1 px-3 pb-4 pt-2 font-mono text-xs text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openBooking();
              }}
              className="w-full text-left rounded-md px-3 py-2 text-indigo-400 hover:bg-indigo-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {t.nav_cta}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
