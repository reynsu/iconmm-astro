import { cn } from "@/lib/utils";
import { withBase } from "@/lib/url";

// Reinterpretación del isotipo de ICON: la "i" inclinada, en blanco sobre el rojo de marca.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="var(--color-signal)" />
      <path d="M11.2 6.5 17.4 5.2 18.4 9.6 12.2 10.9Z" fill="#fff" />
      <path d="M13 12.6 19.2 11.3 22.4 26.2 16.2 27.5Z" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <a href={withBase("/")} className={cn("relative z-20 flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[15px] font-bold tracking-tight", inverted ? "text-paper" : "text-ink")}>ICON</span>
        <span className={cn("mt-0.5 font-mono text-[8.5px] tracking-[0.28em]", inverted ? "text-paper/60" : "text-muted")}>
          MULTIMEDIA
        </span>
      </span>
    </a>
  );
}
