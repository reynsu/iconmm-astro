"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity "layout-text-flip" adaptado a la paleta y al tamaño del hero: el texto fijo
// hereda la tipografía del párrafo y la palabra rotatoria va en una pastilla blanca que
// se ensancha o estrecha con `layout` al cambiar de palabra.
export const LayoutTextFlip = ({
  text,
  words,
  duration = 3000,
  className,
  wordClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <motion.span layoutId="subtext">{text}</motion.span>

      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden px-1 py-1 font-serif text-[1.15em] text-ink italic",
          wordClassName,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ y: -32, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
};
