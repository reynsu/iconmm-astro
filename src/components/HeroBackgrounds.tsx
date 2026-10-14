"use client";
import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import WorldMap from "@/components/ui/world-map";

/**
 * PROTOTIPO · variantes de fondo para el hero de la home, conmutables con ?variant= en /.
 * Pregunta: ¿qué fondo debe tener el hero detrás de la bailarina y el titular?
 *
 * Ronda 2 (la ronda 1 —pauta, aurora, líneas, semitono, tipografía, topografía, tickets— se
 * descartó; queda guardada en la rama de prototipo). Se conserva E.
 *
 *  E · Videowall       — mosaico de pantallas apagadas; algunas parpadean en rojo y ámbar.
 *  I · Horarios        — panel de salidas en papel: filas de hora, destino y andén que suben despacio.
 *  J · Mapa de puntos  — mapa del mundo punteado con las rutas Palencia ↔ CDMX ↔ LATAM/Europa.
 *  K · Ondas de señal  — ondas sinusoidales de distinta frecuencia desplazándose, una en rojo.
 *  L · Papel rasgado   — capas de papel con bordes rasgados, collage con profundidad y parallax.
 *  M · Constelación    — red de nodos que derivan y se unen con líneas; el puntero se enlaza a la red.
 *
 * Ronda 3 · sólo gradientes CSS, sin elementos ni animación:
 *  N · Amanecer        — degradado vertical: papel → rubor cálido → papel, con un horizonte.
 *  O · Foco            — un único halo radial rojo detrás de la bailarina sobre papel limpio.
 *  P · Diagonal        — bandas diagonales de papel con una franja roja de cortes duros.
 *  Q · Rayos           — degradado cónico desde la bailarina: abanico de papel y papel tostado.
 *  R · Manchas         — tres halos estáticos (rojo, ámbar, tostado) a distintas alturas.
 */

export const HERO_VARIANTS = [
  { key: "E", name: "Videowall" },
  { key: "I", name: "Horarios" },
  { key: "J", name: "Mapa de puntos" },
  { key: "K", name: "Ondas de señal" },
  { key: "L", name: "Papel rasgado" },
  { key: "M", name: "Constelación" },
  { key: "N", name: "Amanecer · gradiente" },
  { key: "O", name: "Foco · gradiente" },
  { key: "P", name: "Diagonal · gradiente" },
  { key: "Q", name: "Rayos · gradiente" },
  { key: "R", name: "Manchas · gradiente" },
];

export function HeroBackground({ variant }: { variant: string }) {
  if (variant === "I") return <Timetable />;
  if (variant === "J") return <DotMap />;
  if (variant === "K") return <SignalWaves />;
  if (variant === "L") return <TornPaper />;
  if (variant === "M") return <Constellation />;
  if (variant in GRADIENTS) return <Gradient layers={GRADIENTS[variant]} />;
  return <Videowall />;
}

const FADE = "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]";

/* ───────────── utilidades ───────────── */

/** PRNG determinista para que las posiciones no cambien entre renders. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Desplazamiento suave de una capa según la posición del puntero dentro del hero. */
function useParallax(strength: number) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
      y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
    };
    host.addEventListener("pointermove", move);
    return () => host.removeEventListener("pointermove", move);
  }, [x, y, strength]);
  return { ref, x, y };
}

/* ───────────── E · Videowall ───────────── */

const WALL_COLS = 26;
const WALL_ROWS = 15;

function Videowall() {
  const cells = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: WALL_COLS * WALL_ROWS }, (_, i) => {
      const col = i % WALL_COLS;
      // más actividad hacia la derecha, donde está la bailarina
      const bias = col / WALL_COLS;
      const active = r() < 0.05 + bias * 0.12;
      const warm = r() < 0.3;
      return { active, warm, delay: r() * 9, dur: 4 + r() * 6 };
    });
  }, []);
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <div
        className="absolute inset-x-4 top-20 bottom-24 grid gap-[5px] md:inset-x-8"
        style={{ gridTemplateColumns: `repeat(${WALL_COLS}, 1fr)`, gridTemplateRows: `repeat(${WALL_ROWS}, 1fr)` }}
      >
        {cells.map((c, i) =>
          c.active ? (
            <motion.span
              key={i}
              className="rounded-[3px]"
              style={{ background: c.warm ? "rgb(242 169 59)" : "rgb(232 54 42)" }}
              initial={{ opacity: 0.04 }}
              animate={{ opacity: [0.04, 0.55, 0.12, 0.04] }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span key={i} className="rounded-[3px] bg-ink/[0.045]" />
          ),
        )}
      </div>
      {/* brillo de pantalla sobre la figura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_50%_at_72%_45%,rgb(232_54_42/0.10),transparent_70%)]" />
      <p className="eyebrow absolute bottom-28 left-8 hidden text-[10px] text-ink/35 lg:block">
        {WALL_COLS}×{WALL_ROWS} · 390 pantallas · DENEVA
      </p>
    </div>
  );
}

/* ───────────── I · Horarios ───────────── */

const DESTINATIONS = ["Madrid", "Berlín", "Plymouth", "Ciudad de México", "Santiago de Chile", "Medellín", "Valladolid", "París", "Lisboa", "Bogotá", "Monterrey", "Barcelona"];
const STATUS = ["En hora", "En hora", "En hora", "Embarcando", "Retraso 5'", "En hora", "Última llamada"];

function Timetable() {
  const rows = useMemo(() => {
    const r = rng(11);
    let h = 5;
    let m = 40;
    return Array.from({ length: 22 }, (_, i) => {
      m += 7 + ((r() * 18) | 0);
      if (m >= 60) {
        m -= 60;
        h = (h + 1) % 24;
      }
      const status = STATUS[(r() * STATUS.length) | 0];
      return {
        i,
        time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        dest: DESTINATIONS[(r() * DESTINATIONS.length) | 0],
        track: 1 + ((r() * 14) | 0),
        code: `IC${1000 + ((r() * 900) | 0)}`,
        status,
        hot: status === "Embarcando" || status === "Última llamada",
      };
    });
  }, []);

  const list = (
    <ul className="w-full">
      {rows.map((row) => (
        <li
          key={row.i}
          className={`grid grid-cols-[4rem_5rem_1fr_3rem_7rem] items-center gap-6 border-b border-ink/10 py-3 font-mono text-[11px] tracking-[0.16em] uppercase ${
            row.hot ? "text-signal" : "text-ink/45"
          }`}
        >
          <span>{row.time}</span>
          <span className="text-ink/30">{row.code}</span>
          <span className="truncate">{row.dest}</span>
          <span className="text-right">{row.track}</span>
          <span className="flex items-center gap-2">
            {row.hot && <span className="size-1.5 animate-pulse rounded-full bg-signal" />}
            {row.status}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <div className="absolute inset-y-0 right-0 left-[38%] [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:left-[42%]">
        <div className="sticky top-0 z-10 grid grid-cols-[4rem_5rem_1fr_3rem_7rem] gap-6 border-b border-ink/30 bg-paper pt-24 pb-2 font-mono text-[10px] tracking-[0.2em] text-ink/60 uppercase">
          <span>Salida</span>
          <span>Tren</span>
          <span>Destino</span>
          <span className="text-right">Vía</span>
          <span>Estado</span>
        </div>
        <motion.div animate={{ y: ["0%", "-50%"] }} transition={{ duration: 70, ease: "linear", repeat: Infinity }}>
          {list}
          {list}
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────── J · Mapa de puntos ───────────── */

const PAL = { lat: 42.01, lng: -4.53, label: "Palencia" };
const CDMX = { lat: 19.36, lng: -99.26, label: "Ciudad de México" };
const ROUTES = [
  { start: PAL, end: CDMX },
  { start: PAL, end: { lat: 52.52, lng: 13.4, label: "Berlín" } },
  { start: PAL, end: { lat: 50.37, lng: -4.14, label: "Plymouth" } },
  { start: PAL, end: { lat: 40.42, lng: -3.7, label: "Madrid" } },
  { start: CDMX, end: { lat: -33.45, lng: -70.66, label: "Santiago de Chile" } },
  { start: CDMX, end: { lat: 6.24, lng: -75.58, label: "Medellín" } },
];

function DotMap() {
  const { ref, x, y } = useParallax(-18);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <motion.div
        className="absolute top-1/2 left-[8%] w-[115%] -translate-y-1/2 opacity-80 [mask-image:linear-gradient(to_right,transparent,black_30%,black_85%,transparent)] lg:left-[18%] lg:w-[100%]"
        style={{ x, y }}
      >
        <WorldMap dots={ROUTES} lineColor="#e8362a" dotColor="#14141833" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_18%_50%,rgb(244_241_234/0.95),transparent_70%)]" />
      <p className="eyebrow absolute bottom-28 left-8 hidden text-[10px] text-ink/35 lg:block">2 sedes · 6 rutas · 3 regiones</p>
    </div>
  );
}

/* ───────────── K · Ondas de señal ───────────── */

const W = 1440;
const H = 800;

function wavePath(amp: number, len: number, yOff: number, phase: number) {
  // una longitud de onda más allá del ancho para que el bucle sea continuo
  const pts: string[] = [];
  for (let x = 0; x <= W + len; x += 12) {
    const y = yOff + Math.sin(((x + phase) / len) * Math.PI * 2) * amp;
    pts.push(`${x === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function SignalWaves() {
  const waves = useMemo(
    () => [
      { amp: 26, len: 520, y: 150, speed: 34, color: "rgb(20 20 24 / 0.10)", w: 1 },
      { amp: 40, len: 760, y: 260, speed: 48, color: "rgb(20 20 24 / 0.12)", w: 1 },
      { amp: 18, len: 380, y: 340, speed: 26, color: "rgb(20 20 24 / 0.08)", w: 1 },
      { amp: 54, len: 940, y: 430, speed: 60, color: "rgb(232 54 42 / 0.55)", w: 1.4 },
      { amp: 30, len: 620, y: 520, speed: 40, color: "rgb(242 169 59 / 0.45)", w: 1 },
      { amp: 22, len: 460, y: 610, speed: 30, color: "rgb(20 20 24 / 0.10)", w: 1 },
      { amp: 44, len: 840, y: 700, speed: 54, color: "rgb(20 20 24 / 0.09)", w: 1 },
    ],
    [],
  );
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {waves.map((wv, i) => (
          <motion.path
            key={i}
            d={wavePath(wv.amp, wv.len, wv.y, i * 90)}
            fill="none"
            stroke={wv.color}
            strokeWidth={wv.w}
            vectorEffect="non-scaling-stroke"
            animate={{ x: [0, -wv.len] }}
            transition={{ duration: wv.speed, ease: "linear", repeat: Infinity }}
          />
        ))}
      </svg>
      {/* el texto queda sobre papel limpio */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_55%_at_18%_50%,rgb(244_241_234/0.9),transparent_70%)]" />
      <p className="eyebrow absolute bottom-28 left-8 hidden text-[10px] text-ink/35 lg:block">Señal · 24/7/365 · sin cortes</p>
    </div>
  );
}

/* ───────────── L · Papel rasgado ───────────── */

function tornEdge(r: () => number, fromTop: boolean, roughness: number) {
  // polígono con un borde rasgado (arriba o abajo) y los otros tres rectos
  const pts: string[] = [];
  const n = 26;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * 100;
    const jitter = (r() - 0.5) * roughness;
    pts.push(`${x.toFixed(1)}% ${(fromTop ? jitter : 100 + jitter).toFixed(1)}%`);
  }
  return fromTop ? `polygon(${pts.join(",")}, 100% 100%, 0% 100%)` : `polygon(0% 0%, 100% 0%, ${pts.reverse().join(",")})`;
}

function TornPaper() {
  const { ref, x, y } = useParallax(-26);
  const x2 = useTransform(x, (v) => v * 0.5);
  const y2 = useTransform(y, (v) => v * 0.5);
  const x3 = useTransform(x, (v) => v * 1.6);
  const y3 = useTransform(y, (v) => v * 1.6);
  const layers = useMemo(() => {
    const r = rng(23);
    return {
      top: tornEdge(r, false, 7),
      bottom: tornEdge(r, true, 9),
      strip: tornEdge(r, true, 14),
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      {/* hoja de atrás: tono más oscuro, baja desde arriba */}
      <motion.div
        className="absolute -inset-x-6 top-[-4%] h-[48%] bg-paper-3 drop-shadow-[0_14px_18px_rgba(20,20,24,0.10)]"
        style={{ x: x2, y: y2, clipPath: layers.top, rotate: -1.2 }}
      />
      {/* hoja blanca que sube desde abajo */}
      <motion.div
        className="absolute -inset-x-6 bottom-[-6%] h-[56%] bg-white/80 drop-shadow-[0_-10px_16px_rgba(20,20,24,0.08)]"
        style={{ x, y, clipPath: layers.bottom, rotate: 1.4 }}
      />
      {/* tira roja rasgada, estrecha, cruzando detrás de la figura */}
      <motion.div
        className="absolute -inset-x-10 top-[46%] h-[9%] bg-signal/90 drop-shadow-[0_10px_14px_rgba(181,35,26,0.25)]"
        style={{ x: x3, y: y3, clipPath: layers.strip, rotate: -2.5 }}
      />
      {/* grano para que todas parezcan papel */}
      <div className="grain absolute inset-0 opacity-40 mix-blend-multiply" />
      {/* el texto queda sobre papel limpio */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_60%_at_18%_50%,rgb(244_241_234/0.9),transparent_70%)]" />
    </div>
  );
}

/* ───────────── M · Constelación ───────────── */

function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const r = rng(5);
    const N = 90;
    const LINK = 130;
    const nodes = Array.from({ length: N }, () => ({
      x: r(),
      y: r(),
      vx: (r() - 0.5) * 0.00018,
      vy: (r() - 0.5) * 0.00018,
      red: r() < 0.12,
      s: 1.2 + r() * 1.8,
    }));
    const pointer = { x: -1, y: -1 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
    };
    const leave = () => {
      pointer.x = -1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        const ax = a.x * w;
        const ay = a.y * h;
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = ax - b.x * w;
          const dy = ay - b.y * h;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const t = 1 - d / LINK;
          ctx.strokeStyle = a.red || b.red ? `rgba(232,54,42,${0.45 * t})` : `rgba(20,20,24,${0.18 * t})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
        if (pointer.x >= 0) {
          const d = Math.hypot(ax - pointer.x, ay - pointer.y);
          if (d < LINK * 1.6) {
            ctx.strokeStyle = `rgba(232,54,42,${0.5 * (1 - d / (LINK * 1.6))})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.red ? "rgba(232,54,42,0.9)" : "rgba(20,20,24,0.45)";
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.s, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const vis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", vis);
    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_55%_at_18%_50%,rgb(244_241_234/0.85),transparent_70%)]" />
      <p className="eyebrow absolute bottom-28 left-8 hidden text-[10px] text-ink/35 lg:block">Una pantalla o miles · una sola plataforma</p>
    </div>
  );
}

/* ───────────── N–R · sólo gradientes ───────────── */

const GRADIENTS: Record<string, string> = {
  // N · Amanecer: del papel a un rubor cálido y de vuelta al papel, con un horizonte más claro
  N: [
    "linear-gradient(to bottom, #f4f1ea 0%, #f1dcd3 38%, #f7e6d2 52%, #f4f1ea 78%)",
    "linear-gradient(to bottom, transparent 49.5%, rgb(255 255 255 / 0.7) 50%, transparent 50.5%)",
  ].join(","),
  // O · Foco: un halo rojo tras la bailarina y nada más
  O: [
    "radial-gradient(ellipse 42% 60% at 72% 42%, rgb(232 54 42 / 0.34), rgb(232 54 42 / 0.10) 45%, transparent 72%)",
    "radial-gradient(ellipse 30% 40% at 78% 36%, rgb(242 169 59 / 0.22), transparent 70%)",
  ].join(","),
  // P · Diagonal: bandas de papel a 135° y una franja roja con cortes duros
  P: [
    "linear-gradient(135deg, transparent 0 54%, rgb(232 54 42 / 0.85) 54% 57.5%, transparent 57.5%)",
    "linear-gradient(135deg, #f4f1ea 0 20%, #ebe7de 20% 45%, #f4f1ea 45% 62%, #ded9cc 62% 80%, #f4f1ea 80%)",
  ].join(","),
  // Q · Rayos: abanico cónico desde la bailarina, como luz de proyector
  Q: [
    "radial-gradient(circle at 72% 44%, rgb(232 54 42 / 0.25), transparent 28%)",
    "repeating-conic-gradient(from 200deg at 72% 44%, #f4f1ea 0deg 9deg, #ebe7de 9deg 14deg, #f4f1ea 14deg 18deg, #e6e1d4 18deg 24deg)",
  ].join(","),
  // R · Manchas: tres halos estáticos repartidos, sin animación
  R: [
    "radial-gradient(circle 420px at 82% 18%, rgb(232 54 42 / 0.30), transparent)",
    "radial-gradient(circle 380px at 12% 78%, rgb(242 169 59 / 0.32), transparent)",
    "radial-gradient(circle 520px at 48% 60%, rgb(222 217 204 / 0.9), transparent)",
  ].join(","),
};

function Gradient({ layers }: { layers: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${FADE}`} style={{ backgroundImage: layers }} />;
}
