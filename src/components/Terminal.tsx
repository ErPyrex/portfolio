"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  TranslationSchema,
  esTranslations,
  enTranslations,
} from "@/lib/translations";

interface TerminalProps {
  t: TranslationSchema;
  lang: "es" | "en";
  setLang?: (lang: "es" | "en") => void;
  terminalState?: string;
  setTerminalState?: (state: any) => void;
}

interface LogLine {
  text?: string;
  className?: string;
  type?: "text" | "form";
}

// Audio Synthesis Functions (Web Audio API)
function playKeyboardClick() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);

    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Ignore audio errors
  }
}

function playDoomCinematic() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    const time = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.6;
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

    scheduleClick(time + 0.55, 900, 0.08);
    scheduleClick(time + 0.68, 650, 0.09);

    const E2 = 82.41;
    const E3 = 164.81;
    const D3 = 146.83;
    const C3 = 130.81;
    const B2 = 123.47;
    const A_sharp2 = 116.54;
    const G2 = 98.0;

    const riff = [
      E2,
      E2,
      E3,
      E2,
      E2,
      D3,
      E2,
      E2,
      C3,
      E2,
      E2,
      A_sharp2,
      E2,
      E2,
      B2,
      C3,
      E2,
      E2,
      E3,
      E2,
      E2,
      D3,
      E2,
      E2,
      C3,
      E2,
      E2,
      A_sharp2,
      E2,
      E2,
      B2,
      G2,
    ];

    let riffTime = time + 0.85;
    const stepDuration = 0.125;

    riff.forEach((freq) => {
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();
      const noteGain = ctx.createGain();
      const lpFilter = ctx.createBiquadFilter();

      carrier.type = "sine";
      carrier.frequency.setValueAtTime(freq, riffTime);

      modulator.type = "sine";
      modulator.frequency.setValueAtTime(freq * 2, riffTime);

      modGain.gain.setValueAtTime(320, riffTime);
      modGain.gain.exponentialRampToValueAtTime(
        10,
        riffTime + stepDuration - 0.01,
      );

      lpFilter.type = "lowpass";
      lpFilter.frequency.setValueAtTime(450, riffTime);

      noteGain.gain.setValueAtTime(0.001, riffTime);
      noteGain.gain.linearRampToValueAtTime(0.18, riffTime + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(
        0.08,
        riffTime + stepDuration - 0.02,
      );
      noteGain.gain.linearRampToValueAtTime(0.001, riffTime + stepDuration);

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
  } catch (e) {}
}

function playTronLead(freq: number) {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

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

    setTimeout(() => {
      const delayOsc = ctx.createOscillator();
      const delayLp = ctx.createBiquadFilter();
      const delayGain = ctx.createGain();

      delayOsc.type = "sawtooth";
      delayOsc.frequency.setValueAtTime(freq, ctx.currentTime);

      delayLp.type = "lowpass";
      delayLp.frequency.setValueAtTime(600, ctx.currentTime);

      delayGain.gain.setValueAtTime(0.02, ctx.currentTime);
      delayGain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.08,
      );

      delayOsc.connect(delayLp);
      delayLp.connect(delayGain);
      delayGain.connect(ctx.destination);

      delayOsc.start(ctx.currentTime);
      delayOsc.stop(ctx.currentTime + 0.08);
    }, 60);
  } catch (e) {}
}

function playTronBass(freq: number) {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
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
  } catch (e) {}
}

function playTronTurnSound() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
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
  } catch (e) {}
}

function playTronCrashSound() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    const time = ctx.currentTime;

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
  } catch (e) {}
}

// Matrix Falling Code Rain Canvas Component
const MatrixRainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns = 0;
    let drops: number[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCols = Math.floor(canvas.width / 16);
      if (newCols !== columns) {
        columns = newCols;
        drops = Array(columns).fill(0);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars =
      "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const draw = () => {
      ctx.fillStyle = "rgba(2, 5, 2, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#33ff66";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;

        ctx.fillStyle = Math.random() > 0.98 ? "#ffffff" : "#33ff66";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#020502] block pointer-events-none"
    />
  );
};

// Doom Full-screen ASCII Fire Canvas Component
const DoomFireCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const charW = 12;
    const charH = 14;

    let cols = 0;
    let rows = 0;
    let pixels = new Uint8Array(0);
    let heightLimits = new Int32Array(0);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCols = Math.floor(canvas.width / charW);
      const newRows = Math.floor(canvas.height / charH);

      if (newCols !== cols || newRows !== rows) {
        cols = newCols;
        rows = newRows;
        pixels = new Uint8Array(cols * rows);
        heightLimits = new Int32Array(cols);

        // Pre-calculate fire height limit for each column using a 5-peak wave envelope
        for (let x = 0; x < cols; x++) {
          const angle1 = (x / cols) * Math.PI * 10; // 5 peak cycles
          const angle2 = (x / cols) * Math.PI * 22; // Micro waves
          const wave = Math.sin(angle1) * 0.14 + Math.sin(angle2) * 0.04;
          const heightFraction = 0.28 + wave; // Fire height limited to lower 10% - 46% of viewport
          heightLimits[x] = Math.floor(rows * (1 - heightFraction));
        }
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const doomLogo = [
      "______ _____  ________  ___",
      "|  _  \\  _  ||  _  |  \\/  |",
      "| | | | | | || | | | .  . |",
      "| | | | | | || | | | |\\/| |",
      "| |/ /\\ \\_/ /\\ \\_/ / |  | |",
      "|___/  \\___/  \\___/\\_|  |_/",
    ];
    const logoW = 27;
    const logoH = 6;

    const palette = " .:-=+*#%@$S#*:.";

    const draw = () => {
      ctx.fillStyle = "#020502";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (cols === 0 || rows === 0) return;

      // Set bottom row to maximum heat
      for (let x = 0; x < cols; x++) {
        pixels[(rows - 1) * cols + x] = 35;
      }

      // Propagate fire upwards
      for (let x = 0; x < cols; x++) {
        // Flicker effect on column height limit
        const colLimit = heightLimits[x] + Math.floor(Math.random() * 3) - 1;

        for (let y = rows - 1; y >= 0; y--) {
          if (y < colLimit) {
            pixels[y * cols + x] = 0;
            continue;
          }

          if (y < rows - 1) {
            const src = (y + 1) * cols + x;
            const rand = Math.floor(Math.random() * 3);
            const destX = (x + rand - 1 + cols) % cols;
            const dest = y * cols + destX;

            const decay = Math.floor(Math.random() * 2) + 1; // Slightly faster decay
            const val = pixels[src] - decay;
            pixels[dest] = val < 0 ? 0 : val;
          }
        }
      }

      // 1. Render fire cells at the bottom
      ctx.font = "12px monospace";
      ctx.textBaseline = "top";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const val = pixels[y * cols + x];
          if (val > 0) {
            let fillStyle = "transparent";
            if (val < 5) fillStyle = "rgba(120, 10, 10, 0.4)";
            else if (val < 10) fillStyle = "rgba(180, 20, 20, 0.7)";
            else if (val < 15) fillStyle = "#b91c1c";
            else if (val < 20) fillStyle = "#ef4444";
            else if (val < 25) fillStyle = "#f97316";
            else if (val < 30) fillStyle = "#fb923c";
            else fillStyle = "#fde047";

            const charIndex = Math.floor((val / 35) * (palette.length - 1));
            const char = palette[charIndex] || " ";
            ctx.fillStyle = fillStyle;
            ctx.fillText(char, x * charW, y * charH);
          }
        }
      }

      // 2. Render responsive larger DOOM logo on top with neon white shadow glow
      let logoFontSize = 42;
      let logoCharW = 25;
      let logoCharH = 42;

      if (canvas.width < 640) {
        logoFontSize = 18;
        logoCharW = 11;
        logoCharH = 18;
      } else if (canvas.width < 1024) {
        logoFontSize = 28;
        logoCharW = 17;
        logoCharH = 28;
      }

      const logoPixelW = logoW * logoCharW;
      const logoPixelH = logoH * logoCharH;
      const logoPixelX = (canvas.width - logoPixelW) / 2;
      const logoPixelY = (canvas.height - logoPixelH) / 2 - 40;

      ctx.font = `bold ${logoFontSize}px monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#ffffff";

      // White hot core glow
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 10;

      for (let ly = 0; ly < logoH; ly++) {
        for (let lx = 0; lx < logoW; lx++) {
          if (doomLogo[ly][lx] !== " ") {
            const px = logoPixelX + lx * logoCharW;
            const py = logoPixelY + ly * logoCharH;
            ctx.fillText(doomLogo[ly][lx], px, py);
          }
        }
      }

      // Reset shadow blur to prevent leaking
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#020502] block pointer-events-none"
    />
  );
};

interface TronCanvasProps {
  onGameEnd: (winner: "orange" | "cyan" | "draw") => void;
}

// Tron Full-screen Neon Speedway Canvas Component
const TronCanvas = ({ onGameEnd }: TronCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellS = 16;
    let cols = 0;
    let rows = 0;
    let grid: boolean[][] = [];

    let orange = { x: 0, y: 0, dx: 1, dy: 0, trail: [{ x: 0, y: 0 }] };
    let cyan = { x: 0, y: 0, dx: -1, dy: 0, trail: [{ x: 0, y: 0 }] };
    let status: "running" | "crashed" = "running";
    let winner: "orange" | "cyan" | "draw" | null = null;
    let step = 0;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / cellS);
      rows = Math.floor(canvas.height / cellS);

      grid = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(false));

      orange = {
        x: 4,
        y: Math.floor(rows / 2),
        dx: 1,
        dy: 0,
        trail: [{ x: 4, y: Math.floor(rows / 2) }],
      };
      cyan = {
        x: cols - 5,
        y: Math.floor(rows / 2),
        dx: -1,
        dy: 0,
        trail: [{ x: cols - 5, y: Math.floor(rows / 2) }],
      };

      grid[orange.y][orange.x] = true;
      grid[cyan.y][cyan.x] = true;
      status = "running";
      winner = null;
      step = 0;
      particles = [];
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isOccupied = (x: number, y: number) => {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return true;
      return grid[y][x];
    };

    const drawGridLines = () => {
      ctx.strokeStyle = "rgba(51, 255, 102, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += cellS) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += cellS) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const spawnExplosion = (x: number, y: number, color: string) => {
      const px = x * cellS + cellS / 2;
      const py = y * cellS + cellS / 2;
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x: px,
          y: py,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1.0,
        });
      }
    };

    const tickGame = () => {
      if (status !== "running") return;

      step++;
      let orangeTurned = false;
      let whiteTurned = false;

      const nextOx = orange.x + orange.dx;
      const nextOy = orange.y + orange.dy;
      let orangeMustTurn = isOccupied(nextOx, nextOy);
      if (!orangeMustTurn && Math.random() < 0.08 && step > 6) {
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

      const nextCx = cyan.x + cyan.dx;
      const nextCy = cyan.y + cyan.dy;
      let cyanMustTurn = isOccupied(nextCx, nextCy);
      if (!cyanMustTurn && Math.random() < 0.08 && step > 6) {
        cyanMustTurn = true;
      }
      if (cyanMustTurn) {
        const ldx = -cyan.dy;
        const ldy = cyan.dx;
        const rdx = cyan.dy;
        const rdy = -cyan.dx;
        const leftFree = !isOccupied(cyan.x + ldx, cyan.y + ldy);
        const rightFree = !isOccupied(cyan.x + rdx, cyan.y + rdy);

        if (leftFree && rightFree) {
          if (Math.random() < 0.5) {
            cyan.dx = ldx;
            cyan.dy = ldy;
          } else {
            cyan.dx = rdx;
            cyan.dy = rdy;
          }
          whiteTurned = true;
        } else if (leftFree) {
          cyan.dx = ldx;
          cyan.dy = ldy;
          whiteTurned = true;
        } else if (rightFree) {
          cyan.dx = rdx;
          cyan.dy = rdy;
          whiteTurned = true;
        }
      }

      orange.x += orange.dx;
      orange.y += orange.dy;
      cyan.x += cyan.dx;
      cyan.y += cyan.dy;

      const orangeCrashed = isOccupied(orange.x, orange.y);
      const cyanCrashed = isOccupied(cyan.x, cyan.y);

      if (!orangeCrashed) {
        grid[orange.y][orange.x] = true;
        orange.trail.push({ x: orange.x, y: orange.y });
      }
      if (!cyanCrashed) {
        grid[cyan.y][cyan.x] = true;
        cyan.trail.push({ x: cyan.x, y: cyan.y });
      }

      if (orangeCrashed && cyanCrashed) {
        status = "crashed";
        winner = "draw";
        spawnExplosion(orange.x, orange.y, "#f97316");
        spawnExplosion(cyan.x, cyan.y, "#06b6d4");
        playTronCrashSound();
        onGameEnd("draw");
      } else if (orangeCrashed) {
        status = "crashed";
        winner = "cyan";
        spawnExplosion(orange.x, orange.y, "#f97316");
        playTronCrashSound();
        onGameEnd("cyan");
      } else if (cyanCrashed) {
        status = "crashed";
        winner = "orange";
        spawnExplosion(cyan.x, cyan.y, "#06b6d4");
        playTronCrashSound();
        onGameEnd("orange");
      } else {
        if (orangeTurned || whiteTurned) {
          playTronTurnSound();
        }

        const leadArp = [
          293.66, 349.23, 440.0, 587.33, 523.25, 587.33, 523.25, 440.0, 293.66,
          349.23, 440.0, 587.33, 523.25, 587.33, 523.25, 440.0, 349.23, 440.0,
          523.25, 698.46, 659.25, 698.46, 659.25, 523.25, 392.0, 466.16, 587.33,
          783.99, 698.46, 783.99, 698.46, 587.33,
        ];
        const bassLine = [
          73.42, 73.42, 73.42, 73.42, 73.42, 73.42, 73.42, 73.42, 87.31, 87.31,
          87.31, 87.31, 98.0, 98.0, 98.0, 98.0,
        ];
        const leadFreq = leadArp[step % leadArp.length];
        const bassFreq = bassLine[Math.floor(step / 2) % bassLine.length];

        playTronLead(leadFreq);
        if (step % 2 === 0) playTronBass(bassFreq);
      }
    };

    const draw = () => {
      ctx.fillStyle = "#020502";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (cols === 0 || rows === 0) return;

      drawGridLines();

      const drawTrail = (
        trail: { x: number; y: number }[],
        color: string,
        shadowColor: string,
      ) => {
        if (trail.length < 2) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(
          trail[0].x * cellS + cellS / 2,
          trail[0].y * cellS + cellS / 2,
        );
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(
            trail[i].x * cellS + cellS / 2,
            trail[i].y * cellS + cellS / 2,
          );
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
      };

      drawTrail(orange.trail, "#f97316", "rgba(249, 115, 22, 0.7)");
      drawTrail(cyan.trail, "#06b6d4", "rgba(6, 182, 212, 0.7)");

      const drawBike = (bike: typeof orange, color: string) => {
        const px = bike.x * cellS + cellS / 2;
        const py = bike.y * cellS + cellS / 2;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        if (bike.dx === 1) {
          ctx.moveTo(px + 6, py);
          ctx.lineTo(px - 6, py - 4);
          ctx.lineTo(px - 6, py + 4);
        } else if (bike.dx === -1) {
          ctx.moveTo(px - 6, py);
          ctx.lineTo(px + 6, py - 4);
          ctx.lineTo(px + 6, py + 4);
        } else if (bike.dy === 1) {
          ctx.moveTo(px, py + 6);
          ctx.lineTo(px - 4, py - 6);
          ctx.lineTo(px + 4, py - 6);
        } else {
          ctx.moveTo(px, py - 6);
          ctx.lineTo(px - 4, py + 6);
          ctx.lineTo(px + 4, py + 6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      if (status === "running") {
        drawBike(orange, "#f97316");
        drawBike(cyan, "#06b6d4");
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      if (status === "crashed") {
        ctx.font = "bold 40px monospace";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 15;
        ctx.fillText(
          "GRID COLLISION DETECTED",
          canvas.width / 2,
          canvas.height / 2 - 40,
        );

        ctx.font = "bold 24px monospace";
        if (winner === "draw") {
          ctx.fillStyle = "#a1a1aa";
          ctx.shadowColor = "rgba(161, 161, 170, 0.8)";
          ctx.fillText(
            "RESULT: DOUBLE IMPACT - DRAW",
            canvas.width / 2,
            canvas.height / 2 + 10,
          );
        } else if (winner === "orange") {
          ctx.fillStyle = "#f97316";
          ctx.shadowColor = "rgba(249, 115, 22, 0.8)";
          ctx.fillText(
            "RESULT: ORANGE LIGHT CYCLE WINS",
            canvas.width / 2,
            canvas.height / 2 + 10,
          );
        } else {
          ctx.fillStyle = "#06b6d4";
          ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
          ctx.fillText(
            "RESULT: CYAN LIGHT CYCLE WINS",
            canvas.width / 2,
            canvas.height / 2 + 10,
          );
        }
        ctx.shadowBlur = 0;
      }
    };

    const gameTimer = setInterval(tickGame, 45);
    const drawTimer = setInterval(draw, 33);

    return () => {
      clearInterval(gameTimer);
      clearInterval(drawTimer);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#020502] block pointer-events-none"
    />
  );
};

// Interactive Contact Form Component
interface ContactFormProps {
  t: TranslationSchema;
  lang: "es" | "en";
  onSubmitSuccess: () => void;
}

const TerminalContactForm = ({
  t,
  lang,
  onSubmitSuccess,
}: ContactFormProps) => {
  const [state, handleSubmit] = useForm("xeaqovqr");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (state.succeeded) {
      onSubmitSuccess();
    }
  }, [state.succeeded, onSubmitSuccess]);

  return (
    <div className="border border-[#33ff66]/30 bg-[#051105]/40 rounded-xl p-5 max-w-xl mx-auto my-6 font-mono text-[#33ff66]">
      <div className="text-[11px] uppercase tracking-wider text-[#33ff66]/70 border-b border-[#33ff66]/20 pb-2 mb-4 font-bold flex items-center gap-1.5">
        <span>❯</span>{" "}
        {lang === "es"
          ? "PROGRAMA DE CONTACTO (contact_manager.exe)"
          : "CONTACT APPLICATION (contact_manager.exe)"}
      </div>

      {state.succeeded ? (
        <div className="text-emerald-400 text-xs font-bold py-2 animate-pulse">
          {lang === "es"
            ? "✔ [ÉXITO] Tu transmisión fue enviada con éxito."
            : "✔ [SUCCESS] Transmission delivered successfully."}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-[10px] uppercase text-[#33ff66]/70 mb-1"
            >
              {t.contact_label_name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-[#33ff66]/30 focus:border-[#33ff66] rounded-md px-3 py-1.5 text-xs text-[#33ff66] placeholder-[#33ff66]/30 outline-none transition-colors font-mono"
              placeholder="e.g. Vault Tec Corp"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-red-400 text-[10px] mt-1 block"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-[10px] uppercase text-[#33ff66]/70 mb-1"
            >
              {t.contact_label_email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-[#33ff66]/30 focus:border-[#33ff66] rounded-md px-3 py-1.5 text-xs text-[#33ff66] placeholder-[#33ff66]/30 outline-none transition-colors font-mono"
              placeholder="e.g. wanderer@wasteland.org"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-red-400 text-[10px] mt-1 block"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-[10px] uppercase text-[#33ff66]/70 mb-1"
            >
              {t.contact_label_msg}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border border-[#33ff66]/30 focus:border-[#33ff66] rounded-md px-3 py-1.5 text-xs text-[#33ff66] placeholder-[#33ff66]/30 outline-none transition-colors resize-none font-mono"
              placeholder="..."
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-red-400 text-[10px] mt-1 block"
            />
          </div>

          {state.errors && (
            <div className="text-red-400 text-[10px] border border-red-500/30 bg-red-950/20 p-2 rounded-md">
              {lang === "es"
                ? "Error al enviar la transmisión. Por favor verifica los campos."
                : "Failed to send the transmission. Please check the fields."}
            </div>
          )}

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full border border-[#33ff66] hover:bg-[#33ff66]/10 active:bg-[#33ff66]/20 text-[#33ff66] text-xs font-bold py-2 rounded-md transition-all cursor-pointer font-mono"
          >
            {state.submitting
              ? lang === "es"
                ? "ENVIANDO TRANSMISIÓN..."
                : "SENDING TRANSMISSION..."
              : lang === "es"
                ? "[ ENVIAR TRANSMISIÓN ]"
                : "[ SEND TRANSMISSION ]"}
          </button>
        </form>
      )}
    </div>
  );
};

export default function Terminal({ t, lang, setLang }: TerminalProps) {
  const [history, setHistory] = useState<LogLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeLoop, setActiveLoop] = useState<
    "tron" | "top" | "install" | "matrix" | "doom" | null
  >(null);
  const [isBooting, setIsBooting] = useState(true);
  const [topStats, setTopStats] = useState({ cpu: 12, mem: 42 });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loopRef = useRef<NodeJS.Timeout | null>(null);
  const bootSequenceIdRef = useRef(0);

  // Append a line helper
  const appendLine = (text: string, className = "text-[#33ff66]") => {
    setHistory((prev) => [...prev, { text, className }]);
  };

  // Pre-load portfolio details text logs
  const appendPortfolioDetails = async (
    currentLang: "es" | "en",
    currentBootId: number,
  ) => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const activeTranslations =
      currentLang === "es" ? esTranslations : enTranslations;

    const sections: LogLine[] = [
      {
        text: `
========================================================================
 ❯ whoami
------------------------------------------------------------------------
 Nombre: Sergio Rodriguez (Pyrex64)
 Titulo: ${activeTranslations.hero_heading_white1} | ${activeTranslations.hero_heading_gradient}
 Ubicación: ${activeTranslations.contact_location}
 
 "${activeTranslations.hero_paragraph}"

 [Estadísticas del Sistema]
 • Docker Containers: 120+
 • Shell scripts: 45+
 • Postgres SQL: SQLite/Supabase/PostgreSQL
 • CI/CD Workflows: GitHub Actions
========================================================================
        `,
        className:
          "text-[#33ff66] font-mono whitespace-pre-wrap leading-relaxed",
      },
      {
        text: `
 ❯ cat projects.txt
------------------------------------------------------------------------
 ${activeTranslations.projects_subtitle}

 [01] NutriCalculadora (nutricalculadora.vercel.app)
 --------------------------------------------------
   Enfoque: ${activeTranslations.projects_nutri_focus_desc}
   Tecnologías: Next.js, React, Tailwind, Vercel
   Despliegue & Rendimiento(): {
     ${activeTranslations.projects_nutri_perf_desc}
   }

 [02] Dorologi Store (dorologistore.com)
 ---------------------------------------
   Enfoque: ${activeTranslations.projects_dorologi_focus_desc}
   Tecnologías: Next.js, Server Actions, Supabase, Tailwind
   Resultado E-Commerce(): {
     ${activeTranslations.projects_dorologi_perf_desc}
   }

 📦 Código Abierto (GitHub @ErPyrex):
   • rust-ffmpeg-cli -> Transcodificador multimedia en Rust
   • script-dev-setup-installer -> Instalador CLI en Bash para Linux
   • mc-server-creator -> Generador de servidores de Minecraft
   • mcp-packet-tracer-bundle -> Recursos MCP para Packet Tracer
========================================================================
        `,
        className:
          "text-[#33ff66] font-mono whitespace-pre-wrap leading-relaxed",
      },
      {
        text: `
 ❯ ls /bin/skills
------------------------------------------------------------------------
 [Linux & Servidores]
   - Linux OS (Sistema nativo diario)
   - Docker & Docker Compose
   - Bash Scripting
 
 [Desarrollo Web & Móvil]
   - Next.js & React
   - TypeScript & Tailwind CSS
   - Expo (React Native)
   - PostgreSQL & Supabase

 [AI & Productividad]
   - Integración activa de asistentes IA
   - GitHub Actions CI/CD pipelines
========================================================================
        `,
        className:
          "text-[#33ff66] font-mono whitespace-pre-wrap leading-relaxed",
      },
    ];

    for (const section of sections) {
      if (currentBootId !== bootSequenceIdRef.current) return;
      if (section.text) {
        const lines = section.text.split("\n");
        for (const line of lines) {
          if (currentBootId !== bootSequenceIdRef.current) return;
          setHistory((prev) => [
            ...prev,
            { text: line, className: section.className },
          ]);
          playKeyboardClick();
          await sleep(45);
        }
      }
      await sleep(350);
    }

    if (currentBootId !== bootSequenceIdRef.current) return;
    // Append visual contact form at the end
    setHistory((prev) => [...prev, { type: "form" }]);
  };

  // Run fast BIOS-like startup sequence
  const runBootSequence = async () => {
    const currentBootId = ++bootSequenceIdRef.current;
    setIsBooting(true);
    setHistory([]);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const bootLines = [
      { text: "PYREX OPERATIVE SYSTEM", className: "font-bold text-[#33ff66]" },
      {
        text: "COPYRIGHT 2026-2027 PYREX",
        className: "font-bold text-[#33ff66]",
      },
      { text: "-Server 76-", className: "font-bold text-[#33ff66]" },
      {
        text: "==========================================",
        className: "opacity-60 text-[#33ff66]",
      },
      {
        text: "BIOS Date: 08/25/76  Ver: 1.0.98",
        className: "opacity-70 text-[#33ff66]",
      },
      {
        text: "CPU: AMD Ryzen 5 Equivalent @ 3.6GHz",
        className: "opacity-70 text-[#33ff66]",
      },
      {
        text: "Memory Test: 512MB RAM OK",
        className: "opacity-70 text-[#33ff66]",
      },
      {
        text: "Loading sysadmin profile...",
        className: "opacity-80 text-[#33ff66]",
      },
      {
        text: "Initializing portfolio networks...",
        className: "opacity-80 text-[#33ff66]",
      },
      { text: "✔ System ready.", className: "text-emerald-400 font-bold" },
      { text: "", className: "" },
    ];

    for (const line of bootLines) {
      if (currentBootId !== bootSequenceIdRef.current) return;
      setHistory((prev) => [...prev, line]);
      playKeyboardClick();
      if (
        line.text.includes("Loading sysadmin") ||
        line.text.includes("Initializing portfolio")
      ) {
        await sleep(1000);
      } else if (line.text.includes("System ready")) {
        await sleep(600);
      } else {
        await sleep(250);
      }
    }

    if (currentBootId !== bootSequenceIdRef.current) return;
    await sleep(1000);
    setHistory([]);

    if (currentBootId !== bootSequenceIdRef.current) return;
    await appendPortfolioDetails(lang, currentBootId);

    if (currentBootId !== bootSequenceIdRef.current) return;
    setIsBooting(false);
  };

  // Trigger boot sequence on language switch or mount
  useEffect(() => {
    runBootSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Focus input automatically
  useEffect(() => {
    if (!isBooting && !activeLoop) {
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isBooting, activeLoop]);

  // Auto-scroll when screen output changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, activeLoop]);

  // Stop loops utility
  const stopActiveLoops = () => {
    if (loopRef.current) clearInterval(loopRef.current);
    setActiveLoop(null);
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 50);
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
    appendLine(
      "[2/4] Verifying Linux environment configurations…",
      "text-zinc-400",
    );
    await sleep(600);
    appendLine(
      "[3/4] Resolving Docker and PostgreSQL credentials…",
      "text-zinc-400",
    );
    await sleep(700);
    appendLine(
      "[4/4] Setting up GitHub Actions workflow hooks…",
      "text-zinc-400",
    );
    await sleep(500);
    appendLine("Compiling scripts…");
    await sleep(800);
    appendLine(
      "✔ Dev setup environment configured successfully!",
      "text-emerald-400 font-bold",
    );
    appendLine("Done. Ready to deploy.", "text-emerald-400");
    setActiveLoop(null);
  }

  const handleTronGameEnd = (winner: "orange" | "cyan" | "draw") => {
    if (winner === "draw") {
      appendLine(
        ">> COLLISION DETECTED! DOUBLE CYCLE IMPACT.",
        "text-red-500 font-bold animate-pulse",
      );
      appendLine(">> RESULT: DRAW", "text-zinc-400 font-bold");
    } else if (winner === "orange") {
      appendLine(
        ">> CYAN CYCLE CRASHED! CRITICAL IMPACT DETECTED.",
        "text-red-500 font-bold",
      );
      appendLine(
        ">> RESULT: ORANGE LIGHT CYCLE WINS THE MATCH!",
        "text-orange-500 font-bold animate-pulse",
      );
    } else {
      appendLine(
        ">> ORANGE CYCLE CRASHED! CRITICAL IMPACT DETECTED.",
        "text-red-500 font-bold",
      );
      appendLine(
        ">> RESULT: CYAN LIGHT CYCLE WINS THE MATCH!",
        "text-cyan-400 font-bold animate-pulse",
      );
    }
  };

  // Execute CLI Command
  function executeCommand(cmdText: string) {
    appendLine(
      `pyrex64@pyrex-terminal:~$ ${cmdText}`,
      "text-[#33ff66] font-bold",
    );
    const cmd = cmdText.toLowerCase().trim();

    switch (cmd) {
      case "help":
        appendLine(
          lang === "es"
            ? "Comandos disponibles: github, repos, projects, skills, ai, workflows, linux, rust, stack, deploy, contact, hire, neofetch, top, df, install, matrix, tron, doom, clear"
            : "Available commands: github, repos, projects, skills, ai, workflows, linux, rust, stack, deploy, contact, hire, neofetch, top, df, install, matrix, tron, doom, clear",
        );
        break;

      case "whoami":
      case "hero":
        appendLine(
          lang === "es"
            ? "Nombre: Sergio Rodriguez (Pyrex64)\nIngeniero en Informática | Linux Sysadmin & Web/Mobile Developer"
            : "Name: Sergio Rodriguez (Pyrex64)\nComputer Engineer | Linux Sysadmin & Web/Mobile Developer",
          "text-[#33ff66] whitespace-pre pl-4",
        );
        break;

      case "neofetch":
        appendLine(
          `
   /\\_/\\      pyrex64@pyrex-terminal
  ( o.o )     ----------------------
   > ^ <      OS: Pyrex Operative System v76
  /     \\     Host: Portfolio Terminal Framework
 |       |    Kernel: NextJS-AppRouter
  \\_____/     Uptime: 5 mins
              Shell: bash 5.2.26
              CPU: AMD Ryzen 5 Equivalent
              Memory: 512MB RAM
              IDE: Antigravity IDE
        `,
          "text-[#33ff66] font-mono whitespace-pre",
        );
        break;

      case "github":
      case "repos":
        appendLine(
          lang === "es"
            ? "📦 Repositorios destacados en GitHub (@ErPyrex):"
            : "📦 Featured GitHub Repos (@ErPyrex):",
          "text-[#33ff66] font-semibold",
        );
        appendLine(
          "  1. rust-ffmpeg-cli -> https://github.com/ErPyrex/rust-ffmpeg-cli",
        );
        appendLine(
          "  2. script-dev-setup-installer -> https://github.com/ErPyrex/script-dev-setup-installer",
        );
        appendLine(
          "  3. mc-server-creator -> https://github.com/ErPyrex/mc-server-creator",
        );
        appendLine(
          "  4. mcp-packet-tracer-bundle -> https://github.com/ErPyrex/mcp-packet-tracer-bundle",
        );
        appendLine(
          "  5. mlbb-video-resources -> https://github.com/ErPyrex/mlbb-video-resources",
        );
        break;

      case "projects":
        appendLine(
          lang === "es"
            ? "✦ Aplicaciones Web & Producción:"
            : "✦ Production Web Apps:",
          "text-[#33ff66] font-semibold",
        );
        appendLine(
          "   • NutriCalculadora -> https://nutricalculadora.vercel.app/",
        );
        appendLine("   • Dorologi Store -> https://www.dorologistore.com/");
        break;

      case "skills":
      case "stack":
        appendLine(
          "✦ Next.js, React, Expo (React Native), TypeScript, Tailwind CSS.",
        );
        appendLine(
          "✦ Linux (Primary OS), Docker, Bash Scripting, PostgreSQL, SQLite, Supabase.",
        );
        break;

      case "ai":
        appendLine(
          lang === "es"
            ? "🤖 Integración activa de asistentes AI (como Antigravity) para agilizar el diseño, prototipado e infraestructura de software."
            : "🤖 Active integration of AI assistants (like Antigravity) to streamline software design and prototyping.",
        );
        break;

      case "workflows":
      case "cicd":
        appendLine(
          "⚡ CI/CD: Automated pipelines via GitHub Actions, compiling tests, lint validations, and deploying seamlessly to Vercel.",
        );
        break;

      case "linux":
        appendLine(
          lang === "es"
            ? "✦ Linux es mi sistema de desarrollo diario nativo. Dominio de CLI, configuración de dotfiles y dockerización."
            : "✦ Linux is my native daily development system. Solid command of CLI, dotfiles management, and dockerization.",
        );
        break;

      case "rust":
        appendLine(
          "✦ rust-ffmpeg-cli: High-performance Rust CLI wrapper to transcode videos via FFmpeg bindings.",
        );
        break;

      case "deploy":
        appendLine(
          "✦ Deployment: Vercel Edge networks for serverless rendering.",
        );
        break;

      case "contact":
        // Append form again
        setHistory((prev) => [...prev, { type: "form" }]);
        break;

      case "hire":
        appendLine(
          lang === "es"
            ? "🚀 ¡Disponible para contratación inmediata! Escríbeme a sergioalarcon22986@gmail.com o rellena el formulario abajo."
            : "🚀 Available for immediate hire or project contracts! Contact me at sergioalarcon22986@gmail.com.",
        );
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

      case "matrix":
        setHistory([]);
        appendLine(
          "Running process: Matrix Digital Rain...",
          "text-emerald-400 font-bold",
        );
        setActiveLoop("matrix");
        break;

      case "tron":
        setHistory([]);
        appendLine(
          "GRID PROCESS: INITIALIZING LIGHT CYCLE GRID...",
          "text-cyan-400 font-bold",
        );
        appendLine(">> BIKE ORANGE vs BIKE CYAN", "text-orange-400 font-bold");
        appendLine(">> ENTERING SPEEDWAY LOOP...", "text-zinc-500 italic");
        setActiveLoop("tron");
        break;

      case "doom":
        setHistory([]);
        playDoomCinematic();
        appendLine(
          "*HEAVY METAL MUSIC PLAYS IN D-MINOR*",
          "text-red-500 italic",
        );
        appendLine("*E1M1: At Doom's Gate*", "text-red-500 font-bold");
        appendLine(
          "*SHOTGUN BLAST - CHUCK-CHUCK*",
          "text-red-600 font-extrabold animate-pulse",
        );
        setActiveLoop("doom");
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        appendLine(
          lang === "es"
            ? `Comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista.`
            : `Command not recognized: '${cmd}'. Type 'help' to show all commands.`,
          "text-red-400",
        );
    }
  }

  // Handle keystroke submissions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (activeLoop) {
      if (e.key === "q" || (e.ctrlKey && e.key === "c")) {
        stopActiveLoops();
        appendLine("^C", "text-red-400 font-bold");
        appendLine("");
      }
      return;
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
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
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

  // Listen for global key presses when a loop is active
  useEffect(() => {
    if (!activeLoop) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "q" ||
        e.key === "Q" ||
        (e.ctrlKey && e.key === "c") ||
        e.key === "Escape"
      ) {
        stopActiveLoops();
        appendLine("^C", "text-red-400 font-bold");
        appendLine("");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeLoop]);

  // Active loop runners (top, stats)
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

  const handleLanguageToggle = (newLang: "es" | "en") => {
    if (newLang === lang) return;
    if (setLang) setLang(newLang);
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden bg-[#020502]">
      {/* Full-screen Matrix Digital Rain Background */}
      {activeLoop === "matrix" && <MatrixRainCanvas />}
      {activeLoop === "doom" && <DoomFireCanvas />}
      {activeLoop === "tron" && <TronCanvas onGameEnd={handleTronGameEnd} />}

      {/* Top Status Bar & Language Switch */}
      <div className="flex items-center justify-between border-b border-[#33ff66]/25 bg-[#051105]/80 px-6 py-3.5 shrink-0 font-mono text-xs text-[#33ff66] select-none z-10">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-wider green-glow-text">
            PYREX SYSTEMS
          </span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="opacity-70 hidden sm:inline">
            PYREX OPERATIVE SYSTEM v76
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#33ff66]/50 uppercase tracking-widest hidden xs:inline">
            Lang:
          </span>
          <button
            onClick={() => handleLanguageToggle("es")}
            className={`px-2 py-0.5 border rounded transition-all cursor-pointer text-[10px] font-bold ${
              lang === "es"
                ? "bg-[#33ff66]/20 border-[#33ff66] text-[#33ff66] green-glow-text"
                : "border-transparent text-[#33ff66]/40 hover:text-[#33ff66]"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => handleLanguageToggle("en")}
            className={`px-2 py-0.5 border rounded transition-all cursor-pointer text-[10px] font-bold ${
              lang === "en"
                ? "bg-[#33ff66]/20 border-[#33ff66] text-[#33ff66] green-glow-text"
                : "border-transparent text-[#33ff66]/40 hover:text-[#33ff66]"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Terminal View Body */}
      <div
        ref={scrollContainerRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="flex-1 p-6 font-mono text-xs sm:text-sm overflow-y-auto text-[#33ff66] flex flex-col justify-between cursor-text relative z-10"
      >
        <div className="space-y-1.5 break-words w-full">
          {/* Output log */}
          {history.map((line, idx) => {
            if (line.type === "form") {
              return (
                <TerminalContactForm
                  key={idx}
                  t={t}
                  lang={lang}
                  onSubmitSuccess={() => {
                    appendLine(
                      "[SUCCESS] Message successfully delivered to Sergio Rodriguez.",
                      "text-emerald-400 font-bold",
                    );
                  }}
                />
              );
            }
            return (
              <div key={idx} className={line.className}>
                {line.text}
              </div>
            );
          })}

          {/* Top CPU stats loop overlay */}
          {activeLoop === "top" && (
            <div className="font-mono text-[#33ff66] pt-4 text-xs max-w-xl relative z-10">
              <div>Tasks: 95 total, 1 running, 94 sleeping</div>
              <div>%Cpu(s): {topStats.cpu}% us, 1.2% sy, 0.0% ni, 98.8% id</div>
              <div>MiB Mem: 16042.8 total, {topStats.mem}% used</div>
              <div className="mt-2 text-emerald-400 font-bold">
                PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND
              </div>
              <div>
                1042 pyrex64 20 0 310.4m 45.1m 12.3m R {topStats.cpu}.0 0.4
                0:04.12 next-dev
              </div>
              <div>
                {" "}
                911 pyrex64 20 0 42.2m 8.3m 2.1m S 0.0 0.1 0:00.04 bash
              </div>
              <div>
                1205 root 20 0 210.1m 12.5m 4.2m S 0.0 0.1 0:01.42 dockerd
              </div>
              <div className="text-[#33ff66]/50 text-[10px] mt-4 italic">
                {"// Press 'q' to quit monitor"}
              </div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input line prompt */}
        <div className="max-w-4xl w-full">
          {!activeLoop && !isBooting && (
            <div className="flex items-center gap-2 mt-6 pt-3 border-t border-[#33ff66]/20 shrink-0">
              <span className="text-[#33ff66] font-bold shrink-0">
                pyrex64@pyrex-terminal:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-[#33ff66] w-full font-mono text-xs focus:ring-0 p-0"
                placeholder={
                  lang === "es" ? "Escribe un comando..." : "Type a command..."
                }
                aria-label={
                  lang === "es"
                    ? "Línea de comandos de la terminal"
                    : "Terminal command line input"
                }
              />
            </div>
          )}

          {isBooting && (
            <div className="flex items-center gap-2 mt-6 pt-3 border-t border-[#33ff66]/20 shrink-0">
              <span className="text-[#33ff66]/60 font-mono text-xs animate-pulse">
                Loading system records...{" "}
                <span className="blink-cursor font-bold">▋</span>
              </span>
            </div>
          )}

          {activeLoop && (
            <div className="flex items-center gap-2 mt-6 pt-3 border-t border-[#33ff66]/20 shrink-0">
              <span className="text-red-400 font-bold text-xs animate-pulse">
                Running process: Press &apos;q&apos; or Escape to interrupt
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
