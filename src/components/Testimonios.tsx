import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AGENTES_BASE } from "../data/agentes";
import { useAgentes } from "../hooks/useAgentes";

interface TestimonioItem {
  agenteId: string;
  nombre: string;
  negocio: string;
  ciudad: string;
  emoji: string;
  texto: string;
}

export default function Testimonios() {
  const { t } = useTranslation();
  const AGENTES = useAgentes();
  const TESTIMONIOS = t("testimonios.items", { returnObjects: true }) as TestimonioItem[];

  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
            {t("testimonios.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIOS.map((tst, i) => {
            const agenteBase = AGENTES_BASE.find((a) => a.id === tst.agenteId);
            const agente = AGENTES.find((a) => a.id === tst.agenteId);
            const color = agenteBase?.color ?? "var(--projector)";
            const colorSecundario = agenteBase?.colorSecundario ?? "var(--projector-dim)";
            return (
              <motion.div
                key={tst.nombre}
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
                  “{tst.texto}”
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
                    {tst.nombre[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{tst.nombre}</div>
                    <div className="text-xs truncate" style={{ color: "var(--muted)" }}>{tst.negocio} · {tst.ciudad}</div>
                  </div>
                </div>

                <div
                  className="mt-4 inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "var(--film-black)", border: `1px solid ${color}66`, color }}
                >
                  <span>{tst.emoji}</span>
                  {t("testimonios.usa", { agente: agente?.nombre ?? "" })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
