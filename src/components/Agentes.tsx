import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Agente } from "../data/agentes";
import { RUTA_AGENTE } from "../data/agentes";
import { useAgentes } from "../hooks/useAgentes";
import AgentAvatar from "./AgentAvatar";

export default function Agentes({ onOpenAgente }: { onOpenAgente: (a: Agente) => void }) {
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
              <button onClick={() => (a.id === "setter" ? (window.location.href = RUTA_AGENTE[a.id]) : onOpenAgente(a))} className="w-full text-left">
                <div className="flex items-center gap-4">
                  <AgentAvatar agente={a} size={56} />
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold uppercase" style={{ letterSpacing: "-0.01em" }}>{a.nombre}</div>
                    <div className="text-sm truncate" style={{ color: "var(--muted)" }}>{a.nicho}</div>
                  </div>
                </div>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>{a.descripcion}</p>
                <div className="mt-4 text-sm font-semibold flex items-center gap-1.5" style={{ color: a.color }}>
                  {t("agentesSection.verDemo")} <span aria-hidden>→</span>
                </div>
              </button>
              {RUTA_AGENTE[a.id] && (
                <a
                  href={RUTA_AGENTE[a.id]}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--film-black)", border: "1px solid var(--film-border)", color: "var(--muted)" }}
                >
                  Hablar con {a.nombre} en vivo →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
