import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RUTA_AGENTE } from "../data/agentes";
import { useAgentes } from "../hooks/useAgentes";
import AgentAvatar from "./AgentAvatar";

export default function Agentes() {
  const { t } = useTranslation();
  const AGENTES = useAgentes();

  return (
    <section id="agentes" className="py-28 px-6" style={{ background: "var(--film-surface)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-0.02em" }}>
            {t("agentesSection.title")}
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
            {t("agentesSection.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTES.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="rounded-2xl p-6 text-left"
              style={{ background: "var(--film-raised)", border: "1px solid var(--film-border)" }}
            >
              <div className="flex items-center gap-4">
                <AgentAvatar agente={a} size={56} />
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold uppercase" style={{ letterSpacing: "-0.01em" }}>{a.nombre}</div>
                  <div className="text-sm truncate" style={{ color: "var(--muted)" }}>{a.nicho}</div>
                </div>
              </div>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>{a.descripcion}</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={RUTA_AGENTE[a.id]}
                  className="block text-center text-sm font-semibold rounded-lg px-4 py-2.5 no-underline"
                  style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "var(--bone)" }}
                >
                  💬 {t("agentesSection.verDemo", { nombre: a.nombre })}
                </a>
                <a
                  href={`${RUTA_AGENTE[a.id]}#contratar`}
                  className="block text-center text-sm font-bold rounded-lg px-4 py-2.5 no-underline"
                  style={{ background: a.color, color: "#0A0A0C" }}
                >
                  {t("agentesSection.contratar", { nombre: a.nombre })} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
