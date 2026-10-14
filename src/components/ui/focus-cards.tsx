"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { pic } from "@/lib/images";

// Adaptación: cada tarjeta es un enlace con antetítulo (fecha) y llamada a la acción,
// y la rejilla se controla con className.
export type FocusCard = {
  title: string;
  src: string;
  eyebrow?: string;
  href?: string;
  cta?: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: FocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      className={cn(
        "group relative block h-72 w-full overflow-hidden rounded-2xl bg-paper-2 transition-all duration-300 ease-out md:h-96",
        hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
      )}
    >
      <img
        {...pic(card.src, "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw")}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        {card.eyebrow && <p className="font-mono text-[11px] tracking-[0.18em] text-paper/70 uppercase">{card.eyebrow}</p>}
        <p className="mt-2 text-lg leading-snug font-medium text-balance text-paper md:text-xl">{card.title}</p>
        {card.cta && (
          <p
            className={cn(
              "mt-3 text-sm text-signal transition duration-300",
              hovered === index ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            {card.cta} →
          </p>
        )}
      </div>
    </a>
  ),
);

Card.displayName = "Card";

export function FocusCards({ cards, className }: { cards: FocusCard[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
