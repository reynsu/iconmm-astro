import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const COLS = 22;
const row = (left: string, right = "") => left.padEnd(COLS - right.length) + right;

// Cada "pantalla" del panel. Sólo caracteres del split-flap (sin tildes ni Ñ).
const SCREENS: { rows?: string[]; text?: string }[] = [
  {
    rows: [
      row("SOLUCION", "VIA"),
      row(""),
      row("DENEVA", "01"),
      row("DENEVA.TRANSIT", "02"),
      row("MIRANDDA", "03"),
      row("KOMMANDA", "04"),
    ],
  },
  { text: "UN FUTURO INTELIGENTE\nEMPIEZA EN CADA\nPANTALLA" },
  { text: "PROXIMA PARADA\n\nINNOTRANS 2026 {G}\nBERLIN 22-25 SEPT" },
  { text: "+12.000\nUBICACIONES\nDIGITALIZADAS" },
];

const clock = (timeZone: string) =>
  new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());

export default function DepartureBoard() {
  const [index, setIndex] = useState(0);
  const [times, setTimes] = useState<{ eu: string; mx: string } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // El panel se "endereza" al hacer scroll, como una pantalla que se orienta hacia ti
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.92, 1]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 6500);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const tick = () => setTimes({ eu: clock("Europe/Madrid"), mx: clock("America/Mexico_City") });
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const screen = SCREENS[index];

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl [perspective:1600px]">
      {/* halo de luz que emite la pantalla */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 top-1/3 -bottom-16 rounded-[50%] bg-signal/25 blur-[90px]"
      />
      <motion.div style={{ rotateX, scale }} className="relative origin-bottom">
        <div className="rounded-[22px] bg-gradient-to-b from-white/15 to-white/[0.02] p-px shadow-[0_40px_120px_-30px_rgba(252,68,68,0.45)]">
          <div className="rounded-[21px] bg-[#0a0a0e] p-2 md:p-3">
            <TextFlippingBoard
              rows={screen.rows}
              text={screen.text}
              duration={1.6}
              className="max-w-none rounded-[14px] bg-[#111116] shadow-none md:rounded-[16px] dark:bg-[#111116]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between px-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase md:text-[11px]">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
            DENEVA.transit · en directo
          </span>
          <span aria-live="off" className="tabular-nums">
            PAL {times?.eu ?? "--:--"} <span className="text-white/20">/</span> CDMX {times?.mx ?? "--:--"}
          </span>
        </div>
      </motion.div>
      <span className="sr-only">
        Panel de información con las cuatro soluciones de ICON Multimedia: DENEVA, DENEVA.transit, MIRANDDA y KOMMANDA.
      </span>
    </div>
  );
}
