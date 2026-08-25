"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ExternalLink, Pin } from "lucide-react";
import { TranslationSchema } from "@/lib/translations";

interface TerminalProps {
  t: TranslationSchema;
  lang: "es" | "en";
  terminalState?: "docked" | "floating" | "maximized" | "minimized" | "closed";
  setTerminalState?: (state: "docked" | "floating" | "maximized" | "minimized" | "closed") => void;
}

interface LogLine {
  text: string;
  className?: string;
  isHtml?: boolean;
}



function playDoomCinematic() {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const time = ctx.currentTime;

  // --- 1. SHOTGUN BLAST (Noise + Sub-bass rumble) ---
  const bufferSize = ctx.sampleRate * 0.6; // 0.6 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.setValueAtTime(600, time);
  noiseFilter.frequency.exponentialRampToValueAtTime(100, time + 0.5);

  const blastGain = ctx.createGain();
  blastGain.gain.setValueAtTime(0.4, time);
  blastGain.gain.exponentialRampToValueAtTime(0.001, time + 0.55);

  noiseNode.connect(noiseFilter);
  noiseFilter.connect(blastGain);
  blastGain.connect(ctx.destination);

  noiseNode.start(time);
  noiseNode.stop(time + 0.6);

  // Sub-bass thump for the shotgun
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = "sine";
  thump.frequency.setValueAtTime(120, time);
  thump.frequency.exponentialRampToValueAtTime(10, time + 0.35);

  thumpGain.gain.setValueAtTime(0.6, time);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

  thump.connect(thumpGain);
  thumpGain.connect(ctx.destination);

  thump.start(time);
  thump.stop(time + 0.45);

  // --- 2. PUMP ACTION (Slightly metallic reload clicks) ---
  const scheduleClick = (clickTime: number, freq: number, dur: number) => {
    const osc = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const clickGain = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, clickTime);

    modulator.type = "sine";
    modulator.frequency.setValueAtTime(freq * 1.5, clickTime);
    modGain.gain.setValueAtTime(200, clickTime);

    clickGain.gain.setValueAtTime(0.12, clickTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + dur);
    
    modulator.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(clickGain);
    clickGain.connect(ctx.destination);
    
    modulator.start(clickTime);
    osc.start(clickTime);
    modulator.stop(clickTime + dur);
    osc.stop(clickTime + dur);
  };

  scheduleClick(time + 0.55, 900, 0.08); // click 1 (slide back)
  scheduleClick(time + 0.68, 650, 0.09); // click 2 (slide forward)

  // --- 3. E1M1 RIFF (OPL2/OPL3 FM Synthesis) ---
  const E2 = 82.41;
  const E3 = 164.81;
  const D3 = 146.83;
  const C3 = 130.81;
  const B2 = 123.47;
  const A_sharp2 = 116.54;
  const G2 = 98.00;

  const riff = [
    E2, E2, E3, E2, E2, D3, E2, E2,
    C3, E2, E2, A_sharp2, E2, E2, B2, C3,
    E2, E2, E3, E2, E2, D3, E2, E2,
    C3, E2, E2, A_sharp2, E2, E2, B2, G2
  ];

  let riffTime = time + 0.85; // start riff right after shotgun reload clicks
  const stepDuration = 0.125; // 120 BPM sixteenth note duration

  riff.forEach((freq) => {
    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const noteGain = ctx.createGain();
    const lpFilter = ctx.createBiquadFilter();

    carrier.type = "sine";
    carrier.frequency.setValueAtTime(freq, riffTime);

    // FM modulator at 2x frequency
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(freq * 2, riffTime);
    
    // High modulation index for bright/distorted FM guitar tone
    modGain.gain.setValueAtTime(320, riffTime);
    modGain.gain.exponentialRampToValueAtTime(10, riffTime + stepDuration - 0.01);

    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(450, riffTime);

    // Note ADSR envelope
    noteGain.gain.setValueAtTime(0.001, riffTime);
    noteGain.gain.linearRampToValueAtTime(0.18, riffTime + 0.01); // quick attack
    noteGain.gain.exponentialRampToValueAtTime(0.08, riffTime + stepDuration - 0.02); // decay
    noteGain.gain.linearRampToValueAtTime(0.001, riffTime + stepDuration); // release

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(lpFilter);
    lpFilter.connect(noteGain);
    noteGain.connect(ctx.destination);

    modulator.start(riffTime);
    carrier.start(riffTime);
    modulator.stop(riffTime + stepDuration);
    carrier.stop(riffTime + stepDuration);

    riffTime += stepDuration;
  });
}

function playTronLead(freq: number) {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  // Lead Synth Voice
  const osc = ctx.createOscillator();
  const hpFilter = ctx.createBiquadFilter();
  const lpFilter = ctx.createBiquadFilter();
  const gainNode = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, now);

  hpFilter.type = "highpass";
  hpFilter.frequency.setValueAtTime(200, now);

  lpFilter.type = "lowpass";
  lpFilter.frequency.setValueAtTime(1400, now);
  lpFilter.frequency.exponentialRampToValueAtTime(450, now + 0.1);
  lpFilter.Q.setValueAtTime(2.5, now);

  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.linearRampToValueAtTime(0.06, now + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

  osc.connect(hpFilter);
  hpFilter.connect(lpFilter);
  lpFilter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);

  // Simple simulated Delay effect (Echo note)
  setTimeout(() => {
    const delayOsc = ctx.createOscillator();
    const delayLp = ctx.createBiquadFilter();
    const delayGain = ctx.createGain();

    delayOsc.type = "sawtooth";
    delayOsc.frequency.setValueAtTime(freq, ctx.currentTime);

    delayLp.type = "lowpass";
    delayLp.frequency.setValueAtTime(600, ctx.currentTime);

    delayGain.gain.setValueAtTime(0.02, ctx.currentTime);
    delayGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    delayOsc.connect(delayLp);
    delayLp.connect(delayGain);
    delayGain.connect(ctx.destination);

    delayOsc.start(ctx.currentTime);
    delayOsc.stop(ctx.currentTime + 0.08);
  }, 60); // 60ms delay
}

function playTronBass(freq: number) {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const lpFilter = ctx.createBiquadFilter();
  const gainNode = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, now);

  lpFilter.type = "lowpass";
  lpFilter.frequency.setValueAtTime(200, now);

  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(lpFilter);
  lpFilter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

function playTronTurnSound() {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const time = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, time);
  osc.frequency.exponentialRampToValueAtTime(1600, time + 0.05);

  gainNode.gain.setValueAtTime(0.06, time);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + 0.05);
}

function playTronCrashSound() {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const time = ctx.currentTime;

  // Noise explosion
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, time);
  filter.frequency.exponentialRampToValueAtTime(30, time + 0.65);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.4, time);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.7);

  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noiseNode.start(time);
  noiseNode.stop(time + 0.7);

  // Sub bass sweep
  const sweep = ctx.createOscillator();
  const sweepGain = ctx.createGain();
  sweep.type = "sine";
  sweep.frequency.setValueAtTime(150, time);
  sweep.frequency.exponentialRampToValueAtTime(20, time + 0.5);

  sweepGain.gain.setValueAtTime(0.5, time);
  sweepGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

  sweep.connect(sweepGain);
  sweepGain.connect(ctx.destination);

  sweep.start(time);
  sweep.stop(time + 0.5);
}

export default function Terminal({
  t,
  lang,
  terminalState = "docked",
  setTerminalState = () => {}
}: TerminalProps) {
  const [history, setHistory] = useState<LogLine[]>([
    { text: `// ${t.terminal_welcome}`, className: "text-zinc-500" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true);
  const [activeLoop, setActiveLoop] = useState<"tron" | "top" | "install" | null>(null);
  
  // Animation states
  const [topStats, setTopStats] = useState({ cpu: 12, mem: 42 });
  const [tronGame, setTronGame] = useState({
    orange: { x: 2, y: 4, dx: 1, dy: 0, trail: [{ x: 2, y: 4 }] },
    white: { x: 21, y: 4, dx: -1, dy: 0, trail: [{ x: 21, y: 4 }] },
    status: "idle",
    winner: null as "orange" | "white" | "draw" | null,
    step: 0,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Focus terminal input on mount/state changes without scrolling
    if (terminalState !== "closed" && terminalState !== "minimized" && activeLoop === null) {
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [terminalState, activeLoop]);

  // Stop active loops helper
  const stopActiveLoops = () => {
    if (loopRef.current) clearInterval(loopRef.current);
    setActiveLoop(null);
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 50);
  };

  // Append new line helper
  const appendLine = (text: string, className = "text-zinc-300", isHtml = false) => {
    setHistory((prev) => [...prev, { text, className, isHtml }]);
  };

  // Simulate Dev setup script installation
  async function simulateInstall() {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    appendLine("Initializing setup installer…", "text-indigo-400");
    await sleep(800);
    appendLine("Downloading packages from mirror…");
    await sleep(600);
    appendLine("[1/4] Fetching script-dev-setup-installer…", "text-zinc-400");
    await sleep(500);
    appendLine("[2/4] Verifying Linux environment configurations…", "text-zinc-400");
    await sleep(600);
    appendLine("[3/4] Resolving Docker and PostgreSQL credentials…", "text-zinc-400");
    await sleep(700);
    appendLine("[4/4] Setting up GitHub Actions workflow hooks…", "text-zinc-400");
    await sleep(500);
    appendLine("Compiling scripts…");
    await sleep(800);
    appendLine("✔ Dev setup environment configured successfully!", "text-emerald-400 font-bold");
    appendLine("Done. Ready to deploy.", "text-emerald-400");
    setActiveLoop(null);
  }

  // Execute terminal CLI commands
  function executeCommand(cmdText: string) {
    appendLine(`pyrex64@linux:~$ ${cmdText}`, "text-emerald-400 font-bold");
    const cmd = cmdText.toLowerCase().trim();

    switch (cmd) {
      case "help":
        appendLine(lang === "es" 
          ? "Comandos disponibles: github, repos, projects, skills, ai, workflows, linux, rust, stack, deploy, contact, hire, neofetch, top, df, install, tron, doom, clear" 
          : "Available commands: github, repos, projects, skills, ai, workflows, linux, rust, stack, deploy, contact, hire, neofetch, top, df, install, tron, doom, clear");
        break;

      case "whoami":
        appendLine(lang === "es"
          ? "Ingeniero en Informática | Linux Sysadmin & Web/Mobile Developer"
          : "Computer Engineer | Linux Sysadmin & Web/Mobile Developer", "text-indigo-300 pl-4");
        break;

      case "neofetch":
        appendLine(`
   /\\_/\\      pyrex64@linux
  ( o.o )     -------------
   > ^ <      OS: Linux Mint / Alpine Linux Base
  /     \\     Host: Portfolio Framework v16.3.2
 |       |    Kernel: NextJS-AppRouter
  \\_____/     Uptime: 5 mins
              Shell: bash 5.2.26
              CPU: AMD Ryzen 5 (Vercel Edge / Render Host)
              Memory: 512MB RAM
              IDE: Antigravity IDE / VS Code
        `, "text-zinc-400 font-mono whitespace-pre", false);
        break;

      case "github":
      case "repos":
        appendLine(lang === "es" ? "📦 Repositorios destacados en GitHub (@ErPyrex):" : "📦 Featured GitHub Repos (@ErPyrex):", "text-zinc-200 font-semibold");
        appendLine("  1. rust-ffmpeg-cli -> https://github.com/ErPyrex/rust-ffmpeg-cli");
        appendLine("  2. script-dev-setup-installer -> https://github.com/ErPyrex/script-dev-setup-installer");
        appendLine("  3. mc-server-creator -> https://github.com/ErPyrex/mc-server-creator");
        appendLine("  4. mcp-packet-tracer-bundle -> https://github.com/ErPyrex/mcp-packet-tracer-bundle");
        appendLine("  5. mlbb-video-resources -> https://github.com/ErPyrex/mlbb-video-resources");
        break;

      case "projects":
        appendLine(lang === "es" ? "✦ Aplicaciones Web & Producción:" : "✦ Production Web Apps:", "text-zinc-200 font-semibold");
        appendLine("   • NutriCalculadora -> https://nutricalculadora.vercel.app/");
        appendLine("   • Dorologi Store -> https://www.dorologistore.com/");
        appendLine(lang === "es" 
          ? "✦ Utilidades de Consola: rust-ffmpeg-cli, script-dev-setup-installer…" 
          : "✦ Console Utilities: rust-ffmpeg-cli, script-dev-setup-installer…");
        break;

      case "skills":
        appendLine("✦ Next.js, React, Expo (React Native), TypeScript, Tailwind CSS.");
        appendLine("✦ Linux (Primary OS), Docker, Bash Scripting, PostgreSQL, SQLite, Supabase.");
        appendLine("✦ GitHub Workflows (CI/CD), AI tools (Antigravity).");
        break;

      case "ai":
        appendLine(lang === "es" 
          ? "🤖 Integración activa de asistentes AI (como Antigravity, AntigravityCLI, OpenCode y Google Stitch) para agilizar el diseño, prototipado e infraestructura de software."
          : "🤖 Active integration of AI assistants (like Antigravity, AntigravityCLI, OpenCode, and Google Stitch) to streamline software design, prototyping, and infrastructure.");
        break;

      case "workflows":
      case "cicd":
        appendLine("⚡ CI/CD: Automated integration pipelines via GitHub Actions, compiling tests, lint validations, and deploying seamlessly to Vercel/Render.");
        break;

      case "linux":
        appendLine(lang === "es"
          ? "✦ Linux es mi sistema de desarrollo diario nativo. Dominio de CLI, configuración de dotfiles, bash scripting y dockerización."
          : "✦ Linux is my native daily development system. Solid command of CLI, dotfiles management, bash scripting, and docker containerization.");
        break;

      case "rust":
        appendLine("✦ rust-ffmpeg-cli: High-performance Rust CLI wrapper to automate multi-threaded video transcoding via FFmpeg. Source at github.com/ErPyrex/rust-ffmpeg-cli");
        break;

      case "stack":
        appendLine("Web: Next.js + React | Mobile: Expo (React Native)");
        appendLine("Sysadmin/DevOps: Linux OS, Docker Compose, GitHub Actions");
        appendLine("DB: PostgreSQL, SQLite, Supabase BaaS");
        break;

      case "deploy":
        appendLine("✦ Deployment channels: Vercel (Edge network for Next.js), Render (Node web services), Docker containers (on-premise server deployment).");
        break;

      case "contact":
        appendLine(`Email: sergioalarcon22986@gmail.com | GitHub: https://github.com/ErPyrex`);
        break;

      case "hire":
        appendLine(lang === "es"
          ? "🚀 ¡Disponible para contratación inmediata! Escríbeme a sergioalarcon22986@gmail.com o a través del formulario."
          : "🚀 Available for immediate hire or project contracts! Contact me at sergioalarcon22986@gmail.com.");
        break;

      case "df":
        appendLine("Filesystem      Size  Used Avail Use% Mounted on");
        appendLine("/dev/nvme0n1p2  476G  189G  263G  42% /home/pyrex64");
        appendLine("tmpfs            16G  2.3M   16G   1% /run");
        appendLine("/dev/sda1       932G  512G  420G  55% /mnt/data");
        break;

      case "top":
        setTopStats({ cpu: 12, mem: 42 });
        setActiveLoop("top");
        break;

      case "install":
      case "dev-setup":
        setActiveLoop("install");
        simulateInstall();
        break;

      case "tron":
        setActiveLoop("tron");
        break;

      case "doom":
        playDoomCinematic();
        appendLine(`
######   #######  #######  #     #
#     #  #     #  #     #  ##   ##
#     #  #     #  #     #  # # # #
#     #  #     #  #     #  #  #  #
#     #  #     #  #     #  #     #
#     #  #     #  #     #  #     #
######   #######  #######  #     #
        `, "text-red-500 font-bold whitespace-pre font-mono", false);
        appendLine("*HEAVY METAL MUSIC PLAYS IN D-MINOR*", "text-red-400 italic");
        appendLine("*E1M1: At Doom's Gate*", "text-red-400 font-bold");
        appendLine("*SHOTGUN BLAST - CHUCK-CHUCK*", "text-red-500 font-extrabold");
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        appendLine(lang === "es"
          ? `Comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista.`
          : `Command not recognized: '${cmd}'. Type 'help' to show all commands.`, "text-red-400");
    }
  }

  // Handle keystroke submissions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Intercept keys if loops are active
    if (activeLoop) {
      if (e.key === "q" || (e.ctrlKey && e.key === "c")) {
        stopActiveLoops();
        appendLine("^C", "text-red-400 font-bold");
        appendLine("");
      }
      return;
    }

    // Stop autoplay on first interaction
    if (isAutoplayRunning) {
      setIsAutoplayRunning(false);
      setInputValue("");
    }

    if (e.key === "Enter") {
      const cmd = inputValue.trim();
      setInputValue("");
      if (cmd) {
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
        executeCommand(cmd);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    }
  };

  // Auto-scroll when output changes within the container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  // Autoplay Typing Script
  useEffect(() => {
    if (!isAutoplayRunning) return;
    let cancelled = false;

    const runAutoplay = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      
      const typeCommand = async (cmd: string) => {
        for (let i = 1; i <= cmd.length; i++) {
          if (cancelled) return;
          setInputValue(cmd.substring(0, i));
          await sleep(50 + Math.random() * 50);
        }
        await sleep(500);
        if (cancelled) return;
        setInputValue("");
        executeCommand(cmd);
      };

      await sleep(1500);
      if (cancelled) return;
      await typeCommand("whoami");
      await sleep(1500);
      if (cancelled) return;
      await typeCommand("neofetch");
      await sleep(2000);
      if (cancelled) return;
      await typeCommand("help");
      setIsAutoplayRunning(false);
    };

    runAutoplay();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoplayRunning]);

  // Tron game tick logic
  const tickTron = (prev: typeof tronGame) => {
    if (prev.status !== "running") return prev;

    const cols = 24;
    const rows = 9;

    const orange = { ...prev.orange, trail: [...prev.orange.trail] };
    const white = { ...prev.white, trail: [...prev.white.trail] };
    let winner = prev.winner;
    let status = prev.status;
    const step = prev.step + 1;

    // Helper to check if a cell is occupied by any trail or wall
    const isOccupied = (x: number, y: number) => {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return true;
      const hitOrange = orange.trail.some((t) => t.x === x && t.y === y);
      const hitWhite = white.trail.some((t) => t.x === x && t.y === y);
      return hitOrange || hitWhite;
    };

    // AI decisions
    let orangeTurned = false;
    let whiteTurned = false;

    // 1. Orange AI
    const nextOx = orange.x + orange.dx;
    const nextOy = orange.y + orange.dy;
    
    // Add small random chance to make tactical turns to avoid determinism
    let orangeMustTurn = isOccupied(nextOx, nextOy);
    if (!orangeMustTurn && Math.random() < 0.06 && step > 4) {
      orangeMustTurn = true;
    }

    if (orangeMustTurn) {
      const ldx = -orange.dy;
      const ldy = orange.dx;
      const rdx = orange.dy;
      const rdy = -orange.dx;
      const leftFree = !isOccupied(orange.x + ldx, orange.y + ldy);
      const rightFree = !isOccupied(orange.x + rdx, orange.y + rdy);

      if (leftFree && rightFree) {
        if (Math.random() < 0.5) {
          orange.dx = ldx;
          orange.dy = ldy;
        } else {
          orange.dx = rdx;
          orange.dy = rdy;
        }
        orangeTurned = true;
      } else if (leftFree) {
        orange.dx = ldx;
        orange.dy = ldy;
        orangeTurned = true;
      } else if (rightFree) {
        orange.dx = rdx;
        orange.dy = rdy;
        orangeTurned = true;
      }
    }

    // 2. White AI
    const nextWx = white.x + white.dx;
    const nextWy = white.y + white.dy;

    let whiteMustTurn = isOccupied(nextWx, nextWy);
    if (!whiteMustTurn && Math.random() < 0.06 && step > 4) {
      whiteMustTurn = true;
    }

    if (whiteMustTurn) {
      const ldx = -white.dy;
      const ldy = white.dx;
      const rdx = white.dy;
      const rdy = -white.dx;
      const leftFree = !isOccupied(white.x + ldx, white.y + ldy);
      const rightFree = !isOccupied(white.x + rdx, white.y + rdy);

      if (leftFree && rightFree) {
        if (Math.random() < 0.5) {
          white.dx = ldx;
          white.dy = ldy;
        } else {
          white.dx = rdx;
          white.dy = rdy;
        }
        whiteTurned = true;
      } else if (leftFree) {
        white.dx = ldx;
        white.dy = ldy;
        whiteTurned = true;
      } else if (rightFree) {
        white.dx = rdx;
        white.dy = rdy;
        whiteTurned = true;
      }
    }

    // Move bikes
    orange.x += orange.dx;
    orange.y += orange.dy;
    orange.trail.push({ x: orange.x, y: orange.y });

    white.x += white.dx;
    white.y += white.dy;
    white.trail.push({ x: white.x, y: white.y });

    // Check collisions
    const orangeCrashed = orange.x < 0 || orange.x >= cols || orange.y < 0 || orange.y >= rows ||
      orange.trail.slice(0, -1).some((t) => t.x === orange.x && t.y === orange.y) ||
      white.trail.some((t) => t.x === orange.x && t.y === orange.y);

    const whiteCrashed = white.x < 0 || white.x >= cols || white.y < 0 || white.y >= rows ||
      white.trail.slice(0, -1).some((t) => t.x === white.x && t.y === white.y) ||
      orange.trail.some((t) => t.x === white.x && t.y === white.y);

    if (orangeCrashed && whiteCrashed) {
      status = "crashed";
      winner = "draw";
      setTimeout(() => playTronCrashSound(), 0);
    } else if (orangeCrashed) {
      status = "crashed";
      winner = "white";
      setTimeout(() => playTronCrashSound(), 0);
    } else if (whiteCrashed) {
      status = "crashed";
      winner = "orange";
      setTimeout(() => playTronCrashSound(), 0);
    } else {
      if (orangeTurned || whiteTurned) {
        setTimeout(() => playTronTurnSound(), 0);
      }
      
      // Daft Punk End Credits Theme Ostinato
      const leadArp = [
        293.66, 349.23, 440.00, 587.33, 523.25, 587.33, 523.25, 440.00,
        293.66, 349.23, 440.00, 587.33, 523.25, 587.33, 523.25, 440.00,
        349.23, 440.00, 523.25, 698.46, 659.25, 698.46, 659.25, 523.25,
        392.00, 466.16, 587.33, 783.99, 698.46, 783.99, 698.46, 587.33
      ];
      const bassLine = [
        73.42, 73.42, 73.42, 73.42,
        73.42, 73.42, 73.42, 73.42,
        87.31, 87.31, 87.31, 87.31,
        98.00, 98.00, 98.00, 98.00
      ];

      const leadFreq = leadArp[step % leadArp.length];
      const bassFreq = bassLine[Math.floor(step / 2) % bassLine.length];

      setTimeout(() => {
        playTronLead(leadFreq);
        if (step % 2 === 0) {
          playTronBass(bassFreq);
        }
      }, 0);
    }

    return {
      orange,
      white,
      status,
      winner,
      step,
    };
  };

  // Active loop runner (Top, Install simulation)
  useEffect(() => {
    if (loopRef.current) clearInterval(loopRef.current);

    if (activeLoop === "top") {
      loopRef.current = setInterval(() => {
        setTopStats({
          cpu: Math.floor(8 + Math.random() * 25),
          mem: Math.floor(40 + Math.random() * 3),
        });
      }, 1000);
    }

    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, [activeLoop]);

  // Tron game loop runner
  useEffect(() => {
    if (activeLoop !== "tron") return;

    // Reset game state on start
    setTronGame({
      orange: { x: 2, y: 4, dx: 1, dy: 0, trail: [{ x: 2, y: 4 }] },
      white: { x: 21, y: 4, dx: -1, dy: 0, trail: [{ x: 21, y: 4 }] },
      status: "running",
      winner: null,
      step: 0,
    });

    const interval = setInterval(() => {
      setTronGame((prev) => tickTron(prev));
    }, 120);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLoop]);

  // Listen for global key presses when a loop is active
  useEffect(() => {
    if (!activeLoop) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q" || (e.ctrlKey && e.key === "c") || e.key === "Escape") {
        stopActiveLoops();
        appendLine("^C", "text-red-400 font-bold");
        appendLine("");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [activeLoop]);

  const renderTronGrid = () => {
    const cols = 24;
    const rows = 9;
    const gridElements: React.ReactNode[] = [];

    const getBikeChar = (dx: number, dy: number) => {
      if (dx === 1) return "▶";
      if (dx === -1) return "◀";
      if (dy === 1) return "▼";
      if (dy === -1) return "▲";
      return "▲";
    };

    for (let y = 0; y < rows; y++) {
      const rowSpans: React.ReactNode[] = [];
      for (let x = 0; x < cols; x++) {
        const isOrangeBike = tronGame.orange.x === x && tronGame.orange.y === y;
        const isWhiteBike = tronGame.white.x === x && tronGame.white.y === y;
        const isOrangeTrail = tronGame.orange.trail.some((t) => t.x === x && t.y === y);
        const isWhiteTrail = tronGame.white.trail.some((t) => t.x === x && t.y === y);

        const key = `${x}-${y}`;

        if (isOrangeBike) {
          rowSpans.push(
            <span key={key} className="text-orange-500 font-extrabold animate-pulse">
              {getBikeChar(tronGame.orange.dx, tronGame.orange.dy)}
            </span>
          );
        } else if (isWhiteBike) {
          rowSpans.push(
            <span key={key} className="text-white font-extrabold animate-pulse">
              {getBikeChar(tronGame.white.dx, tronGame.white.dy)}
            </span>
          );
        } else if (isOrangeTrail) {
          rowSpans.push(
            <span key={key} className="text-orange-600 font-bold">
              #
            </span>
          );
        } else if (isWhiteTrail) {
          rowSpans.push(
            <span key={key} className="text-zinc-400 font-bold">
              *
            </span>
          );
        } else {
          rowSpans.push(
            <span key={key} className="text-zinc-800 font-bold">
              ·
            </span>
          );
        }
      }
      gridElements.push(
        <div key={y} className="flex gap-[1px] leading-none">
          {rowSpans}
        </div>
      );
    }

    return <div className="flex flex-col gap-[2px]">{gridElements}</div>;
  };

  const isMaximized = terminalState === "maximized";
  const isDocked = terminalState === "docked";

  return (
    <div
      className={`relative w-full flex flex-col overflow-hidden focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200 ${
        isDocked 
          ? "rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl h-[380px]" 
          : "h-full rounded-2xl border border-zinc-800/80 bg-zinc-950/98 shadow-2xl"
      }`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          {/* OS Window Control Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setTerminalState("closed")}
              type="button"
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 cursor-pointer"
              title={lang === "es" ? "Cerrar consola" : "Close console"}
              aria-label={lang === "es" ? "Cerrar consola" : "Close console"}
            />
            <button
              onClick={() => setTerminalState("minimized")}
              type="button"
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 cursor-pointer"
              title={lang === "es" ? "Minimizar consola" : "Minimize console"}
              aria-label={lang === "es" ? "Minimizar consola" : "Minimize console"}
            />
            <button
              onClick={() => setTerminalState(isMaximized ? "floating" : "maximized")}
              type="button"
              className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 cursor-pointer"
              title={isMaximized ? (lang === "es" ? "Restaurar tamaño" : "Restore size") : (lang === "es" ? "Maximizar consola" : "Maximize console")}
              aria-label={isMaximized ? (lang === "es" ? "Restaurar tamaño" : "Restore size") : (lang === "es" ? "Maximizar consola" : "Maximize console")}
            />
          </div>
          <span className="text-[11px] font-mono text-zinc-400 ml-2 flex items-center gap-1">
            <TerminalIcon className="h-3 w-3 text-indigo-400" aria-hidden="true" />
            pyrex64@linux:~
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTerminalState(isDocked ? "floating" : "docked")}
            type="button"
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 cursor-pointer"
            title={isDocked ? (lang === "es" ? "Desanclar consola" : "Unpin console") : (lang === "es" ? "Acoplar consola a la página" : "Dock console to page")}
            aria-label={isDocked ? (lang === "es" ? "Desanclar consola" : "Unpin console") : (lang === "es" ? "Acoplar consola a la página" : "Dock console to page")}
          >
            {isDocked ? (
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pin className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <span className="text-[10px] font-mono text-zinc-500">bash shell</span>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        ref={scrollContainerRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto text-zinc-300 flex flex-col justify-between cursor-text"
      >
        {/* Output log */}
        <div className="space-y-1.5 break-words">
          {history.map((line, idx) => (
            <div key={idx} className={line.className}>
              {line.text}
            </div>
          ))}

          {/* Loop render overlay */}
          {activeLoop === "tron" && (
            <div className="font-mono text-xs pt-2">
              <div className="text-cyan-400 font-bold mb-2">--- LIGHT CYCLE GRID (TRON SIMULATION) ---</div>
              <div className="bg-zinc-950 border border-cyan-900/50 p-3 inline-block rounded-xl shadow-inner">
                {renderTronGrid()}
              </div>
              <div className="mt-3 flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
                <div>
                  <span className="text-orange-500 font-bold">Orange Bike:</span> #
                </div>
                <div>
                  <span className="text-white font-bold">White Bike:</span> *
                </div>
                <div>
                  <span className="text-zinc-400 font-bold">Exit:</span> Press &apos;q&apos;
                </div>
              </div>
              {tronGame.status === "crashed" && (
                <div className="mt-3 text-red-500 font-bold text-xs uppercase animate-pulse">
                  {tronGame.winner === "draw" 
                    ? ">> COLLISION DETECTED! IT'S A DRAW!" 
                    : tronGame.winner === "orange" 
                    ? ">> WHITE BIKE CRASHED! ORANGE WINS!" 
                    : ">> ORANGE BIKE CRASHED! WHITE WINS!"
                  }
                </div>
              )}
            </div>
          )}

          {activeLoop === "top" && (
            <div className="font-mono text-zinc-300 pt-2 text-xs">
              <div>Tasks: 95 total, 1 running, 94 sleeping</div>
              <div>%Cpu(s): {topStats.cpu}% us, 1.2% sy, 0.0% ni, 98.8% id</div>
              <div>MiB Mem: 16042.8 total, {topStats.mem}% used</div>
              <div className="mt-2 text-emerald-400 font-bold">PID  USER     PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND</div>
              <div>1042 pyrex64  20   0  310.4m  45.1m  12.3m R  {topStats.cpu}.0   0.4   0:04.12 next-dev</div>
              <div> 911 pyrex64  20   0   42.2m   8.3m   2.1m S   0.0   0.1   0:00.04 bash</div>
              <div>1205 root      20   0  210.1m  12.5m   4.2m S   0.0   0.1   0:01.42 dockerd</div>
              <div className="text-zinc-500 text-[10px] mt-4 italic">{"// Press 'q' to quit monitor"}</div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* User Input line */}
        {!activeLoop && (
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-zinc-900 shrink-0">
            <span className="text-emerald-400 font-bold shrink-0">pyrex64@linux:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-zinc-100 w-full font-mono text-xs focus:ring-0 p-0"
              placeholder={isAutoplayRunning ? "…" : t.terminal_placeholder}
              aria-label={lang === "es" ? "Línea de comandos de la terminal" : "Terminal command line input"}
              disabled={activeLoop !== null}
            />
          </div>
        )}

        {activeLoop && (
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-zinc-900 shrink-0">
            <span className="text-red-500 font-bold shrink-0">[running] press &apos;q&apos; to stop</span>
          </div>
        )}
      </div>
    </div>
  );
}
