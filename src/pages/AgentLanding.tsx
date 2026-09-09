import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAgenteById } from "../hooks/useAgentes";
import { nichoCodeDeAgenteId } from "../data/agentes";
import AgentDemoWidget from "../components/AgentDemoWidget";
import AgentAvatar from "../components/AgentAvatar";
import Cuestionario from "../components/Cuestionario";

interface Dolor {
  stat: string;
  titulo: string;
  desc: string;
}

interface Funcion {
  icon: string;
  titulo: string;
  desc: string;
}

interface LandingContent {
  titulo: string;
  subtitulo: string;
  dolores: Dolor[];
  funciones: Funcion[];
  saludoDemo: string;
}

export default function AgentLanding({ agenteId }: { agenteId: string }) {
  const { t } = useTranslation();
  const agente = useAgenteById(agenteId);
  const contenido = t(`landing.${agenteId}`, { returnObjects: true }) as LandingContent;
  // Llegar con #contratar (desde el botón "Quiero contratar a X" de la
  // landing principal) abre directo el formulario de contratación.
  const [cuestionarioAbierto, setCuestionarioAbierto] = useState(() => window.location.hash === "#contratar");

  useEffect(() => {
    document.title = agente ? `${agente.nombre} — CroneTime AI` : "CroneTime AI";
  }, [agente]);

  if (!agente || !contenido?.dolores) return null;

  const color = agente.color;

  return (
    <div className="grain min-h-screen" style={{ background: "var(--film-black)", color: "var(--bone)" }}>
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="/" className="font-display text-lg font-extrabold uppercase">
          Crone<span className="text-projector">Time AI</span>
        </a>
        <a
          href="/#agentes"
          className="text-sm font-semibold hidden sm:block"
          style={{ color: "var(--muted)" }}
        >
          ← Ver los 7 agentes
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* HERO */}
        <section className="py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-6"
              style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}
            >
              Para {agente.nicho}
            </div>
            <h1 className="font-display font-extrabold uppercase leading-[1.05] mb-5" style={{ fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-0.02em" }}>
              {contenido.titulo}
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
              {contenido.subtitulo}. Activo en 48 horas, sin que necesites saber nada de tecnología.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#demo"
                className="px-6 py-3.5 rounded-xl font-bold text-sm"
                style={{ background: color, color: "#0A0A0C" }}
              >
                Ver a {agente.nombre} en acción →
              </a>
              <button
                onClick={() => setCuestionarioAbierto(true)}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm"
                style={{ border: "1px solid var(--film-border)", color: "var(--bone)" }}
              >
                Quiero este agente para mi negocio
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <AgentAvatar agente={agente} size={160} />
          </div>
        </section>

        {/* DOLORES */}
        <section className="py-14 border-t" style={{ borderColor: "var(--film-border)" }}>
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color }}>
            — El problema real
          </div>
          <h2 className="font-display font-extrabold uppercase mb-10" style={{ fontSize: "clamp(24px,3.5vw,36px)", letterSpacing: "-0.02em" }}>
            Por qué perdés clientes sin darte cuenta
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {contenido.dolores.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: "var(--film-raised)", border: "1px solid var(--film-border)" }}
              >
                <div className="font-display font-extrabold mb-2" style={{ fontSize: "2.4rem", color, letterSpacing: "-0.03em" }}>
                  {d.stat}
                </div>
                <h3 className="font-bold text-sm mb-2">{d.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FUNCIONES */}
        <section className="py-14 border-t" style={{ borderColor: "var(--film-border)" }}>
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color }}>
            — Lo que hace
          </div>
          <h2 className="font-display font-extrabold uppercase mb-10" style={{ fontSize: "clamp(24px,3.5vw,36px)", letterSpacing: "-0.02em" }}>
            Todo lo que {agente.nombre} hace por vos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contenido.funciones.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="rounded-2xl p-6"
                style={{ background: "var(--film-raised)", border: "1px solid var(--film-border)" }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-sm mb-2">{f.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DEMO EN VIVO */}
        <section id="demo" className="py-14 border-t text-center" style={{ borderColor: "var(--film-border)" }}>
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color }}>
            — Demo en vivo
          </div>
          <h2 className="font-display font-extrabold uppercase mb-2" style={{ fontSize: "clamp(24px,3.5vw,36px)", letterSpacing: "-0.02em" }}>
            Así habla {agente.nombre}
          </h2>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            Una conversación real. Escribile como si fueras un cliente tuyo.
          </p>
          <AgentDemoWidget
            agenteId={agenteId}
            nombre={agente.nombre}
            emoji={agente.emoji}
            acento={color}
            saludoInicial={contenido.saludoDemo}
          />
        </section>

        {/* CTA FINAL */}
        <section id="contratar" className="py-16 border-t text-center" style={{ borderColor: "var(--film-border)" }}>
          <h2 className="font-display font-extrabold uppercase mb-4" style={{ fontSize: "clamp(24px,3.5vw,36px)", letterSpacing: "-0.02em" }}>
            Activo en 48 horas
          </h2>
          <p className="max-w-md mx-auto mb-8" style={{ color: "var(--muted)" }}>
            Contanos de tu negocio y activamos a {agente.nombre} configurado con tu tono y tu información.
          </p>
          <button
            onClick={() => setCuestionarioAbierto(true)}
            className="px-8 py-4 rounded-xl font-bold text-base"
            style={{ background: color, color: "#0A0A0C" }}
          >
            Quiero a {agente.nombre} para mi negocio →
          </button>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-center text-xs" style={{ color: "var(--muted)" }}>
        © 2026 CroneTime AI · <a href="/" className="text-projector">cronetimeai.com</a>
      </footer>

      <AnimatePresence>
        {cuestionarioAbierto && (
          <Cuestionario nichoInicial={nichoCodeDeAgenteId(agenteId)} onClose={() => setCuestionarioAbierto(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
