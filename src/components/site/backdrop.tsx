"use client";

import { useEffect, useRef } from "react";

/**
 * Night sky behind the frame: stars twinkling at their own speeds, with a
 * shooting star crossing one of the gutters every few seconds. The frame is
 * opaque, so the sky only shows beside it, echoing the night skyline in the
 * footer.
 *
 * Plain 2D canvas, no React state: everything lives in one effect and one
 * rAF loop. Paused while the tab is hidden; reduced motion gets still stars
 * and no shooting stars.
 */

/* Seeded so the star field is the same on every visit and after resizes. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; a: number; speed: number; phase: number };
type Meteor = { x: number; y: number; vx: number; vy: number; born: number };

const METEOR_LIFE = 1.1; // seconds
const TAIL = 0.35; // tail length, in seconds of travel

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const wide = window.matchMedia("(min-width: 48rem)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    let w = 0;
    let h = 0;
    let color = "0 0% 98%";
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = 2;
    let frame = 0;
    let running = false;

    const readColor = () => {
      color = getComputedStyle(root).getPropertyValue("--foreground").trim() || color;
    };

    const gutters = () => {
      const frameW = parseFloat(getComputedStyle(root).getPropertyValue("--frame-width")) * 16 || 768;
      const left = Math.max(0, (w - frameW) / 2);
      return { left, right: w - left };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = seeded(7);
      stars = Array.from({ length: Math.round((w * h) / 3200) }, () => ({
        x: rand(),
        y: rand(),
        r: 0.35 + rand() ** 3 * 1.4,
        a: 0.2 + rand() * 0.6,
        speed: 0.4 + rand() * 1.6,
        phase: rand() * Math.PI * 2,
      }));
    };

    const draw = (t: number, withMeteors: boolean) => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const twinkle = withMeteors ? 0.5 + 0.5 * Math.sin(t * s.speed + s.phase) : 0.75;
        ctx.fillStyle = `hsl(${color} / ${s.a * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!withMeteors) return;

      if (!meteor && t > nextMeteor) {
        const { left, right } = gutters();
        const fromLeft = Math.random() < 0.5;
        meteor = {
          x: fromLeft ? Math.random() * left * 0.7 : right + Math.random() * (w - right) * 0.5,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * (220 + Math.random() * 120),
          vy: 140 + Math.random() * 80,
          born: t,
        };
        nextMeteor = t + 3 + Math.random() * 4;
      }

      if (meteor) {
        const life = t - meteor.born;
        const hx = meteor.x + meteor.vx * life;
        const hy = meteor.y + meteor.vy * life;
        const tx = hx - meteor.vx * TAIL;
        const ty = hy - meteor.vy * TAIL;
        const fade = Math.max(0, 1 - life / METEOR_LIFE);
        const tail = ctx.createLinearGradient(hx, hy, tx, ty);
        tail.addColorStop(0, `hsl(${color} / ${0.9 * fade})`);
        tail.addColorStop(1, `hsl(${color} / 0)`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        if (life > METEOR_LIFE) meteor = null;
      }
    };

    const loop = (now: number) => {
      draw(now / 1000, true);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const start = () => {
      stop();
      if (!wide.matches) {
        ctx.clearRect(0, 0, w, h);
        return;
      }
      resize();
      readColor();
      if (still.matches || document.hidden) {
        draw(0, false);
        return;
      }
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!running) start();
    };

    // The theme toggle flips the `dark` class on <html>; re-read the star color.
    const themeObserver = new MutationObserver(() => {
      readColor();
      if (!running && wide.matches) draw(0, false);
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    start();
    window.addEventListener("resize", start);
    document.addEventListener("visibilitychange", onVisibility);
    wide.addEventListener("change", start);
    still.addEventListener("change", start);

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", start);
      document.removeEventListener("visibilitychange", onVisibility);
      wide.removeEventListener("change", start);
      still.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden h-full w-full md:block"
    />
  );
}
