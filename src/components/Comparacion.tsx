import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Comparacion() {
  const { t } = useTranslation();
  const FILAS = t("comparacion.filas", { returnObjects: true }) as { antes: string; despues: string }[];

  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold uppercase text-center mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
          {t("comparacion.title1")}<br className="hidden sm:block" /> {t("comparacion.titleWith")} <span className="text-projector">CroneTime AI</span>
        </h2>

        <div className="mt-14 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--film-border)" }}>
          <div className="grid grid-cols-2 text-sm font-semibold uppercase tracking-wide">
            <div className="px-6 py-4" style={{ background: "var(--film-surface)", color: "var(--muted)" }}>{t("comparacion.colSin")}</div>
            <div className="px-6 py-4" style={{ background: "rgba(62,207,142,0.08)", color: "var(--signal-green)" }}>{t("comparacion.colCon")}</div>
          </div>
          {FILAS.map((fila, i) => (
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
                <span style={{ color: "var(--signal-red)" }}>✕</span> {fila.antes}
              </div>
              <div className="px-6 py-5 flex items-center gap-2.5" style={{ background: "rgba(62,207,142,0.04)", color: "var(--bone)" }}>
                <span style={{ color: "var(--signal-green)" }}>✓</span> {fila.despues}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
