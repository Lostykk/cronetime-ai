import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AgentDemoWidget from "../components/AgentDemoWidget";
import Cuestionario from "../components/Cuestionario";

const ACENTO = "#22D3EE";

export default function SetterDemoPublica() {
  // Llegar con #contratar (desde el botón "Quiero contratar a Martina — Setter"
  // de la landing principal) abre directo el formulario de contratación.
  const [cuestionarioAbierto, setCuestionarioAbierto] = useState(() => window.location.hash === "#contratar");

  useEffect(() => {
    document.title = "Probá el Setter de IA — CroneTime AI";
  }, []);

  return (
    <div className="grain min-h-screen flex flex-col items-center px-4 py-10" style={{ background: "var(--film-black)", color: "var(--bone)" }}>
      <a href="/" className="font-display text-lg font-extrabold uppercase mb-8">
        Crone<span className="text-projector">Time AI</span>
      </a>

      <div className="text-center mb-8 max-w-lg">
        <div className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: ACENTO }}>
          Demo en vivo
        </div>
        <h1 className="font-display text-3xl font-extrabold uppercase mb-2" style={{ letterSpacing: "-0.02em" }}>
          Probá el Setter de IA
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Chateá como si fueras un lead — el Setter responde en tiempo real y califica la conversación.
        </p>
      </div>

      <AgentDemoWidget agenteId="setter" nombre="Martina · Setter" emoji="🎯" acento={ACENTO} esSetter saludoInicial="" />

      <button
        onClick={() => setCuestionarioAbierto(true)}
        className="mt-6 px-6 py-3 rounded-xl font-bold text-sm"
        style={{ background: ACENTO, color: "#0A0A0C" }}
      >
        Quiero al Setter para mi negocio →
      </button>

      <div className="mt-6 text-xs text-center max-w-sm" style={{ color: "var(--muted)" }}>
        Demo de CroneTime AI · Sin cuenta · Máx. 15 mensajes por sesión
        <br />
        <a href="/" className="text-projector">cronetimeai.com</a>
      </div>

      <AnimatePresence>
        {cuestionarioAbierto && (
          <Cuestionario nichoInicial={undefined} onClose={() => setCuestionarioAbierto(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
