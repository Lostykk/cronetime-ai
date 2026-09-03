import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const STATS_BASE: { valor: number; sufijo?: string; esTexto?: string }[] = [
  { valor: 4, sufijo: "s" },
  { valor: 0, esTexto: "24/7" },
  { valor: 0 },
  { valor: 365 },
];

function Counter({ valor, prefijo = "", sufijo = "", esTexto }: { valor: number; prefijo?: string; sufijo?: string; esTexto?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const duration = 1500;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * valor));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, valor]);

  return (
    <div ref={ref} className="font-num font-extrabold text-projector" style={{ fontSize: "clamp(40px,6vw,64px)" }}>
      {esTexto || `${prefijo}${n}${sufijo}`}
    </div>
  );
}

export default function Numeros() {
  const { t } = useTranslation();
  const labels = t("numeros.labels", { returnObjects: true }) as string[];

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "var(--film-surface)" }}>
      <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {STATS_BASE.map((s, i) => (
          <motion.div
            key={labels[i]}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Counter valor={s.valor} sufijo={s.sufijo} esTexto={s.esTexto} />
            <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>{labels[i]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
