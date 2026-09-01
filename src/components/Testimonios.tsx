import { motion } from "framer-motion";
import { AGENTES } from "../data/agentes";

const TESTIMONIOS = [
  {
    nombre: "Rodrigo Ibáñez",
    negocio: "La Parrilla del Che",
    ciudad: "Córdoba",
    agente: "Sofía",
    emoji: "🍽️",
    texto: "Sofía nos recupera 3 o 4 mesas por semana que antes se perdían porque no llegábamos a contestar en hora pico. Solo con eso ya se paga sola.",
  },
  {
    nombre: "Valeria Sosa",
    negocio: "Inmobiliaria Sosa & Asociados",
    ciudad: "Rosario",
    agente: "Marcos",
    emoji: "🏠",
    texto: "Marcos agenda las visitas solo. Yo llego a mostrar la propiedad y el cliente ya viene calificado, con el presupuesto claro y con ganas. Cambió todo.",
  },
  {
    nombre: "Dra. Luciana Peralta",
    negocio: "Clínica Dental Peralta",
    ciudad: "Mendoza",
    agente: "María",
    emoji: "🦷",
    texto: "Antes perdía turnos porque no podía estar en el teléfono y en el consultorio al mismo tiempo. María lo resuelve. La agenda se llena sola.",
  },
  {
    nombre: "Florencia Ávalos",
    negocio: "Centro de Estética Lumière",
    ciudad: "Tucumán",
    agente: "Pía",
    emoji: "✨",
    texto: "Mis clientas dicen que la atención mejoró muchísimo. Pía responde a cualquier hora, ofrece los paquetes en el momento justo y no se le escapa nada.",
  },
  {
    nombre: "Lic. Martín Ferreyra",
    negocio: "Ferreyra Inversiones",
    ciudad: "Buenos Aires",
    agente: "Emanuel",
    emoji: "📊",
    texto: "Emanuel filtra los contactos que no están listos y me manda solo los que tienen intención real. Mi tiempo de cierre bajó a la mitad.",
  },
  {
    nombre: "Cecilia Romero",
    negocio: "Viajes Del Sol",
    ciudad: "Salta",
    agente: "Javier",
    emoji: "✈️",
    texto: "Javier cotiza y genera urgencia mejor que cualquier vendedor que tuve. Cuando el cliente llega a hablar conmigo, ya quiere comprar.",
  },
];

export default function Testimonios() {
  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
            Lo que dicen los que ya lo usan
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => {
            const agente = AGENTES.find((a) => a.nombre === t.agente);
            const color = agente?.color ?? "var(--projector)";
            const colorSecundario = agente?.colorSecundario ?? "var(--projector-dim)";
            return (
              <motion.div
                key={t.nombre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)" }}
              >
                <div className="flex gap-0.5 mb-4" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#F5C542">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed italic flex-1" style={{ color: "var(--bone)" }}>
                  “{t.texto}”
                </p>

                <div className="flex items-center gap-3 mt-6 pt-6" style={{ borderTop: "1px solid var(--film-border)" }}>
                  <div
                    className="rounded-full flex items-center justify-center shrink-0 font-num font-extrabold"
                    style={{
                      width: 44,
                      height: 44,
                      background: `linear-gradient(150deg, ${color}, ${colorSecundario})`,
                      color: "#0A0A0C",
                      fontSize: 17,
                    }}
                  >
                    {t.nombre[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{t.nombre}</div>
                    <div className="text-xs truncate" style={{ color: "var(--muted)" }}>{t.negocio} · {t.ciudad}</div>
                  </div>
                </div>

                <div
                  className="mt-4 inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "var(--film-black)", border: `1px solid ${color}66`, color }}
                >
                  <span>{t.emoji}</span>
                  Usa {t.agente}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
