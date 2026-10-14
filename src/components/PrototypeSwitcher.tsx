import { useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

/**
 * PROTOTIPO · barra flotante para alternar variantes de UI (?variant=A|B|…).
 * Sólo se muestra en desarrollo. Flechas ← → también cambian de variante.
 */
export default function PrototypeSwitcher({
  variants,
  current,
  onChange,
}: {
  variants: { key: string; name: string }[];
  current: string;
  onChange: (key: string) => void;
}) {
  if (!import.meta.env.DEV) return null;

  const idx = Math.max(0, variants.findIndex((v) => v.key === current));
  const go = (dir: 1 | -1) => onChange(variants[(idx + dir + variants.length) % variants.length].key);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-amber/60 bg-ink/95 p-1 pr-3 font-mono text-[12px] text-paper shadow-2xl backdrop-blur">
      <button type="button" onClick={() => go(-1)} aria-label="Variante anterior" className="flex size-8 items-center justify-center rounded-full hover:bg-paper/10">
        <IconChevronLeft className="size-4" />
      </button>
      <span className="px-2">
        <span className="text-amber">PROTOTIPO</span> · {variants[idx].key} ({variants[idx].name}) · {idx + 1}/{variants.length}
      </span>
      <button type="button" onClick={() => go(1)} aria-label="Variante siguiente" className="flex size-8 items-center justify-center rounded-full hover:bg-paper/10">
        <IconChevronRight className="size-4" />
      </button>
    </div>
  );
}
