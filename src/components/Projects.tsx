"use client";

import { ExternalLink, Info, Code, Cpu } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";

interface ProjectsProps {
  t: TranslationSchema;
  lang: "es" | "en";
  openCaseStudy: (title: string, desc: string) => void;
}

export default function Projects({ t, lang, openCaseStudy }: ProjectsProps) {
  const customRepos = [
    {
      name: "rust-ffmpeg-cli",
      tag: "Rust Systems",
      tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      desc: lang === "es"
        ? "Herramienta de línea de comandos en Rust para la manipulación y procesamiento avanzado de archivos de audio y video mediante utilidades FFmpeg."
        : "Rust CLI utility for advanced audio and video processing using FFmpeg bindings.",
      langName: "Rust",
      langColor: "bg-orange-500",
      url: "https://github.com/ErPyrex/rust-ffmpeg-cli",
      borderHover: "hover:border-orange-500/50"
    },
    {
      name: "script-dev-setup-installer",
      tag: "Bash Automation",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      desc: lang === "es"
        ? "Script automatizado en Bash para la instalación limpia y configuración rápida de entornos de desarrollo en distribuciones Linux."
        : "Automated Bash script for clean development setup and quick config on Linux distributions.",
      langName: "Shell / Bash",
      langColor: "bg-emerald-500",
      url: "https://github.com/ErPyrex/script-dev-setup-installer",
      borderHover: "hover:border-emerald-500/50"
    },
    {
      name: "mc-server-creator",
      tag: "Server Setup",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      desc: lang === "es"
        ? "Utilidad de automatización para la creación, configuración y aprovisionamiento simplificado de servidores dedicados de Minecraft."
        : "Automation utility for creating, configuring, and provisioning dedicated Minecraft servers.",
      langName: "Scripting / Linux",
      langColor: "bg-cyan-500",
      url: "https://github.com/ErPyrex/mc-server-creator",
      borderHover: "hover:border-cyan-500/50"
    },
    {
      name: "mcp-packet-tracer-bundle",
      tag: "Networking & MCP",
      tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      desc: lang === "es"
        ? "Paquete de integración y recursos MCP (Model Context Protocol) para simulaciones y prácticas de redes en Packet Tracer."
        : "MCP integration bundle and resources for network simulations and tests in Packet Tracer.",
      langName: "Networks / Protocol",
      langColor: "bg-indigo-500",
      url: "https://github.com/ErPyrex/mcp-packet-tracer-bundle",
      borderHover: "hover:border-indigo-500/50"
    },
    {
      name: "mlbb-video-resources",
      tag: "Media Assets",
      tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      desc: lang === "es"
        ? "Repositorio y conjunto de recursos optimizados para la gestión de assets multimedia y clips de video."
        : "Repository and optimized assets stack for managing multimedia video clips and media structures.",
      langName: "Media / Assets",
      langColor: "bg-pink-500",
      url: "https://github.com/ErPyrex/mlbb-video-resources",
      borderHover: "hover:border-pink-500/50"
    }
  ];

  return (
    <section id="projects" className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-indigo-400 font-mono text-xs uppercase tracking-wider block mb-1">
            {t.projects_tag}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {t.projects_subtitle}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
          {t.projects_desc}
        </p>
      </div>

      {/* Project 1: NutriCalculadora */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 sm:p-8 mb-8 hover:border-zinc-800 transition-colors duration-200">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 font-bold font-mono">
              01
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>NutriCalculadora</span>
                <a
                  href="https://nutricalculadora.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-mono inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded px-1"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  <span>nutricalculadora.vercel.app</span>
                </a>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">Next.js • React • Tailwind CSS • Vercel Deployment</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono border border-emerald-500/20">
            {t.projects_nutri_tag}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t.projects_nutri_focus_title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t.projects_nutri_focus_desc}
            </p>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-900 text-xs text-zinc-300 space-y-1">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.projects_nutri_perf_title}</span>
              </div>
              <p>{t.projects_nutri_perf_desc}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t.projects_nutri_tech_title}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1 font-bold">›</span>
                <span>{t.projects_nutri_tech_item1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1 font-bold">›</span>
                <span>{t.projects_nutri_tech_item2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1 font-bold">›</span>
                <span>{t.projects_nutri_tech_item3}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">Next.js</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">React</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">Vercel</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">Tailwind</span>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                {t.projects_nutri_status_title}
              </h4>
              <div className="space-y-2 text-xs font-mono text-zinc-300 mt-3">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>Hosting:</span>
                  <span className="text-indigo-400 font-bold">Vercel Edge</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>Tiempo Carga:</span>
                  <span className="text-emerald-400 font-bold">&lt; 1.0s FCP</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>UX Mobile:</span>
                  <span className="text-cyan-300 font-bold">100% Touch</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-2">
              <a
                href="https://nutricalculadora.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-md flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              >
                <span>{t.projects_visit}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openCaseStudy("NutriCalculadora", t.projects_nutri_details_long)}
                className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded-lg p-1"
              >
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.projects_details}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project 2: Dorologi Store */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 sm:p-8 hover:border-zinc-800 transition-colors duration-200">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 font-bold font-mono">
              02
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Dorologi Store</span>
                <a
                  href="https://www.dorologistore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-400 hover:text-orange-300 font-mono inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded px-1"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  <span>dorologistore.com</span>
                </a>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">E-Commerce Platform • Web Development • Fast UI/UX</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-mono border border-orange-500/20">
            {t.projects_dorologi_tag}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t.projects_dorologi_focus_title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {t.projects_dorologi_focus_desc}
            </p>
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-900 text-xs text-zinc-300 space-y-1">
              <div className="text-orange-400 font-semibold flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.projects_dorologi_perf_title}</span>
              </div>
              <p>{t.projects_dorologi_perf_desc}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {t.projects_dorologi_tech_title}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1 font-bold">›</span>
                <span>{t.projects_dorologi_tech_item1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1 font-bold">›</span>
                <span>{t.projects_dorologi_tech_item2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1 font-bold">›</span>
                <span>{t.projects_dorologi_tech_item3}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">E-Commerce</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">JavaScript</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">HTML5 / CSS3</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">Production</span>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                {t.projects_dorologi_status_title}
              </h4>
              <div className="space-y-2 text-xs font-mono text-zinc-300 mt-3">
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>Dominio:</span>
                  <span className="text-orange-400 font-bold">dorologistore.com</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>Optimización:</span>
                  <span className="text-emerald-400 font-bold">SEO & Mobile First</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-900">
                  <span>Uptime:</span>
                  <span className="text-indigo-300 font-bold">100% Online</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-2">
              <a
                href="https://www.dorologistore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-md flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
              >
                <span>{t.projects_visit}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openCaseStudy("Dorologi Store", t.projects_dorologi_details_long)}
                className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded-lg p-1"
              >
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.projects_details}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Open Source Repos Section */}
      <div className="mt-16 pt-12 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-purple-400 font-mono text-xs uppercase tracking-wider block mb-1">
              {"// "}{t.repos_title}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <span>{t.repos_desc}</span>
              <a
                href="https://github.com/ErPyrex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
              >
                @ErPyrex
              </a>
            </h2>
          </div>
          <a
            href="https://github.com/ErPyrex?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-500 hover:text-white flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500/50 rounded-sm px-1"
          >
            <span>{t.projects_all_github}</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customRepos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 flex flex-col justify-between group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:border-purple-500 ${repo.borderHover}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-lg border text-[10px] font-mono font-bold ${repo.tagColor}`}>
                    {repo.tag}
                  </span>
                  <Code className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <h4 className="font-mono font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                  {repo.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {repo.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                  {repo.langName}
                </span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {t.repos_visit}
                </span>
              </div>
            </a>
          ))}

          {/* Call to Action Grid Box */}
          <a
            href="https://github.com/ErPyrex"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-dashed border-purple-500/20 bg-zinc-950/40 p-5 flex flex-col justify-center items-center text-center group hover:border-purple-500 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:border-purple-500"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </div>
            <h4 className="font-mono font-bold text-white text-sm">
              @ErPyrex {lang === "es" ? "en GitHub" : "on GitHub"}
            </h4>
            <p className="text-[11px] text-zinc-500 mt-1">
              {lang === "es" ? "Explora todos mis repositorios y dotfiles." : "Explore all my active repos and dotfiles configs."}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
