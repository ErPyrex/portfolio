"use client";

import { TranslationSchema } from "@/lib/translations";

interface FooterProps {
  t: TranslationSchema;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-zinc-900 py-8 text-center text-xs text-zinc-500 font-mono">
      <p>{t.footer_copy}</p>
    </footer>
  );
}
