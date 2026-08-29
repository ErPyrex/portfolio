"use client";

import { useState, useEffect } from "react";
import Terminal from "@/components/Terminal";
import {
  esTranslations,
  enTranslations,
  TranslationSchema,
} from "@/lib/translations";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");

  // Automatic browser language detection
  useEffect(() => {
    const nav = navigator as unknown as { userLanguage?: string };
    const userLang = navigator.language || nav.userLanguage || "";
    if (userLang.startsWith("en")) {
      setTimeout(() => setLang("en"), 0);
    } else {
      setTimeout(() => setLang("es"), 0);
    }
  }, []);

  const t: TranslationSchema = lang === "es" ? esTranslations : enTranslations;

  return (
    <div className="relative min-h-screen bg-[#020502] text-[#33ff66] font-mono selection:bg-[#33ff66]/30 selection:text-[#e6ffe6] overflow-hidden green-glow-text">
      <Terminal t={t} lang={lang} setLang={setLang} />
    </div>
  );
}
