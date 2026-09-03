import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const PREGUNTAS = t("faq.items", { returnObjects: true }) as { p: string; r: string }[];
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold uppercase text-center mb-14" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
          {t("faq.title")}
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
