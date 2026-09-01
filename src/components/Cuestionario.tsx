import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AGENTES, NICHOS, NICHO_A_AGENTE } from "../data/agentes";
import AgentAvatar from "./AgentAvatar";
import { abrirWhatsApp } from "../lib/whatsapp";

export default function Cuestionario({ nichoInicial, onClose }: { nichoInicial?: string; onClose: () => void }) {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [nicho, setNicho] = useState(nichoInicial || "");
  const [necesidad, setNecesidad] = useState("");
  const [terminado, setTerminado] = useState(false);

  const total = 4;
  const puedeAvanzar =
    (paso === 1 && nombre.trim().length > 0) ||
    (paso === 2 && negocio.trim().length > 0) ||
    (paso === 3 && nicho.length > 0) ||
    (paso === 4 && necesidad.trim().length > 0);

  function siguiente() {
    if (!puedeAvanzar) return;
    if (paso < total) setPaso((p) => p + 1);
    else setTerminado(true);
  }

  const agenteAsignado = AGENTES.find((a) => a.nombre === NICHO_A_AGENTE[nicho]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,12,0.9)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl p-8"
        style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)" }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-2xl leading-none" style={{ color: "var(--muted)" }} aria-label="Cerrar">✕</button>

        {!terminado ? (
          <>
            <div className="h-1 rounded-full overflow-hidden mb-8" style={{ background: "var(--film-border)" }}>
              <motion.div
                className="h-full"
                style={{ background: "var(--projector)" }}
                animate={{ width: `${(paso / total) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Paso {paso} de {total}</p>

            <div className="relative overflow-hidden" style={{ minHeight: 160 }}>
              <AnimatePresence mode="wait" initial={false}>
                {paso === 1 && (
                  <motion.div key={1} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-2xl font-extrabold mb-5">¿Cómo te llamás?</h3>
                    <input
                      autoFocus
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && siguiente()}
                      placeholder="Tu nombre"
                      className="w-full px-5 py-4 rounded-xl text-base outline-none"
                      style={{ background: "var(--film-black)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
                    />
                  </motion.div>
                )}
                {paso === 2 && (
                  <motion.div key={2} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-2xl font-extrabold mb-5">¿Cómo se llama tu negocio?</h3>
                    <input
                      autoFocus
                      value={negocio}
                      onChange={(e) => setNegocio(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && siguiente()}
                      placeholder="Nombre del negocio"
                      className="w-full px-5 py-4 rounded-xl text-base outline-none"
                      style={{ background: "var(--film-black)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
                    />
                  </motion.div>
                )}
                {paso === 3 && (
                  <motion.div key={3} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-2xl font-extrabold mb-5">¿Qué rubro es?</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {NICHOS.map((n) => (
                        <button
                          key={n}
                          onClick={() => setNicho(n)}
                          className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors"
                          style={
                            nicho === n
                              ? { background: "var(--projector)", color: "#0A0A0C" }
                              : { background: "var(--film-black)", border: "1px solid var(--film-border)", color: "var(--bone)" }
                          }
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                {paso === 4 && (
                  <motion.div key={4} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-2xl font-extrabold mb-5">¿Qué es lo que más necesitás resolver?</h3>
                    <textarea
                      autoFocus
                      value={necesidad}
                      onChange={(e) => setNecesidad(e.target.value)}
                      rows={3}
                      placeholder="Contanos brevemente"
                      className="w-full px-5 py-4 rounded-xl text-base outline-none resize-none"
                      style={{ background: "var(--film-black)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-8">
              {paso > 1 && (
                <button
                  onClick={() => setPaso((p) => p - 1)}
                  className="px-6 py-3.5 rounded-xl font-medium"
                  style={{ border: "1px solid var(--film-border)", color: "var(--bone)" }}
                >
                  Atrás
                </button>
              )}
              <button
                onClick={siguiente}
                disabled={!puedeAvanzar}
                className="flex-1 py-3.5 rounded-xl font-semibold"
                style={{ background: "var(--projector)", color: "#0A0A0C", opacity: puedeAvanzar ? 1 : 0.4 }}
              >
                {paso < total ? "Siguiente" : "Ver mi agente"}
              </button>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
            {agenteAsignado && (
              <div className="flex justify-center mb-5">
                <AgentAvatar agente={agenteAsignado} size={96} />
              </div>
            )}
            <h3 className="font-display text-2xl font-extrabold">
              {nombre.split(" ")[0]}, tu agente es {agenteAsignado?.nombre}
            </h3>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              Escribinos y en 24 horas lo tenés funcionando en tu negocio.
            </p>
            <button
              onClick={() => abrirWhatsApp({ nombre, negocio, nicho, necesidad })}
              className="w-full mt-7 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
              style={{ background: "var(--signal-green)", color: "#0A0A0C" }}
            >
              💬 Escribir por WhatsApp
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
