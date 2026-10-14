import { useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/stateful-button";
import { contact } from "@/data/pages";
import { cn } from "@/lib/utils";

/**
 * Formulario de contacto (contacto y partners). Si existe PUBLIC_CONTACT_ENDPOINT se envía
 * por POST como JSON; si no, muestra la confirmación en local (modo demo).
 */

type Props = {
  variant?: "contacto" | "partners";
  className?: string;
};

const topics = [
  { value: "comercial", label: "Equipo comercial" },
  { value: "soporte", label: "Soporte técnico" },
  { value: "partners", label: "Programa de partners" },
  { value: "otro", label: "Otro" },
];

const field =
  "w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition focus:border-ink/40 focus:bg-white focus:outline-none";
const label = "eyebrow mb-2 block";

export default function ContactForm({ variant = "contacto", className }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [topic, setTopic] = useState(variant === "partners" ? "partners" : "comercial");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // /contacto#comercial o #soporte preseleccionan el motivo
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (topics.some((t) => t.value === h)) setTopic(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const submit = async () => {
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) throw new Error("invalid");
    setError(null);
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, origen: variant }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setSent(true);
      form.reset();
    } catch {
      setError("No hemos podido enviar el mensaje. Llámanos al +34 979 70 29 06 o inténtalo de nuevo.");
      throw new Error("send-failed");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      noValidate={false}
      className={cn("relative rounded-[2rem] border border-line bg-white/50 p-6 md:p-10", className)}
    >
      {sent && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[2rem] bg-paper/95 p-8 text-center">
          <p className="eyebrow text-signal-ink">Mensaje enviado</p>
          <p className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-ink">Gracias. Te responderemos muy pronto.</p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 text-sm text-ink/70 underline-offset-4 hover:underline"
          >
            Enviar otro mensaje
          </button>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={label}>Nombre *</label>
          <input id="nombre" name="nombre" required autoComplete="given-name" className={field} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="apellidos" className={label}>Apellidos *</label>
          <input id="apellidos" name="apellidos" required autoComplete="family-name" className={field} placeholder="Tus apellidos" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="nombre@empresa.com" />
        </div>
        <div>
          <label htmlFor="telefono" className={label}>Teléfono</label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={field} placeholder="+34 …" />
        </div>
        <div>
          <label htmlFor="empresa" className={label}>Empresa</label>
          <input id="empresa" name="empresa" autoComplete="organization" className={field} placeholder="Nombre de la empresa" />
        </div>
        {variant === "contacto" ? (
          <div>
            <label htmlFor="motivo" className={label}>Motivo</label>
            <select id="motivo" name="motivo" value={topic} onChange={(e) => setTopic(e.target.value)} className={cn(field, "appearance-none")}>
              {topics.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="sector" className={label}>Sector</label>
            <input id="sector" name="sector" className={field} placeholder="Transporte, retail, QSR…" />
            <input type="hidden" name="motivo" value="partners" />
          </div>
        )}
        <div className="md:col-span-2">
          <label htmlFor="mensaje" className={label}>Mensaje *</label>
          <textarea id="mensaje" name="mensaje" required rows={5} className={cn(field, "resize-y")} placeholder="Cuéntanos tu proyecto" />
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[13px] leading-relaxed text-muted">
        <p>
          <strong className="font-medium text-ink/80">Protección de datos.</strong> {contact.privacy}
        </p>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="privacidad" required className="mt-1 size-4 accent-signal" />
          <span>
            He leído y acepto las condiciones de la{" "}
            <a href={contact.privacyUrl} className="text-ink underline underline-offset-4">Política de Privacidad</a> sobre el
            tratamiento de mis datos para gestionar mi consulta o petición. *
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="comunicaciones" className="mt-1 size-4 accent-signal" />
          <span>Acepto recibir otras comunicaciones para estar al día de novedades sobre productos, servicios y eventos.</span>
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-signal-ink">{error}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" onClick={submit} className="px-6 py-3 text-[15px]">
          Enviar mensaje <IconArrowRight className="size-4" />
        </Button>
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">* Campos obligatorios</span>
      </div>
    </form>
  );
}
