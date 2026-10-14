"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Counter from "@/components/Counter";
import { Spotlight } from "@/components/ui/spotlight-new";
import { cn } from "@/lib/utils";

/**
 * PROTOTIPO · tres variantes del panel "En cifras" de /rsc (visual fijo del StickyScroll),
 * conmutables con ?variant=A|B|C. Pregunta: ¿qué aspecto debe tener el panel de cifras?
 *
 *  A · Panel de salidas — tablero split-flap de estación: cada cifra entra con flaps que giran.
 *  B · Escenario         — una cifra cada vez, enorme, con foco de luz y carrusel automático.
 *  C · Tickets           — talones de papel troquelados, abanico sobre fondo paper, al estilo del hero.
 */

export type Stat = { value: number; label: string };
export const STATS_VARIANTS = [
  { key: "A", name: "Panel de salidas" },
  { key: "B", name: "Escenario" },
  { key: "C", name: "Tickets" },
];

export function StatsVariant({ variant, stats, index }: { variant: string; stats: Stat[]; index: string }) {
  if (variant === "B") return <StageStats stats={stats} index={index} />;
  if (variant === "C") return <TicketStats stats={stats} index={index} />;
  return <BoardStats stats={stats} index={index} />;
}

/* ───────────────────────── A · Panel de salidas ───────────────────────── */

const FLAP_CHARS = "0123456789";

function Flap({ target, delay, className }: { target: string; delay: number; className?: string }) {
  const [s, setS] = useState({ cur: " ", prev: " ", n: 0 });

  useEffect(() => {
    const steps = 5 + Math.floor(Math.random() * 5);
    let i = 0;
    let timer = setTimeout(function step() {
      i++;
      const ch = i >= steps ? target : FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
      setS((p) => ({ cur: ch, prev: p.cur, n: p.n + 1 }));
      if (i < steps) timer = setTimeout(step, 70);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);

  const cur = s.cur === " " ? " " : s.cur;
  const prev = s.prev === " " ? " " : s.prev;
  const text = "absolute inset-x-0 flex items-center justify-center font-semibold tracking-[-0.04em] tabular-nums select-none";

  return (
    <div className={cn("relative overflow-hidden rounded-[4px] bg-[#2b2b33] text-paper shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] [perspective:600px]", className)}>
      {/* mitad superior fija (nuevo) */}
      <div className="absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden bg-[#2f2f38]">
        <div className={cn(text, "top-0 h-[200%]")}>{cur}</div>
      </div>
      {/* mitad inferior fija (nuevo) */}
      <div className="absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden bg-[#26262e]">
        <div className={cn(text, "bottom-0 h-[200%]")}>{cur}</div>
      </div>
      {s.n > 0 && (
        <motion.div
          key={`t${s.n}`}
          className="absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden bg-[#2f2f38] [backface-visibility:hidden]"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -95 }}
          transition={{ duration: 0.22, ease: [0.55, 0.055, 0.675, 0.19] }}
        >
          <div className={cn(text, "top-0 h-[200%]")}>{prev}</div>
        </motion.div>
      )}
      {s.n > 0 && (
        <motion.div
          key={`b${s.n}`}
          className="absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden bg-[#26262e] [backface-visibility:hidden]"
          initial={{ rotateX: 95 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.2, delay: 0.12, ease: [0.33, 1.4, 0.64, 1] }}
        >
          <div className={cn(text, "bottom-0 h-[200%]")}>{cur}</div>
        </motion.div>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px bg-black/70" />
    </div>
  );
}

function BoardStats({ stats, index }: { stats: Stat[]; index: string }) {
  const dense = stats.length > 2;
  const cell = dense ? "h-14 w-9 text-[1.9rem] md:h-16 md:w-10 md:text-[2.2rem]" : "h-24 w-16 text-[3.6rem] md:h-28 md:w-[4.6rem] md:text-[4.4rem]";
  return (
    <div className="flex h-full flex-col rounded-3xl border border-line-dark bg-[#121216] p-6 text-paper md:p-8">
      <div className="flex items-center justify-between border-b border-paper/10 pb-4 font-mono text-[11px] tracking-[0.18em] text-paper/50 uppercase">
        <span className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber/70" />
            <span className="relative inline-flex size-2 rounded-full bg-amber" />
          </span>
          En cifras
        </span>
        <span>Compromiso {index}</span>
      </div>
      <ul className={cn("flex flex-1 flex-col justify-center", dense ? "gap-3 py-4" : "gap-6 py-6")}>
        {stats.map((s, r) => {
          const chars = s.value.toLocaleString("es-ES").split("");
          return (
            <li key={s.label} className="grid grid-cols-[auto_1fr] items-center gap-5">
              <div className="flex gap-[3px]">
                {chars.map((ch, c) =>
                  ch === "." ? (
                    <span key={c} className={cn("flex items-end justify-center pb-2 font-semibold text-amber", dense ? "w-3 text-xl" : "w-5 text-4xl")}>
                      .
                    </span>
                  ) : (
                    <Flap key={c} target={ch} delay={r * 140 + c * 60} className={cell} />
                  ),
                )}
              </div>
              <div className="min-w-0">
                <p className={cn("font-mono tracking-[0.14em] text-amber uppercase", dense ? "text-[11px]" : "text-[12px]")}>{s.label}</p>
                <div className="mt-2 h-px w-full bg-[repeating-linear-gradient(to_right,rgb(244_241_234/0.18)_0_6px,transparent_6px_12px)]" />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="font-mono text-[10px] tracking-[0.18em] text-paper/30 uppercase">ICON Multimedia · Palencia</p>
    </div>
  );
}

/* ───────────────────────── B · Escenario ───────────────────────── */

const STAGE_MS = 3800;

function StageStats({ stats, index }: { stats: Stat[]; index: string }) {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setI((v) => (v + 1) % stats.length);
      setTick((v) => v + 1);
    }, STAGE_MS);
    return () => clearTimeout(t);
  }, [i, tick, stats.length]);

  const s = stats[i];
  const formatted = s.value.toLocaleString("es-ES");

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-paper">
      <Spotlight
        gradientFirst="radial-gradient(68% 68% at 55% 31%, rgba(232,54,42,0.22) 0, rgba(232,54,42,0.06) 50%, rgba(232,54,42,0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(242,169,59,0.12) 0, rgba(242,169,59,0.03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(232,54,42,0.10) 0, rgba(232,54,42,0.03) 80%, transparent 100%)"
        translateY={-280}
        width={420}
        height={900}
        smallWidth={180}
        duration={8}
        xOffset={60}
      />
      <div className="relative z-10 flex items-center justify-between p-7 font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase md:p-9">
        <span>En cifras</span>
        <span>
          {String(i + 1).padStart(2, "0")}<span className="text-paper/25"> / {String(stats.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-center px-7 md:px-9">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            className="relative w-full"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -28, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* cifra fantasma, sólo contorno */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-3 text-[12rem] leading-none font-semibold tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgba(244,241,234,0.12)] md:text-[15rem]"
            >
              {formatted}
            </span>
            <p className="relative text-[6.5rem] leading-none font-semibold tracking-[-0.06em] tabular-nums md:text-[8rem]">
              <Counter value={s.value} />
            </p>
            <p className="relative mt-4 max-w-sm font-serif text-3xl leading-tight text-paper/80 italic md:text-4xl">{s.label}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* raíl de progreso, un segmento por cifra */}
      <div className="relative z-10 flex gap-2 p-7 md:p-9">
        {stats.map((st, k) => (
          <button
            key={st.label}
            type="button"
            aria-label={st.label}
            onClick={() => {
              setI(k);
              setTick((v) => v + 1);
            }}
            className="relative h-6 flex-1 cursor-pointer"
          >
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/15" />
            {k === i && (
              <motion.span
                key={tick}
                className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-signal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: STAGE_MS / 1000, ease: "linear" }}
              />
            )}
            {k < i && <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/50" />}
          </button>
        ))}
        <span className="ml-3 self-center font-mono text-[10px] tracking-[0.18em] text-paper/30 uppercase">{index}</span>
      </div>
    </div>
  );
}

/* ───────────────────────── C · Tickets ───────────────────────── */

const TILTS = ["-3deg", "2.5deg", "-1.5deg", "3deg"];
const SHIFTS = [
  { x: 0, y: 0 },
  { x: 12, y: -6 },
  { x: -8, y: 4 },
  { x: 6, y: -2 },
];

function Ticket({ stat, index, n, dense }: { stat: Stat; index: string; n: number; dense: boolean }) {
  return (
    <motion.li
      className="relative list-none"
      style={{ rotate: TILTS[n % TILTS.length], ...SHIFTS[n % SHIFTS.length] }}
      whileHover={{ rotate: "0deg", y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative rounded-lg bg-white text-ink shadow-[0_18px_40px_-18px_rgba(20,20,24,0.45),0_2px_6px_rgba(20,20,24,0.08)] ring-1 ring-ink/10">
        {/* cabecera del ticket */}
        <div className={cn("flex items-center justify-between font-mono tracking-[0.16em] uppercase", dense ? "px-4 pt-3 text-[9px]" : "px-5 pt-4 text-[10px]")}>
          <span className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-[2px] bg-signal" /> ICON · RSC
          </span>
          <span className="text-ink/40">
            {index}-{String(n + 1).padStart(2, "0")}
          </span>
        </div>
        {/* cuerpo */}
        <div className={cn(dense ? "px-4 pt-3 pb-4" : "px-5 pt-5 pb-6")}>
          <p className={cn("font-semibold tracking-[-0.05em] tabular-nums", dense ? "text-4xl" : "text-6xl")}>
            <Counter value={stat.value} />
          </p>
          <p className={cn("mt-1 max-w-[16rem] leading-snug text-ink/70", dense ? "text-[12px]" : "text-sm")}>{stat.label}</p>
        </div>
        {/* troquel */}
        <div className="relative">
          <span className="absolute top-1/2 -left-2 size-4 -translate-y-1/2 rounded-full bg-paper-2 ring-1 ring-ink/10 ring-inset" />
          <span className="absolute top-1/2 -right-2 size-4 -translate-y-1/2 rounded-full bg-paper-2 ring-1 ring-ink/10 ring-inset" />
          <div className="mx-4 border-t border-dashed border-ink/25" />
        </div>
        {/* talón con código de barras */}
        <div className={cn("flex items-center justify-between", dense ? "px-4 py-2.5" : "px-5 py-3")}>
          <span
            aria-hidden="true"
            className={cn("block w-24 bg-[repeating-linear-gradient(to_right,#141418_0_1px,transparent_1px_3px,#141418_3px_5px,transparent_5px_6px,#141418_6px_7px,transparent_7px_10px)]", dense ? "h-4" : "h-6")}
          />
          <span className={cn("font-mono tracking-[0.2em] text-signal uppercase", dense ? "text-[9px]" : "text-[10px]")}>Válido</span>
        </div>
      </div>
    </motion.li>
  );
}

function TicketStats({ stats, index }: { stats: Stat[]; index: string }) {
  const dense = stats.length > 2;
  return (
    <div className="grain relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-line bg-paper-2 p-7 md:p-9">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgb(20_20_24/0.12)_1px,transparent_1px)] bg-[size:18px_18px] opacity-70"
      />
      <p className="eyebrow relative flex items-center gap-3 text-ink/50">
        <span className="text-signal">[{index}]</span> En cifras
      </p>
      <ul className={cn("relative mt-6 grid", dense ? "grid-cols-2 gap-4" : "gap-6")}>
        {stats.map((s, n) => (
          <Ticket key={s.label} stat={s} index={index} n={n} dense={dense} />
        ))}
      </ul>
    </div>
  );
}
