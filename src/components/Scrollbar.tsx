"use client";
import { useEffect, useRef } from "react";

/**
 * Barra de scroll superpuesta: la nativa se oculta en global.css y esta se dibuja encima del
 * contenido, sin pista, con un pulgar de tinta que aparece al desplazar o al acercar el puntero
 * y se desvanece al cabo de un segundo. Se puede arrastrar y la pista acepta clics para saltar.
 */

const MIN_THUMB = 36; // px
const HIDE_AFTER = 1100; // ms sin actividad

/**
 * Tono del fondo que hay bajo el pulgar: recorre los elementos bajo ese punto, de arriba
 * abajo, y se queda con el primero que pinta un color de fondo opaco. Así la barra es tinta
 * sobre papel y papel sobre las bandas oscuras, incluida la cortina del mapa de presencia.
 */
function toneUnder(y: number): "light" | "dark" {
  const x = window.innerWidth - 6;
  for (const node of document.elementsFromPoint(x, y)) {
    if ((node as HTMLElement).closest?.("[data-scrollbar]")) continue;
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/);
    if (!m) continue;
    const a = m[4] === undefined ? 1 : parseFloat(m[4]);
    if (a < 0.5) continue;
    const lum = (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255;
    return lum < 0.5 ? "dark" : "light";
  }
  return "light";
}

export default function Scrollbar() {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const hideTimer = useRef(0);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const hovering = useRef(false);

  useEffect(() => {
    const el = track.current;
    const th = thumb.current;
    if (!el || !th) return;
    const doc = document.documentElement;
    let raf = 0;

    const show = () => {
      el.dataset.visible = "true";
      window.clearTimeout(hideTimer.current);
      if (!hovering.current && !drag.current) {
        hideTimer.current = window.setTimeout(() => (el.dataset.visible = "false"), HIDE_AFTER);
      }
    };

    const layout = () => {
      raf = 0;
      const total = doc.scrollHeight;
      const view = window.innerHeight;
      if (total <= view + 1) {
        el.dataset.scrollable = "false";
        return;
      }
      el.dataset.scrollable = "true";
      const trackH = el.clientHeight;
      const h = Math.max(MIN_THUMB, (view / total) * trackH);
      const y = (window.scrollY / (total - view)) * (trackH - h);
      const top = Math.max(0, Math.min(trackH - h, y));
      th.style.height = `${h.toFixed(1)}px`;
      th.style.transform = `translateY(${top.toFixed(1)}px)`;
      el.dataset.tone = toneUnder(el.getBoundingClientRect().top + top + h / 2);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(layout);
    };
    const onScroll = () => {
      schedule();
      show();
    };

    // arrastre del pulgar
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      th.setPointerCapture(e.pointerId);
      drag.current = { startY: e.clientY, startScroll: window.scrollY };
      el.dataset.dragging = "true";
      show();
    };
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const total = doc.scrollHeight;
      const view = window.innerHeight;
      const trackH = el.clientHeight;
      const h = th.getBoundingClientRect().height;
      const ratio = (total - view) / Math.max(1, trackH - h);
      window.scrollTo({ top: d.startScroll + (e.clientY - d.startY) * ratio, behavior: "instant" as ScrollBehavior });
    };
    const onUp = () => {
      drag.current = null;
      el.dataset.dragging = "false";
      show();
    };
    // clic en la pista: salta a esa posición
    const onTrackDown = (e: PointerEvent) => {
      if (e.target === th) return;
      const r = el.getBoundingClientRect();
      const h = th.getBoundingClientRect().height;
      const frac = (e.clientY - r.top - h / 2) / Math.max(1, r.height - h);
      const total = doc.scrollHeight;
      const view = window.innerHeight;
      window.scrollTo({ top: Math.max(0, Math.min(1, frac)) * (total - view), behavior: "smooth" });
    };
    // el puntero cerca del borde derecho muestra la barra
    const onPointerMove = (e: PointerEvent) => {
      const near = e.clientX > window.innerWidth - 28;
      if (near !== hovering.current) {
        hovering.current = near;
        if (near) show();
        else show();
      }
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    th.addEventListener("pointerdown", onDown);
    th.addEventListener("pointermove", onMove);
    th.addEventListener("pointerup", onUp);
    th.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerdown", onTrackDown);
    layout();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointerMove);
      th.removeEventListener("pointerdown", onDown);
      th.removeEventListener("pointermove", onMove);
      th.removeEventListener("pointerup", onUp);
      th.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerdown", onTrackDown);
      window.clearTimeout(hideTimer.current);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={track}
      aria-hidden="true"
      data-scrollbar=""
      data-visible="false"
      data-scrollable="true"
      data-dragging="false"
      data-tone="light"
      className="group/sb fixed top-2 right-1 bottom-2 z-[90] w-4 opacity-0 transition-opacity duration-300 select-none data-[scrollable=false]:hidden data-[visible=true]:opacity-100 max-md:hidden"
    >
      <div
        ref={thumb}
        // tinta sobre fondos claros, papel sobre fondos oscuros (data-tone, medido bajo el pulgar)
        className="absolute right-1 w-1.5 cursor-grab rounded-full bg-ink/40 transition-[width,background-color] duration-200 group-hover/sb:w-2 group-hover/sb:bg-ink/70 group-data-[tone=dark]/sb:bg-paper/55 group-hover/sb:group-data-[tone=dark]/sb:bg-paper/90 group-data-[dragging=true]/sb:w-2 group-data-[dragging=true]/sb:cursor-grabbing group-data-[dragging=true]/sb:!bg-signal"
      />
    </div>
  );
}
