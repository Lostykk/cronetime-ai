import { motion } from "framer-motion";

const FILAS = [
  ["Mensajes sin responder a las 2 AM", "Atención instantánea las 24hs"],
  ["Reservas perdidas en hora pico", "Cero reservas perdidas"],
  ["El dueño pegado al teléfono", "Panel de control desde cualquier lado"],
  ["Quejas que se enteran por Google", "Aviso en tiempo real para resolverlo"],
  ["Solo atiende mientras está abierto", "Trabaja los 365 días del año"],
];

export default function Comparacion() {
  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold uppercase text-center mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
          Lo que tenías vs lo que tenés<br className="hidden sm:block" /> con <span className="text-projector">CroneTime AI</span>
        </h2>

        <div className="mt-14 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--film-border)" }}>
          <div className="grid grid-cols-2 text-sm font-semibold uppercase tracking-wide">
            <div className="px-6 py-4" style={{ background: "var(--film-surface)", color: "var(--muted)" }}>Sin CroneTime AI</div>
            <div className="px-6 py-4" style={{ background: "rgba(62,207,142,0.08)", color: "var(--signal-green)" }}>Con CroneTime AI</div>
          </div>
          {FILAS.map(([antes, despues], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-2 text-sm"
              style={{ borderTop: "1px solid var(--film-border)" }}
            >
              <div className="px-6 py-5 flex items-center gap-2.5" style={{ color: "var(--muted)" }}>
                <span style={{ color: "var(--signal-red)" }}>✕</span> {antes}
              </div>
              <div className="px-6 py-5 flex items-center gap-2.5" style={{ background: "rgba(62,207,142,0.04)", color: "var(--bone)" }}>
                <span style={{ color: "var(--signal-green)" }}>✓</span> {despues}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
