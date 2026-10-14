import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { World, type GlobeConfig } from "@/components/ui/globe";
import WorldMap from "@/components/ui/world-map";
import { presence } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Presencia internacional. Sección "pegajosa" de tres pantallas:
 *  - Fase A (papel): titular, regiones y el globo (github-globe) con las sedes.
 *  - Fase B (tinta): el mapa de puntos (world-map) ocupa toda la sección como fondo
 *    interactivo (brillo y paralaje siguen al puntero) y sólo queda el listado de rutas.
 *
 * Transición: el globo no se mueve ni escala. El fondo oscuro con el mapa se revela con un
 * círculo que nace en el disco del globo y crece hasta cubrir la pantalla (clip-path), con
 * un borde luminoso como frente de onda; el globo y el texto se desvanecen a su paso.
 * El scroll sólo dispara la transición (y la revierte al volver arriba): una vez iniciada se
 * completa sola, con tiempo propio (~3 s), sin necesidad de seguir haciendo scroll.
 */

const SIGNAL = "#e8362a";
const AMBER = "#f2a93b";

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#2e2e38",
  showAtmosphere: true,
  atmosphereColor: "#e8362a",
  atmosphereAltitude: 0.12,
  emissive: "#2e2e38",
  emissiveIntensity: 0.35,
  shininess: 0.6,
  polygonColor: "rgba(244,241,234,0.6)",
  ambientLight: "#f4f1ea",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1400,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 35, lng: -30 },
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

const hubByName = Object.fromEntries(presence.hubs.map((h) => [h.name, h]));

const arcs = presence.routes.map((r, i) => {
  const from = hubByName[r.from];
  return {
    order: i + 1,
    startLat: from.lat,
    startLng: from.lng,
    endLat: r.lat,
    endLng: r.lng,
    arcAlt: 0.15 + (i % 3) * 0.08,
    color: i % 2 === 0 ? SIGNAL : AMBER,
  };
});

const mapDots = presence.routes.map((r) => {
  const from = hubByName[r.from];
  return { start: { lat: from.lat, lng: from.lng, label: r.from }, end: { lat: r.lat, lng: r.lng, label: r.to } };
});

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Radio visible del disco del globo respecto al lado menor de su contenedor
const GLOBE_DISC = 0.41;

export default function Presence() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "30% 0px 30% 0px" });

  const stickyEl = useRef<HTMLDivElement>(null);
  const revealEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const mapInner = useRef<HTMLDivElement>(null);
  const glowEl = useRef<HTMLDivElement>(null);
  const textA = useRef<HTMLDivElement>(null);
  const layerA = useRef<HTMLDivElement>(null);
  const globeEl = useRef<HTMLDivElement>(null);
  const textB = useRef<HTMLDivElement>(null);
  const railEl = useRef<HTMLSpanElement>(null);

  const [stage, setStage] = useState<"globe" | "map">("globe");
  const [mapMounted, setMapMounted] = useState(false);

  // --- progreso con tiempo propio -------------------------------------------
  // current ∈ [0,1] es la posición en la coreografía; el scroll sólo decide el destino.
  const current = useRef(0);
  const tween = useRef<{ from: number; to: number; start: number; dur: number } | null>(null);
  const phase = useRef<"A" | "B">("A");
  const raf = useRef(0);
  const pointer = useRef({ x: 0.5, y: 0.5, px: 0.5, py: 0.5 });
  const DURATION = 3000; // ms para recorrer toda la coreografía
  const TRIGGER_ON = 0.22; // progreso de scroll que inicia la transición
  const TRIGGER_OFF = 0.1; // por debajo, vuelve al globo

  const apply = (p: number) => {
    const sticky = stickyEl.current, reveal = revealEl.current, ring = ringEl.current;
    const ta = textA.current, la = layerA.current, g = globeEl.current, b = textB.current, r = railEl.current;
    if (!sticky || !reveal || !ring || !ta || !la || !g || !b || !r) return;
    const seg = (x: number, y: number) => clamp01((p - x) / (y - x));

    // centro y radio del disco del globo, en coordenadas del contenedor pegajoso
    const sr = sticky.getBoundingClientRect();
    const gr = g.getBoundingClientRect();
    const cx = gr.left + gr.width / 2 - sr.left;
    const cy = gr.top + gr.height / 2 - sr.top;
    const r0 = Math.min(gr.width, gr.height) * GLOBE_DISC;
    const rMax = Math.hypot(Math.max(cx, sr.width - cx), Math.max(cy, sr.height - cy)) + 40;

    // onda circular: nace en el disco del globo y cubre la pantalla
    const wave = easeInOut(seg(0.3, 0.72));
    const radius = r0 + (rMax - r0) * wave;
    const active = p > 0.3;
    reveal.style.clipPath = `circle(${radius.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`;
    reveal.style.visibility = active ? "visible" : "hidden";

    // borde luminoso del frente de onda
    const ringAlpha = active ? 1 - smooth(seg(0.6, 0.76)) : 0;
    ring.style.opacity = String(ringAlpha);
    ring.style.width = ring.style.height = `${(radius * 2).toFixed(1)}px`;
    ring.style.transform = `translate(${(cx - radius).toFixed(1)}px, ${(cy - radius).toFixed(1)}px)`;

    // el globo se desvanece cuando la onda lo supera; el texto, un poco antes
    const globeGone = smooth(seg(0.42, 0.62));
    g.style.opacity = String(1 - globeGone);
    const textGone = smooth(seg(0.3, 0.52));
    ta.style.opacity = String(1 - textGone);
    ta.style.transform = `translateY(${(-18 * textGone).toFixed(1)}px)`;
    la.style.visibility = globeGone >= 1 && textGone >= 1 ? "hidden" : "visible";
    la.style.pointerEvents = globeGone > 0.5 ? "none" : "auto";

    // rutas
    const routes = smooth(seg(0.6, 0.84));
    b.style.opacity = String(routes);
    b.style.transform = `translateY(${(16 * (1 - routes)).toFixed(1)}px)`;
    b.style.visibility = routes <= 0 ? "hidden" : "visible";

    r.style.transform = `scaleX(${seg(0.05, 0.95).toFixed(3)})`;
    setStage(p < 0.5 ? "globe" : "map");
  };

  const applyPointer = () => {
    const pt = pointer.current;
    pt.px += (pt.x - pt.px) * 0.08;
    pt.py += (pt.y - pt.py) * 0.08;
    if (mapInner.current) {
      mapInner.current.style.transform = `translate(calc(-50% + ${((pt.px - 0.5) * -28).toFixed(1)}px), calc(-50% + ${((pt.py - 0.5) * -18).toFixed(1)}px))`;
    }
    if (glowEl.current) {
      glowEl.current.style.transform = `translate(${(pt.px * 100).toFixed(2)}vw, ${(pt.py * 100).toFixed(2)}vh) translate(-50%, -50%)`;
    }
    return Math.abs(pt.x - pt.px) + Math.abs(pt.y - pt.py) > 0.0005;
  };

  const tick = () => {
    raf.current = 0;
    let animating = false;
    const tw = tween.current;
    if (tw) {
      const t = clamp01((performance.now() - tw.start) / tw.dur);
      // avance lineal: cada capa ya lleva su propia curva (smoothstep) dentro de apply()
      current.current = tw.from + (tw.to - tw.from) * t;
      if (t >= 1) tween.current = null;
      else animating = true;
      apply(current.current);
    }
    const pointerMoving = applyPointer();
    if (animating || pointerMoving) raf.current = requestAnimationFrame(tick);
  };
  const kick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };
  const goTo = (to: number) => {
    if (document.hidden) {
      tween.current = null;
      current.current = to;
      apply(to);
      return;
    }
    const from = current.current;
    if (Math.abs(to - from) < 0.001) return;
    tween.current = { from, to, start: performance.now(), dur: Math.max(300, DURATION * Math.abs(to - from)) };
    kick();
  };

  // Progreso 0 → 1 mientras la sección está "pegada": no depende del bucle de
  // animación, así que también funciona con la pestaña en segundo plano.
  const readProgress = () => {
    const el = ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return clamp01(-rect.top / Math.max(1, rect.height - window.innerHeight));
  };
  useEffect(() => {
    const onScroll = () => {
      const sp = readProgress();
      if (phase.current === "A" && sp >= TRIGGER_ON) {
        phase.current = "B";
        goTo(1);
      } else if (phase.current === "B" && sp <= TRIGGER_OFF) {
        phase.current = "A";
        goTo(0);
      }
    };
    // estado inicial sin animar (por si se carga la página a mitad de sección)
    phase.current = readProgress() >= TRIGGER_ON ? "B" : "A";
    current.current = phase.current === "B" ? 1 : 0;
    apply(current.current);
    applyPointer();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // El mapa se monta (oculto) en cuanto la sección se acerca, para que su coste no
  // caiga en mitad del scroll.
  useEffect(() => {
    if (!inView) return;
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    const id = idle(() => setMapMounted(true));
    return () => ((window as any).cancelIdleCallback ?? clearTimeout)(id);
  }, [inView]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current.x = (e.clientX - r.left) / r.width;
    pointer.current.y = (e.clientY - r.top) / r.height;
    kick();
  };

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div ref={stickyEl} className="sticky top-0 h-screen overflow-hidden" onPointerMove={onPointerMove}>
        {/* Fase B · fondo oscuro con el mapa a pantalla completa, revelado en círculo */}
        <div
          ref={revealEl}
          className="absolute inset-0 bg-ink will-change-[clip-path]"
          style={{ clipPath: "circle(0px at 50% 50%)", visibility: "hidden" }}
          aria-hidden="true"
        >
          <div
            ref={mapInner}
            className="absolute top-1/2 left-1/2 w-[max(100vw,200vh)] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,black_55%,transparent_100%)]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {mapMounted && <WorldMap dots={mapDots} lineColor={SIGNAL} dotColor="#ffffff3d" active={stage === "map"} />}
          </div>
          <div
            ref={glowEl}
            className="pointer-events-none absolute top-0 left-0 size-[46vmax] rounded-full bg-[radial-gradient(circle,rgba(232,54,42,0.32),rgba(232,54,42,0.08)_40%,transparent_65%)] mix-blend-screen"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(20_20_24/0.85),rgb(20_20_24/0.2)_45%,transparent_70%)]" />
        </div>
        {/* frente de onda */}
        <div
          ref={ringEl}
          className="pointer-events-none absolute top-0 left-0 rounded-full border border-signal/50 shadow-[0_0_90px_26px_rgba(232,54,42,0.22),inset_0_0_60px_rgba(232,54,42,0.18)] will-change-transform"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Fase A · titular, regiones y globo */}
        <div ref={layerA} className="relative flex h-full items-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[70vh] w-[70vh] translate-x-1/3 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]"
          />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-4 md:gap-8 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div ref={textA} className="relative z-10 will-change-[transform,opacity]">
              <p className="eyebrow flex items-center gap-3">
                <span className="text-signal">[03]</span> Presencia internacional
              </p>
              <h2 className="mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-ink md:mt-5 md:text-6xl">
                Software español,{" "}
                <em className="font-serif font-normal tracking-normal text-ink/70 italic">pantallas en dos continentes</em>.
              </h2>
              <p className="mt-4 hidden max-w-xl text-base leading-relaxed text-pretty text-muted sm:block md:mt-6 md:text-lg">
                Dos sedes, Palencia (EMEA) y Ciudad de México (LATAM), desde las que acompañamos a operadores de transporte,
                retail y banca en Europa y Latinoamérica.
              </p>

              <div className="mt-5 flex items-center gap-4 font-mono text-[11px] tracking-[0.18em] uppercase md:mt-8">
                <span className="text-ink">Sedes</span>
                <span className="relative h-px w-24 overflow-hidden bg-line">
                  <span ref={railEl} className="absolute inset-0 origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
                </span>
                <span className="text-muted/60">Rutas</span>
              </div>

              <ol className="mt-8 hidden max-w-lg border-t border-line lg:block">
                {presence.regions.map((region, i) => (
                  <li
                    key={region.name}
                    className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-line py-3.5 transition hover:border-ink/30"
                  >
                    <span className="font-mono text-[11px] tracking-[0.18em] text-signal">0{i + 1}</span>
                    <div>
                      <p className="text-base font-medium tracking-[-0.01em] text-ink">{region.name}</p>
                      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-muted">{region.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div
              ref={globeEl}
              className="relative mx-auto aspect-square w-full max-w-[min(100%,52vh)] cursor-grab will-change-[opacity] active:cursor-grabbing lg:aspect-[1.05/1] lg:max-h-[78vh] lg:max-w-none"
            >
              {inView && stage === "globe" && <World globeConfig={globeConfig} data={arcs} />}
            </div>
          </div>
        </div>

        {/* Fase B · sólo las rutas */}
        <div
          ref={textB}
          className="pointer-events-none absolute inset-0 flex items-center will-change-[transform,opacity]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <div className="max-w-xl">
              <p className="eyebrow flex items-center gap-3 text-paper/50">
                <span className="text-signal">[03]</span> Rutas activas
              </p>
              <ul className="mt-6 divide-y divide-paper/10">
                {presence.routes.map((route, i) => (
                  <li
                    key={route.to}
                    className={cn("flex items-baseline justify-between gap-6 py-3 md:py-4", i === 0 && "border-t border-paper/10")}
                  >
                    <span className="flex items-baseline gap-3 text-paper">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-paper/40 uppercase">{route.from}</span>
                      <IconArrowRight className="size-3.5 translate-y-0.5 text-signal" />
                      <span className="text-xl font-medium tracking-[-0.02em] md:text-3xl">{route.to}</span>
                    </span>
                    <span className="hidden shrink-0 font-mono text-[11px] text-paper/50 sm:inline">{route.note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-paper/45">
                Desde Palencia y Ciudad de México hacia metros, operadores ferroviarios y navieras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
