import { useEffect, useRef, useState } from "react";

const API = "https://sofia-server-production-5c12.up.railway.app";
const ACENTO = "#22D3EE";
const MENSAJES_MAX = 15;

interface Analisis {
  nicho: string;
  audiencia_objetivo: string;
  resultado_prometido?: string;
}

interface Mensaje {
  rol: "usuario" | "setter" | "sistema";
  texto: string;
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-3.5 py-3 rounded-2xl rounded-bl-sm w-fit" style={{ background: "var(--film-raised)" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "var(--muted)", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function SetterDemoPublica() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [fase, setFase] = useState<"ig" | "configurar" | "chat">("ig");
  const [igInput, setIgInput] = useState("");
  const [analizando, setAnalizando] = useState(false);
  const [analisis, setAnalisis] = useState<Analisis | null>(null);
  const [errorIG, setErrorIG] = useState("");
  const [mensajeBienvenida, setMensajeBienvenida] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [errorArchivo, setErrorArchivo] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [errorChat, setErrorChat] = useState("");
  const [limite, setLimite] = useState(false);
  const [msgsUsados, setMsgsUsados] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Probá el Setter de IA — CroneTime AI";
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, enviando]);

  async function handleAnalizar() {
    if (!igInput.trim() || analizando) return;
    setAnalizando(true);
    setErrorIG("");

    try {
      const res = await fetch(`${API}/api/demo-publica/analizar-ig`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, instagram_handle: igInput.trim() }),
      });
      const data = await res.json();

      setAnalisis(data.analisis || null);
      setMensajeBienvenida(data.mensaje_bienvenida || "¡Hola! ¿En qué puedo ayudarte?");
      setFase("configurar");
    } catch {
      setErrorIG("Error de conexión. Intentá de nuevo.");
    } finally {
      setAnalizando(false);
    }
  }

  function saltarIG() {
    setFase("chat");
    setMensajes([{
      rol: "setter",
      texto: "¡Hola! Soy Martina, del equipo de Método Escala 👋 ¿En qué tipo de negocio o programa trabajás?",
    }]);
  }

  async function subirArchivoYContinuar() {
    if (archivo) {
      setSubiendoArchivo(true);
      setErrorArchivo("");
      try {
        const formData = new FormData();
        formData.append("session_id", sessionId);
        formData.append("archivo", archivo);
        const res = await fetch(`${API}/api/demo-publica/subir-conocimiento`, { method: "POST", body: formData });
        const data = await res.json();
        if (data.error) {
          setErrorArchivo(data.error);
          setSubiendoArchivo(false);
          return;
        }
      } catch {
        setErrorArchivo("Error de conexión al subir el archivo.");
        setSubiendoArchivo(false);
        return;
      }
      setSubiendoArchivo(false);
    }

    setFase("chat");
    setMensajes([{ rol: "setter", texto: mensajeBienvenida }]);
  }

  async function enviar() {
    if (!input.trim() || enviando || limite) return;
    const texto = input.trim();
    setInput("");
    setErrorChat("");
    setMensajes((prev) => [...prev, { rol: "usuario", texto }]);
    setEnviando(true);

    try {
      const res = await fetch(`${API}/api/demo-publica/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, mensaje: texto }),
      });
      const data = await res.json();

      if (data.error === "límite_alcanzado") {
        setLimite(true);
        setMensajes((prev) => [...prev, { rol: "setter", texto: data.mensaje }]);
        return;
      }
      if (data.error) {
        setErrorChat(data.error);
        return;
      }

      setMsgsUsados(data.mensajes_usados || 0);
      setMensajes((prev) => [...prev, { rol: "setter", texto: data.respuesta }]);

      if (data.lead_calificado) {
        setMensajes((prev) => [...prev, {
          rol: "sistema",
          texto: "🔥 ¡El Setter te calificó como lead! En una cuenta real, el equipo recibiría una notificación y se pondría en contacto por WhatsApp o Instagram.",
        }]);
      }
    } catch {
      setErrorChat("Error de conexión. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

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

      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "var(--film-surface)", border: `1px solid ${ACENTO}44` }}
      >
        <div
          className="px-5 py-4 flex items-center gap-3"
          style={{ background: "var(--film-raised)", borderBottom: "1px solid var(--film-border)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
            style={{ background: `linear-gradient(140deg, ${ACENTO}, ${ACENTO}99)`, color: "#0A0A0C" }}
          >
            🎯
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">Martina · Setter</div>
            <div className="text-[11px] flex items-center gap-1.5" style={{ color: "var(--signal-green)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--signal-green)" }} />
              {fase === "ig" || fase === "configurar" ? "Configurando nicho..." : "En línea · responde al instante"}
            </div>
          </div>
          {fase === "chat" && (
            <div className="text-[11px] shrink-0" style={{ color: "var(--muted)" }}>
              {msgsUsados}/{MENSAJES_MAX} msgs
            </div>
          )}
        </div>

        {fase === "ig" && (
          <div className="p-6">
            <div className="text-sm font-bold mb-1.5" style={{ color: ACENTO }}>
              🔍 Adaptá el Setter a un creador (opcional)
            </div>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
              Ingresá el Instagram de un creador de infoproductos y el Setter adoptará su nicho automáticamente para la demo.
            </p>

            <div className="flex gap-2 mb-2.5">
              <input
                value={igInput}
                onChange={(e) => setIgInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalizar()}
                placeholder="@usuario_de_instagram"
                className="flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "var(--film-black)", border: `1px solid ${ACENTO}33`, color: "var(--bone)" }}
              />
              <button
                onClick={handleAnalizar}
                disabled={analizando || !igInput.trim()}
                className="px-4 py-2.5 rounded-xl font-bold text-sm shrink-0"
                style={{ background: ACENTO, color: "#0A0A0C", opacity: analizando || !igInput.trim() ? 0.5 : 1 }}
              >
                {analizando ? "⏳" : "→"}
              </button>
            </div>

            {errorIG && <div className="text-xs mb-2" style={{ color: "var(--signal-red)" }}>{errorIG}</div>}

            <button onClick={saltarIG} className="text-xs underline" style={{ color: "var(--muted)" }}>
              Saltar → chatear directamente con el Setter
            </button>
          </div>
        )}

        {fase === "configurar" && (
          <div className="p-6">
            <div className="text-sm font-bold mb-1.5" style={{ color: ACENTO }}>
              📄 Personalizar el Setter (opcional)
            </div>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
              Subí tu guion o estructura de setting (PDF, DOCX o TXT) para que el Setter la siga al pie de la letra en esta demo.
            </p>

            <label
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer mb-2.5"
              style={{ background: "var(--film-black)", border: `1px dashed ${ACENTO}44`, color: archivo ? ACENTO : "var(--muted)" }}
            >
              📎 {archivo ? archivo.name : "Elegí un archivo (máx. 10MB)"}
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                disabled={subiendoArchivo}
                onChange={(e) => setArchivo(e.target.files?.[0] || null)}
              />
            </label>

            {errorArchivo && <div className="text-xs mb-2" style={{ color: "var(--signal-red)" }}>{errorArchivo}</div>}

            <button
              onClick={subirArchivoYContinuar}
              disabled={subiendoArchivo}
              className="w-full py-2.5 rounded-xl font-bold text-sm"
              style={{ background: ACENTO, color: "#0A0A0C", opacity: subiendoArchivo ? 0.6 : 1 }}
            >
              {subiendoArchivo ? "Procesando…" : archivo ? "🚀 Activar Setter personalizado" : "Continuar sin archivo"}
            </button>
          </div>
        )}

        {fase === "chat" && (
          <>
            {analisis && (
              <div
                className="px-4 py-2 text-xs flex flex-wrap gap-x-4 gap-y-1"
                style={{ background: `${ACENTO}14`, borderBottom: `1px solid ${ACENTO}22`, color: "var(--muted)" }}
              >
                <span><strong style={{ color: ACENTO }}>Nicho:</strong> {analisis.nicho}</span>
                <span><strong style={{ color: ACENTO }}>Audiencia:</strong> {analisis.audiencia_objetivo}</span>
              </div>
            )}

            <div className="h-[380px] overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
              {mensajes.map((m, i) => (
                <div key={i} className={`flex ${m.rol === "usuario" ? "justify-end" : "justify-start"}`}>
                  {m.rol === "sistema" ? (
                    <div
                      className="w-full text-center px-3 py-2 rounded-xl text-xs"
                      style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#f59e0b" }}
                    >
                      {m.texto}
                    </div>
                  ) : (
                    <div
                      className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={
                        m.rol === "usuario"
                          ? { background: ACENTO, color: "#0A0A0C", borderBottomRightRadius: 4 }
                          : { background: "var(--film-raised)", color: "var(--bone)", borderBottomLeftRadius: 4 }
                      }
                    >
                      {m.texto}
                    </div>
                  )}
                </div>
              ))}
              {enviando && <TypingDots />}
              {errorChat && <div className="text-xs" style={{ color: "var(--signal-red)" }}>{errorChat}</div>}
              <div ref={bottomRef} />
            </div>

            <div className="p-3.5" style={{ background: "var(--film-raised)", borderTop: "1px solid var(--film-border)" }}>
              {limite ? (
                <div className="text-center p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <div className="font-bold mb-1">Demo finalizada 🎉</div>
                  <div className="text-xs mb-2.5" style={{ color: "var(--muted)" }}>¿Querés el Setter para tu negocio?</div>
                  <a
                    href="/#precios"
                    className="inline-block px-5 py-2 rounded-lg font-bold text-sm"
                    style={{ background: "var(--projector)", color: "#0A0A0C" }}
                  >
                    Ver planes →
                  </a>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
                    placeholder="Escribí como si fueras un lead..."
                    disabled={enviando}
                    className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
                    style={{ background: "var(--film-black)", border: `1px solid ${input ? ACENTO + "66" : "var(--film-border)"}`, color: "var(--bone)" }}
                  />
                  <button
                    onClick={enviar}
                    disabled={enviando || !input.trim()}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: input.trim() ? ACENTO : "var(--film-border)", color: "#0A0A0C" }}
                  >
                    ➤
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 text-xs text-center max-w-sm" style={{ color: "var(--muted)" }}>
        Demo de CroneTime AI · Sin cuenta · Máx. 15 mensajes por sesión
        <br />
        <a href="/" className="text-projector">cronetimeai.com</a>
      </div>
    </div>
  );
}
