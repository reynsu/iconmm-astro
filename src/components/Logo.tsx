import { cn } from "@/lib/utils";

// Reinterpretación del isotipo de ICON (la "i" inclinada en rojo) para fondos oscuros.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#15151c" stroke="rgb(255 255 255 / 0.14)" />
      <path d="M11.2 6.5 17.4 5.2 18.4 9.6 12.2 10.9Z" fill="var(--color-signal)" />
      <path d="M13 12.6 19.2 11.3 22.4 26.2 16.2 27.5Z" fill="var(--color-signal)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="/" className={cn("relative z-20 flex items-center gap-2.5", className)} aria-label="ICON Multimedia, inicio">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-fg">ICON</span>
        <span className="mt-0.5 font-mono text-[8.5px] tracking-[0.28em] text-muted">MULTIMEDIA</span>
      </span>
    </a>
  );
}
