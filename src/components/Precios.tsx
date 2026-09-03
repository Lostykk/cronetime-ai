import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PLANES_BASE = [
  { id: "starter", mes: 120, setup: 290, destacado: false },
  { id: "pro", mes: 290, setup: 490, destacado: true },
  { id: "agencia", mes: 490, setup: 790, destacado: false },
];

export default function Precios({ onAbrirCuestionario }: { onAbrirCuestionario: () => void }) {
  const { t } = useTranslation();
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" className="py-28 px-6" style={{ background: "var(--film-surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
            {t("precios.title")}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 mb-14">
          <span className="text-sm" style={{ color: !anual ? "var(--bone)" : "var(--muted)" }}>{t("precios.mensual")}</span>
          <button
            onClick={() => setAnual((v) => !v)}
            className="relative w-14 h-8 rounded-full transition-colors"
            style={{ background: anual ? "var(--projector)" : "var(--film-border)" }}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 rounded-full"
              style={{ background: "#0A0A0C" }}
              animate={{ left: anual ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className="text-sm flex items-center gap-2" style={{ color: anual ? "var(--bone)" : "var(--muted)" }}>
            {t("precios.anual")}
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(62,207,142,0.15)", color: "var(--signal-green)" }}>
              {t("precios.descuentoAnualBadge")}
            </span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANES_BASE.map((p, i) => {
            const precioMes = anual ? Math.round(p.mes * 0.8) : p.mes;
            const precioDescuento = Math.round(precioMes * 0.75);
            const nombre = t(`precios.planes.${p.id}.nombre`);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "var(--film-raised)",
                  border: p.destacado ? "1px solid var(--projector)" : "1px solid var(--film-border)",
                  boxShadow: p.destacado ? "0 20px 60px -20px rgba(255,158,44,0.4)" : "none",
                  transform: p.destacado ? "scale(1.04)" : "none",
                }}
              >
                {p.destacado && (
                  <span
                    className="absolute top-9 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "var(--projector)", color: "#0A0A0C" }}
                  >
                    {t("precios.masElegido")}
                  </span>
                )}

                <div
                  className="flex items-center justify-center gap-1.5"
                  style={{ background: "linear-gradient(135deg, #FF9E2C, #FF6B00)", color: "#000", fontWeight: 800, fontSize: 13, textAlign: "center", padding: "8px 16px", letterSpacing: "0.02em" }}
                >
                  <span>⚡</span>
                  <span>{t("precios.ofertaBanner")}</span>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold">{nombre}</h3>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-lg line-through" style={{ color: "var(--muted)" }}>US${precioMes}</span>
                    <span className="font-num text-4xl font-extrabold" style={{ color: "var(--projector)" }}>US${precioDescuento}</span>
                    <span className="text-sm" style={{ color: "var(--muted)" }}>{t("precios.perMes")}</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--signal-green)" }}>{t("precios.ahorras", { amount: precioMes - precioDescuento })}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{t("precios.instalacionUnica", { amount: p.setup })}</div>

                  <button
                    onClick={onAbrirCuestionario}
                    className="mt-7 w-full text-center py-3.5 rounded-full font-semibold"
                    style={p.destacado ? { background: "var(--projector)", color: "#0A0A0C" } : { border: "1px solid var(--film-border)", color: "var(--bone)" }}
                  >
                    {t("precios.elegir", { plan: nombre })}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8 text-sm" style={{ color: "var(--muted)" }}>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ color: "var(--signal-red)" }}
          >
            ●
          </motion.span>
          {t("precios.ofertaLimitada")}
        </div>

        <p className="text-center text-sm mt-4" style={{ color: "var(--muted)" }}>{t("precios.footnote")}</p>
      </div>
    </section>
  );
}
