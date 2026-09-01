import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PREGUNTAS = [
  { p: "¿Cómo se conecta al WhatsApp de mi negocio?", r: "Vinculamos el agente a tu número de WhatsApp Business existente. No cambiás de número ni instalás nada del lado del cliente." },
  { p: "¿Mis clientes saben que es una IA?", r: "El agente se presenta con nombre propio y responde de forma natural. Si en algún momento no puede resolver algo, deriva al encargado de inmediato." },
  { p: "¿Qué pasa si el agente no sabe responder algo?", r: "Se disculpa, avisa que se lo pasa al encargado, y queda registrado en el panel como algo que necesita tu atención." },
  { p: "¿Cuánto tiempo lleva la instalación?", r: "Menos de 48 horas desde que nos pasás la info de tu negocio hasta que el agente está respondiendo en tu WhatsApp real." },
  { p: "¿Puedo cambiar la información del agente después?", r: "Sí, en cualquier momento desde el panel: menú, precios, horarios, reglas de la casa — todo editable." },
  { p: "¿Funciona para cualquier tamaño de negocio?", r: "Sí. Desde un local con un solo dueño hasta cadenas con varias sucursales, cada plan escala según cuántos agentes necesites." },
  { p: "¿Hay permanencia o contrato?", r: "No. Es un abono mensual sin permanencia. Solo pagás una vez la instalación inicial." },
  { p: "¿Qué pasa si quiero cancelar?", r: "Cancelás cuando quieras desde el panel, sin penalidades ni preguntas." },
];

export default function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold uppercase text-center mb-14" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
          Preguntas frecuentes
        </h2>

        <div className="space-y-3">
          {PREGUNTAS.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)" }}>
              <button
                onClick={() => setAbierta(abierta === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold">{item.p}</span>
                <motion.span animate={{ rotate: abierta === i ? 45 : 0 }} className="text-2xl shrink-0 text-projector">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.r}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
