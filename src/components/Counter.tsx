import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/** Número que cuenta desde 0 hasta `value` la primera vez que entra en pantalla. */
export default function Counter({
  value,
  className,
  suffix = "",
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}
