"use client";
import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { BackgroundLines } from "@/components/ui/background-lines";

/**
 * PROTOTIPO · variantes de fondo para el hero de la home, conmutables con ?variant=0|A|B|C en /.
 * Pregunta: ¿qué fondo debe tener el hero detrás de la bailarina y el titular?
 *
 *  0 · Actual          — HeroHighlight: trama de puntos que se tiñe de rojo bajo el puntero.
 *  A · Pauta de papel  — rejilla técnica tipo horario de estación, margen rojo, marcas de corte
 *                        y una línea de barrido que recorre la sección; el puntero enciende la rejilla.
 *  B · Aurora cálida   — manchas de luz rojo/ámbar/papel que derivan lentamente, sin trama.
 *  C · Líneas de ruta  — trazos animados de Aceternity (BackgroundLines) irradiando desde la bailarina.
 *  D · Semitono        — trama de impresión offset: puntos de tinta que crecen hacia la bailarina.
 *  E · Videowall       — mosaico de pantallas apagadas; algunas parpadean en rojo y ámbar.
 *  F · Tipografía      — dos marquesinas de texto gigante en contorno, arriba y abajo, en sentidos opuestos.
 *  G · Topografía      — curvas de nivel concéntricas, como un plano, que respiran lentamente.
 *  H · Tickets         — fragmentos de ticket a la deriva, con parallax al mover el puntero.
 */

export const HERO_VARIANTS = [
  { key: "0", name: "Actual · puntos" },
  { key: "A", name: "Pauta de papel" },
  { key: "B", name: "Aurora cálida" },
  { key: "C", name: "Líneas de ruta" },
  { key: "D", name: "Semitono" },
  { key: "E", name: "Videowall" },
  { key: "F", name: "Tipografía" },
  { key: "G", name: "Topografía" },
  { key: "H", name: "Tickets a la deriva" },
];

export function HeroBackground({ variant }: { variant: string }) {
  if (variant === "A") return <PaperGrid />;
  if (variant === "B") return <WarmAurora />;
  if (variant === "C") return <RouteLines />;
  if (variant === "D") return <Halftone />;
  if (variant === "E") return <Videowall />;
  if (variant === "F") return <Typography />;
  if (variant === "G") return <Topography />;
  if (variant === "H") return <DriftingTickets />;
  return null;
}

const FADE = "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]";

/* ───────────── A · Pauta de papel ───────────── */

function PaperGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    const leave = () => {
      mx.set(-1000);
      my.set(-1000);
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [mx, my]);

  const mask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, black 0%, transparent 100%)`;
  const grid = (color: string) =>
    `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${FADE}`}>
      {/* rejilla base */}
      <div className="absolute inset-0 bg-[size:56px_56px]" style={{ backgroundImage: grid("rgb(20 20 24 / 0.07)") }} />
      {/* rejilla roja bajo el puntero */}
      <motion.div
        className="absolute inset-0 bg-[size:56px_56px]"
        style={{ backgroundImage: grid("rgb(232 54 42 / 0.55)"), WebkitMaskImage: mask, maskImage: mask }}
      />
      {/* margen de cuaderno */}
      <div className="absolute inset-y-0 left-[max(1rem,calc(50%-40rem))] w-px bg-signal/50" />
      <div className="absolute inset-y-0 left-[max(1.25rem,calc(50%-39.75rem))] w-px bg-signal/25" />
      {/* marcas de corte */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-24 left-6 border-b border-l",
        "bottom-24 right-6 border-b border-r",
      ].map((c) => (
        <span key={c} className={`absolute size-4 border-ink/40 ${c}`} />
      ))}
      {/* línea de barrido */}
      <motion.div
        className="absolute inset-x-0 h-px bg-[linear-gradient(to_right,transparent,rgb(232_54_42/0.7)_30%,rgb(232_54_42/0.7)_70%,transparent)]"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-x-0 h-24 bg-[linear-gradient(to_top,rgb(232_54_42/0.08),transparent)]"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
        style={{ translateY: "-100%" }}
      />
      {/* lectura de coordenadas, puro detalle */}
      <p className="eyebrow absolute right-8 bottom-28 hidden text-[10px] text-ink/35 lg:block">42.01° N · 4.53° O · Palencia</p>
    </div>
  );
}

/* ───────────── B · Aurora cálida ───────────── */

function WarmAurora() {
  const blobs = [
    { c: "rgb(232 54 42 / 0.38)", s: 720, x: ["55%", "70%", "50%"], y: ["-20%", "10%", "-10%"], d: 26 },
    { c: "rgb(242 169 59 / 0.45)", s: 560, x: ["5%", "25%", "0%"], y: ["40%", "20%", "55%"], d: 31 },
    { c: "rgb(214 205 185 / 0.95)", s: 640, x: ["30%", "45%", "25%"], y: ["50%", "70%", "45%"], d: 37 },
    { c: "rgb(181 35 26 / 0.26)", s: 480, x: ["75%", "60%", "80%"], y: ["55%", "35%", "60%"], d: 29 },
  ];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[110px]"
          style={{ width: b.s, height: b.s, background: b.c, marginLeft: -b.s / 2, marginTop: -b.s / 2 }}
          initial={{ left: b.x[0], top: b.y[0] }}
          animate={{ left: b.x, top: b.y }}
          transition={{ duration: b.d, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      ))}
      {/* viñeta que devuelve el papel a los bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent,rgb(244_241_234/0.85))]" />
      {/* grano fuerte para que la luz parezca impresa */}
      <div className="grain absolute inset-0 opacity-50 mix-blend-multiply" />
    </div>
  );
}

/* ───────────── C · Líneas de ruta ───────────── */

function RouteLines() {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      {/* el centro del SVG (720,450) cae sobre la bailarina: desplazamos el lienzo a la derecha */}
      <div className="absolute top-[-10%] left-[10%] h-[120%] w-[120%] lg:left-[25%]">
        <BackgroundLines className="absolute inset-0 h-full w-full" svgOptions={{ duration: 7 }}>
          <span />
        </BackgroundLines>
        <BackgroundLines className="absolute inset-0 h-full w-full" svgOptions={{ duration: 11 }}>
          <span />
        </BackgroundLines>
      </div>
      {/* anillos de alcance, como un radar de señal */}
      <div className="absolute top-1/2 left-[72%] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        {[520, 820, 1120].map((d, i) => (
          <motion.span
            key={d}
            className="absolute top-1/2 left-1/2 rounded-full border border-ink/25"
            style={{ width: d, height: d, marginLeft: -d / 2, marginTop: -d / 2 }}
            initial={{ opacity: 0.8, scale: 0.96 }}
            animate={{ opacity: [0.8, 0.35, 0.8], scale: [0.96, 1.02, 0.96] }}
            transition={{ duration: 8 + i * 2, ease: "easeInOut", repeat: Infinity }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_72%_50%,transparent,rgb(244_241_234/0.5))]" />
      {/* anillo exterior discontinuo que gira */}
      <motion.span
        className="absolute top-1/2 left-[72%] hidden size-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-signal/40 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}

/* ───────────── utilidades ───────────── */

/** PRNG determinista para que las posiciones no cambien entre renders. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Desplazamiento suave de un capa según la posición del puntero dentro del hero. */
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

/* ───────────── D · Semitono ───────────── */

function Halftone() {
  const { ref, x, y } = useParallax(-24);
  const dots = (color: string, r: number) => `radial-gradient(circle, ${color} ${r}px, transparent ${r + 0.4}px)`;
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <motion.div className="absolute -inset-10" style={{ x, y }}>
        {/* puntos finos por toda la hoja */}
        <div className="absolute inset-0 bg-[size:12px_12px]" style={{ backgroundImage: dots("rgb(20 20 24 / 0.16)", 0.9) }} />
        {/* puntos medios que crecen hacia la bailarina */}
        <div
          className="absolute inset-0 bg-[size:12px_12px] [mask-image:radial-gradient(ellipse_60%_75%_at_72%_45%,black,transparent_72%)]"
          style={{ backgroundImage: dots("rgb(20 20 24 / 0.32)", 2) }}
        />
        {/* puntos gruesos de tinta roja, sólo cerca de la figura */}
        <div
          className="absolute inset-0 bg-[size:12px_12px] bg-[position:6px_6px] [mask-image:radial-gradient(ellipse_38%_55%_at_74%_42%,black,transparent_70%)]"
          style={{ backgroundImage: dots("rgb(232 54 42 / 0.5)", 3.1) }}
        />
        {/* mancha de registro desplazada, como una impresión a dos tintas */}
        <div
          className="absolute inset-0 bg-[size:12px_12px] bg-[position:9px_3px] [mask-image:radial-gradient(ellipse_30%_45%_at_70%_48%,black,transparent_70%)]"
          style={{ backgroundImage: dots("rgb(242 169 59 / 0.45)", 2.6) }}
        />
      </motion.div>
      <p className="eyebrow absolute bottom-28 left-8 hidden text-[10px] text-ink/35 lg:block">CMYK · 85 lpi · papel 120 g</p>
    </div>
  );
}

/* ───────────── E · Videowall ───────────── */

const WALL_COLS = 26;
const WALL_ROWS = 15;

function Videowall() {
  const cells = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: WALL_COLS * WALL_ROWS }, (_, i) => {
      const col = i % WALL_COLS;
      const row = (i / WALL_COLS) | 0;
      // más actividad hacia la derecha, donde está la bailarina
      const bias = col / WALL_COLS;
      const active = r() < 0.05 + bias * 0.12;
      const warm = r() < 0.3;
      return { active, warm, delay: r() * 9, dur: 4 + r() * 6, row };
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

/* ───────────── F · Tipografía ───────────── */

const LINE_TOP = "ENABLING A SMART FUTURE · DIGITAL SIGNAGE · DENEVA · ";
const LINE_BOTTOM = "PALENCIA · CIUDAD DE MÉXICO · DESDE 1995 · UNA PANTALLA O MILES · ";

function Marquee({ text, reverse, className }: { text: string; reverse?: boolean; className?: string }) {
  return (
    <div className={`absolute inset-x-0 flex overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="flex shrink-0 text-[10rem] leading-none font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgb(20_20_24/0.22)] lg:text-[13rem]"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        <span className="pr-8">{text}</span>
        <span className="pr-8">{text}</span>
      </motion.div>
    </div>
  );
}

function Typography() {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <Marquee text={LINE_TOP} className="top-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]" />
      <Marquee text={LINE_BOTTOM} reverse className="bottom-16 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]" />
      {/* la palabra "smart" en rojo sólido asoma detrás de la bailarina */}
      <span className="absolute top-1/2 right-[6%] hidden -translate-y-1/2 font-serif text-[22rem] leading-none text-signal/[0.07] italic select-none lg:block">
        smart
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_25%_50%,rgb(244_241_234/0.9),transparent_70%)]" />
    </div>
  );
}

/* ───────────── G · Topografía ───────────── */

function Topography() {
  const { ref, x, y } = useParallax(-14);
  const contours = (cx: string, cy: string, color: string, step: number) =>
    `repeating-radial-gradient(ellipse 110% 90% at ${cx} ${cy}, transparent 0 ${step - 1}px, ${color} ${step - 1}px ${step}px)`;
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <motion.div className="absolute -inset-8" style={{ x, y }}>
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: contours("72%", "42%", "rgb(20 20 24 / 0.11)", 34) }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_50%_60%_at_20%_70%,black,transparent_70%)]"
          style={{ backgroundImage: contours("12%", "85%", "rgb(242 169 59 / 0.35)", 26) }}
          animate={{ scale: [1.02, 1, 1.02] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />
        {/* una curva de nivel marcada en rojo */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(ellipse 110% 90% at 72% 42%, transparent 0 318px, rgb(232 54 42 / 0.55) 318px 320px, transparent 320px)" }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
      {/* cota */}
      <div className="absolute top-[42%] left-[72%] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="block size-1.5 rounded-full bg-signal" />
        <span className="eyebrow absolute top-2 left-3 whitespace-nowrap text-[10px] text-ink/45">+ 740 m · Palencia</span>
      </div>
    </div>
  );
}

/* ───────────── H · Tickets a la deriva ───────────── */

function DriftingTickets() {
  const { ref, x, y } = useParallax(-30);
  const tickets = useMemo(() => {
    const r = rng(3);
    return Array.from({ length: 16 }, (_, i) => ({
      left: 4 + r() * 90,
      top: 6 + r() * 80,
      w: 44 + r() * 60,
      rot: -18 + r() * 36,
      far: r() < 0.45,
      red: r() < 0.3,
      dur: 7 + r() * 8,
      delay: r() * -10,
      amp: 8 + r() * 14,
      i,
    }));
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${FADE}`}>
      <motion.div className="absolute inset-0" style={{ x, y }}>
        {tickets.map((t) => (
          <motion.div
            key={t.i}
            className={`absolute ${t.far ? "opacity-40 blur-[1.5px]" : "opacity-80"}`}
            style={{ left: `${t.left}%`, top: `${t.top}%`, width: t.w, rotate: t.rot }}
            animate={{ y: [0, -t.amp, 0], rotate: [t.rot, t.rot + 5, t.rot] }}
            transition={{ duration: t.dur, delay: t.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className={`relative rounded-[3px] ring-1 ring-ink/15 ${t.red ? "bg-signal/85" : "bg-white"}`}
              style={{ height: t.w * 0.58 }}
            >
              <span className={`absolute inset-x-1.5 top-1.5 h-px ${t.red ? "bg-paper/60" : "bg-ink/25"}`} />
              <span className={`absolute inset-x-1.5 top-3 h-px w-1/2 ${t.red ? "bg-paper/40" : "bg-ink/15"}`} />
              <span className={`absolute inset-x-1.5 bottom-1.5 h-[3px] bg-[repeating-linear-gradient(to_right,currentColor_0_1px,transparent_1px_3px)] ${t.red ? "text-paper/60" : "text-ink/40"}`} />
              <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full bg-paper ring-1 ring-ink/10 ring-inset" />
              <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-paper ring-1 ring-ink/10 ring-inset" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
