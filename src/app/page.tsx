"use client";

import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Terminal as TerminalIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Terminal from "@/components/Terminal";
import { esTranslations, enTranslations, TranslationSchema } from "@/lib/translations";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState({
    isOpen: false,
    title: "",
    desc: "",
  });
  const [terminalState, setTerminalState] = useState<"docked" | "floating" | "maximized" | "minimized" | "closed">("closed");
  const [lastActiveState, setLastActiveState] = useState<"docked" | "floating">("floating");

  useEffect(() => {
    if (terminalState === "docked" || terminalState === "floating") {
      setLastActiveState(terminalState);
    }
  }, [terminalState]);

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

  const openCaseStudy = (title: string, desc: string) => {
    setCaseStudy({
      isOpen: true,
      title,
      desc,
    });
  };

  const closeCaseStudy = () => {
    setCaseStudy({
      isOpen: false,
      title: "",
      desc: "",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#06080c] text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Ambient Morphing Background Light */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg viewBox="0 0 1000 1000" className="w-full h-full filter blur-[90px] animate-morph">
          <path
            fill="url(#grad-ambient)"
            d="M784,611Q704,722,579,788Q454,854,321,799Q188,744,118,622Q48,500,123,382Q198,264,329,195Q460,126,593,184Q726,242,795,371Q864,500,784,611Z"
          />
          <defs>
            <linearGradient id="grad-ambient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Grid Pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Sticky Navigation header */}
      <header className="relative z-30">
        <Navbar
          t={t}
          lang={lang}
          setLang={setLang}
          openBooking={() => setIsBookingOpen(true)}
        />
      </header>

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero
          t={t}
          lang={lang}
          openBooking={() => setIsBookingOpen(true)}
          terminalState={terminalState}
          setTerminalState={setTerminalState}
        />
        <Projects
          t={t}
          lang={lang}
          openCaseStudy={openCaseStudy}
        />
        <Skills t={t} />
        <Contact t={t} lang={lang} />
      </main>

      <Footer t={t} />

      {/* Floating / Maximized Terminal Window */}
      {terminalState === "maximized" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 pointer-events-auto transition-opacity duration-300 ease-in-out" />
      )}

      {(terminalState === "floating" || terminalState === "maximized") && (
        <div className={`fixed flex flex-col shadow-2xl rounded-2xl border transition-all duration-300 ease-in-out animate-terminal-open ${
          terminalState === "maximized"
            ? "z-50 border-indigo-500/30 bg-zinc-950/98 backdrop-blur-2xl bottom-4 md:bottom-10 right-4 md:right-10 w-[calc(100vw-32px)] md:w-[calc(100vw-80px)] h-[calc(100vh-32px)] md:h-[calc(100vh-80px)]"
            : "z-40 border-zinc-800 bg-zinc-950/95 backdrop-blur-xl bottom-6 right-6 w-[90%] max-w-[480px] h-[380px]"
        }`}>
          <Terminal
            t={t}
            lang={lang}
            terminalState={terminalState}
            setTerminalState={setTerminalState}
          />
        </div>
      )}

      {/* Minimized Terminal Tab */}
      {terminalState === "minimized" && (
        <button
          onClick={() => setTerminalState(lastActiveState)}
          className="fixed bottom-0 right-6 z-40 w-64 bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 border-b-0 rounded-t-xl px-4 py-2.5 flex items-center justify-between text-xs text-zinc-300 font-mono shadow-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 animate-tab-slide-up"
          aria-label={lang === "es" ? "Restaurar terminal" : "Restore terminal"}
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
            <span>Terminal</span>
          </span>
          <span className="text-[10px] text-zinc-500">
            {lang === "es" ? "[ restaurar ]" : "[ restore ]"}
          </span>
        </button>
      )}

      {/* Closed State FAB */}
      {terminalState === "closed" && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center select-none animate-fab-pop-in">
          {/* Subtle Bouncing Tooltip Hint */}
          <div className="mr-3 bg-zinc-950/95 backdrop-blur-md border border-indigo-500/35 px-3 py-1.5 rounded-xl text-[10px] font-mono text-indigo-300 shadow-2xl flex items-center gap-1.5 whitespace-nowrap animate-bounce [animation-duration:3s]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>{lang === "es" ? "Prueba la consola ⌨" : "Try the console ⌨"}</span>
          </div>

          {/* Glowing Animated FAB Button */}
          <button
            onClick={() => setTerminalState("floating")}
            className="relative h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            title={lang === "es" ? "Abrir consola" : "Open console"}
            aria-label={lang === "es" ? "Abrir consola" : "Open console"}
          >
            {/* Ping background effect */}
            <span className="absolute inset-0 rounded-full bg-indigo-500/50 animate-ping opacity-60 pointer-events-none [animation-duration:3.5s]" />
            <TerminalIcon className="relative h-5 w-5" />
          </button>
        </div>
      )}

      {/* Booking Interview Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={t.modal_booking_title}
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <p className="text-xs text-zinc-400 mt-1">{t.modal_booking_subtitle}</p>
        </div>

        <div className="space-y-3 font-mono text-xs text-zinc-300">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <span>{t.modal_booking_candidate}</span>
            <span className="text-indigo-300 font-semibold">{t.modal_booking_candidate_val}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <span>{t.modal_booking_duration}</span>
            <span className="text-indigo-300 font-semibold">{t.modal_booking_duration_val}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <span>{t.modal_booking_modality}</span>
          </div>
        </div>

        <a
          href="mailto:sergioalarcon22986@gmail.com?subject=Solicitud%20de%20Entrevista%20-%20Pyrex64"
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
        >
          <span>{t.modal_booking_confirm}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Modal>

      {/* Case Study Modal */}
      <Modal
        isOpen={caseStudy.isOpen}
        onClose={closeCaseStudy}
        title={caseStudy.title}
      >
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          {caseStudy.desc}
        </p>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono text-xs text-zinc-300 space-y-1.5 mb-6">
          <div className="text-orange-400 font-semibold">{t.modal_case_guarantee_title}</div>
          <div className="text-zinc-500">{t.modal_case_guarantee_item1}</div>
          <div className="text-zinc-500">{t.modal_case_guarantee_item2}</div>
          <div className="text-zinc-500">{t.modal_case_guarantee_item3}</div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={closeCaseStudy}
            className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-700"
          >
            {t.modal_case_close}
          </button>
        </div>
      </Modal>



    </div>
  );
}
