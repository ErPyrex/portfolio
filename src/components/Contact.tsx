"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle2, Send } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";

interface ContactProps {
  t: TranslationSchema;
  lang: "es" | "en";
}

export default function Contact({ t, lang }: ContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate direct form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", message: "" });

    // Hide success alert after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("sergioalarcon22986@gmail.com");
    alert(lang === "es" ? "¡Correo electrónico copiado!" : "Email address copied!");
  };

  return (
    <section id="contact" className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
      <div className="rounded-3xl p-8 sm:p-12 border border-indigo-500/20 bg-zinc-950/40 backdrop-blur-xl text-center relative overflow-hidden">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-wider border border-indigo-500/20">
          {t.contact_tag}
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
          {t.contact_title}
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {t.contact_desc}
        </p>

        {/* Info grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-8 text-left">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={lang === "es" ? "Copiar dirección de correo electrónico" : "Copy email address"}
            className="w-full text-left rounded-xl border border-zinc-900 bg-zinc-900/40 p-4 hover:bg-zinc-900/70 transition-colors flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-w-0"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <Mail className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono tracking-wider">
                Email
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 block truncate" title="sergioalarcon22986@gmail.com">
                sergioalarcon22986@gmail.com
              </span>
            </div>
          </button>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-4 flex items-center gap-3.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono tracking-wider">
                {t.contact_location_label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 block truncate" title={t.contact_location}>
                {t.contact_location}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce" />
              <h4 className="mt-4 text-base font-bold text-zinc-100">
                {t.contact_success_title}
              </h4>
              <p className="mt-1 text-xs text-zinc-400">
                {t.contact_success_desc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <input
                  type="text"
                  required
                  name="name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder={t.contact_label_name}
                  aria-label={t.contact_label_name}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder={t.contact_label_email}
                  aria-label={t.contact_label_email}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  required
                  name="message"
                  autoComplete="off"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={t.contact_label_msg}
                  aria-label={t.contact_label_msg}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30"
              >
                <span>{isSubmitting ? t.contact_btn_sending : t.contact_btn_send}</span>
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
