"use client";

import { useState } from "react";
import { ArrowRight, Terminal as TerminalIcon, GraduationCap, Server, Settings, Cpu, Bot, ChevronDown, Check, Copy } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";
import Terminal from "./Terminal";

interface HeroProps {
  t: TranslationSchema;
  lang: "es" | "en";
  openBooking: () => void;
  terminalState: "docked" | "floating" | "maximized" | "minimized" | "closed";
  setTerminalState: (state: "docked" | "floating" | "maximized" | "minimized" | "closed") => void;
}

export default function Hero({ t, lang, openBooking, terminalState, setTerminalState }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("sergioalarcon22986@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statItems = [
    { title: t.stat_docker_title, label: t.stat_docker_label, desc: t.stat_docker_desc },
    { title: t.stat_multi_title, label: t.stat_multi_label, desc: t.stat_multi_desc },
    { title: t.stat_sql_title, label: t.stat_sql_label, desc: t.stat_sql_desc },
    { title: t.stat_cicd_title, label: t.stat_cicd_label, desc: t.stat_cicd_desc },
  ];

  return (
    <section
      id="home"
      className="relative z-10 pt-28 pb-10 px-4 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-10">
        {/* Left Column: Biography */}
        <div className={`${terminalState === "docked" ? "md:col-span-7" : "md:col-span-12"} flex flex-col items-start text-left transition-all duration-300`}>
          {/* Intro Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t.hero_tag_hiring}</span>
            </div>
            <a
              href="https://github.com/ErPyrex"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "es" ? "Ver perfil de GitHub de ErPyrex" : "View ErPyrex GitHub profile"}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 hover:bg-purple-500/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500/50"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
              <span>{t.hero_tag_github}</span>
            </a>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-orange-400">
              <Server className="h-3 w-3" />
              <span>{t.hero_tag_linux}</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] max-w-4xl">
            {t.hero_heading_white1}
            <span className="bg-gradient-to-r from-[#ffffff] via-[#a5b4fc] to-[#818cf8] bg-clip-text text-transparent">
              {t.hero_heading_gradient}
            </span>
            {t.hero_heading_white2}
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-mono">
              {t.hero_heading_gradient_orange}
            </span>.
          </h1>

          {/* Intro Description */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl mb-4 leading-relaxed">
            {t.hero_paragraph}
          </p>

          {/* English disclaimer message */}
          <div className="mb-6 text-[11px] font-mono text-zinc-400/90 bg-zinc-900/30 border border-zinc-800/40 rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>{t.lang_disclaimer}</span>
          </div>

          {/* Engineering Profile Accent Banner */}
          <div className="w-full p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/20 mb-6 flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 sm:mt-0">
                <TerminalIcon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block font-bold flex items-center gap-1.5">
                  <span className="text-indigo-500/80">❯</span>
                  {t.hero_badge_title}
                </span>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {t.hero_badge_desc}
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
            <button
              onClick={openBooking}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <span>{t.hero_cta_send}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              onClick={copyEmail}
              className="w-full sm:w-auto border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 text-zinc-200 font-semibold text-xs px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-emerald-400">{t.hero_cta_copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                  <span>{t.hero_cta_copy}</span>
                </>
              )}
            </button>

            <a
              href="#projects"
              className="w-full sm:w-auto text-zinc-400 hover:text-white font-medium text-xs px-3 py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/50 rounded px-1.5 py-0.5"
            >
              <span>{t.hero_cta_projects}</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Quick proof badges */}
          <div className="w-full pt-6 border-t border-zinc-900/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-mono text-zinc-400/90">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>{t.hero_proof_eng}</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-orange-400" aria-hidden="true" />
              <span>{t.hero_proof_linux}</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <span>{t.hero_proof_docker}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" aria-hidden="true" />
              <span>{t.hero_proof_cicd}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>{t.hero_proof_ai}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Integrated Terminal (col-span-5) */}
        {terminalState === "docked" && (
          <div className="md:col-span-5 w-full mt-6 md:mt-0">
            <Terminal
              t={t}
              lang={lang}
              terminalState={terminalState}
              setTerminalState={setTerminalState}
            />
          </div>
        )}
      </div>

      {/* Stats Cards Section */}
      <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-sm hover:border-zinc-800 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
              {item.title}
            </div>
            <div className="text-xs font-semibold text-zinc-200">
              {item.label}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
