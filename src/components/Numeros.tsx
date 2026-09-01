import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS: { valor: number; sufijo?: string; prefijo?: string; label: string; esTexto?: string }[] = [
  { valor: 4, sufijo: "s", label: "Tiempo de respuesta promedio" },
  { valor: 0, esTexto: "24/7", label: "Horas de atención" },
  { valor: 0, label: "Mensajes sin responder" },
  { valor: 365, label: "Días del año trabajando" },
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
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: "var(--film-surface)" }}>
      <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Counter valor={s.valor} sufijo={s.sufijo} esTexto={s.esTexto} />
            <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
