import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AGENTES_BASE, type Agente } from "../data/agentes";
import { useAgentes } from "../hooks/useAgentes";
import AgentAvatar from "./AgentAvatar";

const RADIO = 420;
const ANGULO_POR_CARTA = 360 / AGENTES_BASE.length;
const AUTO_MS = 15000;

function CartaAgente({ agente, i, indiceActivo, onOpen, anchoCarta }: { agente: Agente; i: number; indiceActivo: number; onOpen: (a: Agente) => void; anchoCarta: number }) {
  const { t } = useTranslation();
  let diff = i - indiceActivo;
  const n = AGENTES_BASE.length;
  if (diff > n / 2) diff -= n;
  if (diff < -n / 2) diff += n;

  const anguloRelativo = diff * ANGULO_POR_CARTA;
  const esFrente = diff === 0;

  return (
    <div
      className="absolute top-0 left-1/2"
      style={{
        width: anchoCarta,
        marginLeft: -anchoCarta / 2,
        transform: `rotateY(${anguloRelativo}deg) translateZ(${RADIO}px) scale(${esFrente ? 1 : 0.75})`,
        opacity: esFrente ? 1 : 0.35,
        filter: esFrente ? "none" : "blur(2px)",
        transition: "all 1.2s cubic-bezier(0.32, 0.72, 0, 1)",
        boxShadow: esFrente ? `0 0 80px -20px ${agente.color}` : "none",
        pointerEvents: esFrente ? "auto" : "none",
      }}
    >
      {/* max-height compensa la magnificación de perspective(1600)+translateZ(RADIO): la tarjeta
          frontal se ve ~1.36x más grande en pantalla que su tamaño real de layout, así que
          64svh/62svh de layout renderizan como ~90vh/88vh reales — que es el objetivo pedido.
          svh (no vh): en iOS Safari, 1vh se calcula contra el viewport más grande posible (con
          la barra de direcciones oculta) — con la barra visible (el estado normal al cargar la
          página) el viewport real es más chico, así que una carta en vh puede terminar más alta
          que la pantalla visible y tapar los ✔ y el botón. svh usa siempre el viewport más chico
          posible, así la carta nunca excede lo que realmente se ve. */}
      <div
        className="card-agente rounded-2xl flex flex-col items-center text-center px-5 py-3 max-md:px-[16px] max-md:py-2.5 max-h-[64svh] max-md:max-h-[62svh] gap-[4px] max-md:gap-[3px]"
        style={{
          background: "var(--film-surface)",
          border: `1px solid ${esFrente ? agente.color + "66" : "var(--film-border)"}`,
          overflowY: "auto",
          overflowX: "hidden",
          justifyContent: "space-between",
        }}
      >
        <AgentAvatar agente={agente} size={54} />
        <h3 className="font-display font-extrabold uppercase leading-none mt-1" style={{ letterSpacing: "-0.02em", fontSize: 22 }}>{agente.nombre}</h3>
        <p className="leading-none" style={{ color: "var(--muted)", fontSize: 13 }}>{agente.nicho}</p>
        <p
          className="mt-1 leading-snug w-full"
          style={{ fontSize: 13, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {agente.descripcion}
        </p>

        <ul className="mt-1 space-y-px text-left w-full">
          {agente.hace.slice(0, 4).map((h) => (
            <li key={h} className="flex items-center gap-2" style={{ fontSize: 12 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ color: agente.color, flexShrink: 0 }}>
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <div className="w-full mt-1 pt-1" style={{ borderTop: "1px solid var(--film-border)" }}>
          <div className="font-num font-bold leading-tight" style={{ color: "var(--projector)", fontSize: 28 }}>
            US${agente.precio}<span className="font-normal" style={{ color: "var(--muted)", fontSize: 11 }}>{t("hero.perMes")}</span>
          </div>
          <div className="leading-none" style={{ color: "var(--muted)", fontSize: 11 }}>+ US${agente.setup} {t("hero.instalacionLabel")}</div>
        </div>

        <button
          onClick={() => onOpen(agente)}
          className="w-full mt-1 rounded-xl font-semibold text-sm py-2.5"
          style={{ background: agente.color, color: "#0A0A0C" }}
        >
          {t("hero.hablarCon", { nombre: agente.nombre })}
        </button>
      </div>
    </div>
  );
}

export default function Hero({ onOpenAgente }: { onOpenAgente: (a: Agente) => void }) {
  const { t } = useTranslation();
  const AGENTES = useAgentes();
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const timerRef = useRef<number | null>(null);

  // La carta mide 380px en desktop, pero en pantallas angostas eso desborda
  // el viewport: como body tiene overflow-x:hidden, el borde izquierdo queda
  // recortado sin forma de hacer scroll hasta él. Achicamos la carta para que
  // nunca sea más ancha que la pantalla (con 20px de margen a cada lado).
  const anchoMax = 380;
  const [anchoCarta, setAnchoCarta] = useState(() =>
    typeof window === "undefined" ? anchoMax : Math.min(anchoMax, window.innerWidth - 40)
  );

  useEffect(() => {
    function actualizarAncho() {
      setAnchoCarta(Math.min(anchoMax, window.innerWidth - 40));
    }
    window.addEventListener("resize", actualizarAncho);
    return () => window.removeEventListener("resize", actualizarAncho);
  }, []);

  useEffect(() => {
    if (pausado) return;
    timerRef.current = window.setInterval(() => {
      setIndice((i) => (i + 1) % AGENTES.length);
    }, AUTO_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pausado]);

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden pt-28 pb-16" style={{ background: "var(--film-black)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(255,158,44,0.08), transparent 70%)" }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-20" style={{ position: "relative" }}>
        {/* Bloque de texto: siempre arriba y legible, nunca tapado por el carrusel */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold uppercase"
          style={{ fontSize: "clamp(48px, 8vw, 110px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
        >
          {t("hero.title1")}<br />{t("hero.title2")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7 text-lg max-w-2xl mx-auto"
          style={{ color: "var(--muted)" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#agentes" className="px-8 py-4 rounded-full font-semibold text-base" style={{ background: "var(--projector)", color: "#0A0A0C" }}>
            {t("hero.ctaVerAgentes")}
          </a>
          <a href="#como-funciona" className="px-8 py-4 rounded-full font-semibold text-base" style={{ border: "1px solid var(--film-border)", color: "var(--bone)" }}>
            {t("hero.ctaComoFunciona")}
          </a>
        </motion.div>
      </div>

      {/* Carrusel: siempre debajo del bloque de texto en el flujo normal, nunca position:absolute */}
      <div
        className="relative z-0 w-full flex-1 flex items-center justify-center"
        style={{ position: "relative", perspective: 1600, minHeight: 640 }}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        <button
          onClick={() => setIndice((i) => (i - 1 + AGENTES.length) % AGENTES.length)}
          className="absolute left-2 sm:left-8 z-20 w-11 h-11 rounded-full flex items-center justify-center text-xl"
          style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
          aria-label={t("hero.prevAria")}
        >
          ‹
        </button>
        <button
          onClick={() => setIndice((i) => (i + 1) % AGENTES.length)}
          className="absolute right-2 sm:right-8 z-20 w-11 h-11 rounded-full flex items-center justify-center text-xl"
          style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
          aria-label={t("hero.nextAria")}
        >
          ›
        </button>

        <div className="relative" style={{ width: anchoCarta, height: 620, transformStyle: "preserve-3d" }}>
          {AGENTES.map((a, i) => (
            <CartaAgente key={a.id} agente={a} i={i} indiceActivo={indice} onOpen={onOpenAgente} anchoCarta={anchoCarta} />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex gap-2.5 mt-8">
        {AGENTES.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setIndice(i)}
            className="w-2.5 h-2.5 rounded-full transition-all"
            style={{ background: i === indice ? "var(--projector)" : "var(--film-border)" }}
            aria-label={t("hero.dotAria", { nombre: a.nombre })}
          />
        ))}
      </div>
    </section>
  );
}
