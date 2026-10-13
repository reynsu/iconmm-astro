"use client";
import React, { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

// Variante de Aceternity "sticky-scroll-reveal" adaptada al scroll de la página:
// el texto avanza con la página y el visual se queda fijo a la derecha.
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    /** Línea sobre el título */
    eyebrow?: React.ReactNode;
    /** Bloque libre bajo el título (etiquetas, enlaces…) */
    meta?: React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(cardLength - 1, Math.floor(latest * cardLength));
    setActiveCard(Math.max(0, index));
  });

  return (
    <div ref={ref} className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div>
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="flex min-h-0 flex-col justify-center py-10 lg:min-h-[78vh] lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0.25 }}
              animate={{ opacity: activeCard === index ? 1 : 0.25 }}
              transition={{ duration: 0.4 }}
              className="max-lg:!opacity-100"
            >
              {item.eyebrow}
              <h3 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                {item.title}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                {item.description}
              </p>
              {item.meta}
            </motion.div>
            <div className="mt-8 lg:hidden">{item.content}</div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div
          className={cn(
            "sticky top-[calc(50vh-15rem)] h-[30rem] w-full overflow-hidden rounded-2xl",
            contentClassName,
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeCard}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
