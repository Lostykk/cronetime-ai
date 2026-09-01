import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Agente } from "../data/agentes";
import { DEMOS, type MensajeDemo } from "../data/demos";
import AgentAvatar from "./AgentAvatar";

function TypingDots() {
  return (
    <div className="flex gap-1 px-3.5 py-3 rounded-2xl rounded-bl-sm w-fit" style={{ background: "var(--film-raised)" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--muted)" }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function DemoModal({
  agente,
  onClose,
  onQuerer,
}: {
  agente: Agente;
  onClose: () => void;
  onQuerer: (agente: Agente) => void;
}) {
  const escenasAgente = DEMOS[agente.id] || {};
  const nombresEscenas = Object.keys(escenasAgente);
  const [escena, setEscena] = useState(nombresEscenas[0]);
  const [visibles, setVisibles] = useState<MensajeDemo[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [mostrarAccion, setMostrarAccion] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
    setVisibles([]);
    setMostrarAccion(false);
    setEscribiendo(false);

    const data = escenasAgente[escena];
    if (!data) return;
    let delay = 400;

    data.mensajes.forEach((m, i) => {
      if (m.de === "agente") {
        timeouts.current.push(window.setTimeout(() => setEscribiendo(true), delay));
        delay += 900;
        timeouts.current.push(
          window.setTimeout(() => {
            setEscribiendo(false);
            setVisibles((v) => [...v, m]);
          }, delay)
        );
        delay += 300;
      } else {
        timeouts.current.push(window.setTimeout(() => setVisibles((v) => [...v, m]), delay));
        delay += 700;
      }
      if (i === data.mensajes.length - 1) {
        timeouts.current.push(window.setTimeout(() => setMostrarAccion(true), delay + 300));
      }
    });

    return () => timeouts.current.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escena, agente.id]);

  const accionActual = escenasAgente[escena]?.accion;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,12,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{ background: "var(--film-surface)", border: `1px solid ${agente.color}44` }}
      >
        <div className="px-6 py-5 flex items-center gap-4 sticky top-0 z-10" style={{ background: "var(--film-surface)", borderBottom: "1px solid var(--film-border)" }}>
          <AgentAvatar agente={agente} size={52} />
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl font-extrabold uppercase" style={{ letterSpacing: "-0.02em" }}>{agente.nombre}</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{agente.nicho}</p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none px-2" style={{ color: "var(--muted)" }} aria-label="Cerrar">✕</button>
        </div>

        <div className="p-6">
          {nombresEscenas.length > 1 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {nombresEscenas.map((n) => (
                <button
                  key={n}
                  onClick={() => setEscena(n)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={
                    escena === n
                      ? { background: agente.color, color: "#0A0A0C" }
                      : { background: "var(--film-raised)", border: "1px solid var(--film-border)", color: "var(--muted)" }
                  }
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "var(--film-black)", border: "1px solid var(--film-border)", height: 380 }}>
              <div className="px-4 py-3 flex items-center gap-2.5 shrink-0" style={{ background: "var(--film-raised)", borderBottom: "1px solid var(--film-border)" }}>
                <AgentAvatar agente={agente} size={30} />
                <div>
                  <div className="text-sm font-semibold">{agente.nombre}</div>
                  <div className="text-[10px]" style={{ color: "var(--signal-green)" }}>en línea</div>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-2.5 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {visibles.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.de === "cliente" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm"
                        style={
                          m.de === "cliente"
                            ? { background: agente.color, color: "#0A0A0C", borderBottomRightRadius: 4 }
                            : { background: "var(--film-raised)", borderBottomLeftRadius: 4, color: "var(--bone)" }
                        }
                      >
                        {m.texto}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {escribiendo && <TypingDots />}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: "var(--muted)" }}>Panel del dueño</p>
              <div className="rounded-2xl p-6 flex-1 flex items-center" style={{ background: "var(--film-black)", border: "1px solid var(--film-border)" }}>
                <AnimatePresence mode="wait">
                  {mostrarAccion && accionActual ? (
                    <motion.div
                      key={accionActual.titulo}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", damping: 18 }}
                      className="rounded-xl p-5 w-full"
                      style={{ background: `${agente.color}18`, border: `1px solid ${agente.color}66` }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: agente.color }}>{accionActual.tipo}</span>
                      <h4 className="text-lg font-bold mt-1">{accionActual.titulo}</h4>
                      <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{accionActual.detalle}</p>
                    </motion.div>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--muted)" }}>Esperando que la conversación cierre en una acción…</p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <button
            onClick={() => onQuerer(agente)}
            className="w-full mt-6 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
            style={{ background: agente.color, color: "#0A0A0C" }}
          >
            Me interesa contratar a {agente.nombre} <span aria-hidden>→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
