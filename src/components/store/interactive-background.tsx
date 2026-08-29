"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  twinkle: number;
  speed: number;
};

type Spark = {
  x: number;
  y: number;
  life: number;
  max: number;
  r: number;
};

const GOLD = { r: 180, g: 140, b: 70 };
const CREAM = { r: 255, g: 252, b: 246 };

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.35, active: false });
  const reduced = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    reduced.current = prefersReducedMotion();
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: Particle[] = [];
    const sparks: Spark[] = [];
    let t = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.floor((w * h) / 14000));
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 0.7 + Math.random() * 2.8,
          a: 0.3 + Math.random() * 0.55,
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.03,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / Math.max(w, 1);
      mouse.current.y = e.clientY / Math.max(h, 1);
      mouse.current.active = true;

      if (reduced.current) return;
      if (sparks.length < 48 && Math.random() > 0.45) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 18,
          y: e.clientY + (Math.random() - 0.5) * 18,
          life: 0,
          max: 26 + Math.random() * 28,
          r: 1.2 + Math.random() * 2.8,
        });
      }
    };

    const onLeave = () => {
      mouse.current.active = false;
    };

    const paintBase = () => {
      // cream field
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#fffaf3");
      base.addColorStop(0.45, "#f5efe4");
      base.addColorStop(1, "#efe6d6");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // diagonal gold wash
      const wash = ctx.createLinearGradient(0, 0, w * 0.85, h);
      wash.addColorStop(0, "rgba(212,175,95,0.18)");
      wash.addColorStop(0.5, "rgba(255,255,255,0)");
      wash.addColorStop(1, "rgba(166,124,55,0.12)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      // drifting soft orbs
      for (let i = 0; i < 4; i++) {
        const ox = w * (0.15 + i * 0.22) + Math.sin(t * 0.00035 + i * 1.3) * 55;
        const oy = h * (0.2 + (i % 2) * 0.4) + Math.cos(t * 0.0003 + i * 0.9) * 40;
        const orb = ctx.createRadialGradient(ox, oy, 0, ox, oy, 200 + i * 50);
        orb.addColorStop(0, `rgba(255,240,210,${0.35 - i * 0.04})`);
        orb.addColorStop(0.55, `rgba(212,175,95,${0.1 - i * 0.015})`);
        orb.addColorStop(1, "rgba(212,175,95,0)");
        ctx.fillStyle = orb;
        ctx.beginPath();
        ctx.arc(ox, oy, 240 + i * 40, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCursorAura = () => {
      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(w, h) * 0.38);
      g.addColorStop(0, "rgba(212,175,95,0.28)");
      g.addColorStop(0.35, "rgba(212,175,95,0.08)");
      g.addColorStop(1, "rgba(212,175,95,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawParticles = () => {
      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = mouse.current.active ? Math.min(0.05, 32 / dist) : 0.01;

        p.vx += (dx / dist) * pull * 0.18;
        p.vy += (dy / dist) * pull * 0.18;
        p.vx *= 0.978;
        p.vy *= 0.978;
        p.x += p.vx + Math.sin(t * p.speed + p.twinkle) * 0.18;
        p.y += p.vy + Math.cos(t * p.speed * 0.85 + p.twinkle) * 0.14;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const tw = 0.5 + 0.5 * Math.sin(t * 0.0045 + p.twinkle);
        const alpha = p.a * tw;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        glow.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`);
        glow.addColorStop(0.35, `rgba(${CREAM.r},${CREAM.g},${CREAM.b},${alpha * 0.55})`);
        glow.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.current.active) {
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          const d = Math.hypot(a.x - mx, a.y - my);
          if (d > 150) continue;
          ctx.strokeStyle = `rgba(110,84,36,${(1 - d / 150) * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    };

    const drawSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        const p = 1 - s.life / s.max;
        if (p <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const g = ctx.createRadialGradient(s.x, s.y - s.life * 0.45, 0, s.x, s.y - s.life * 0.45, s.r * 3);
        g.addColorStop(0, `rgba(255,236,180,${p * 0.9})`);
        g.addColorStop(1, `rgba(212,175,95,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y - s.life * 0.45, s.r * 3 * p, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      t = now;
      paintBase();
      drawCursorAura();
      if (!reduced.current) {
        drawParticles();
        drawSparks();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/35" />
    </div>
  );
}
