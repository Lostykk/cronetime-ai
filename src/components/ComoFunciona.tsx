import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PASOS = [
  { icono: "🔍", titulo: "Nos contás tu negocio", texto: "Cargás el menú, la carta o el catálogo. Puede ser una foto." },
  { icono: "⚡", titulo: "El agente aprende solo", texto: "En minutos conoce tus precios, horarios y reglas." },
  { icono: "📱", titulo: "Se conecta a tu WhatsApp", texto: "Sin cambiar nada. Tus clientes escriben al mismo número." },
  { icono: "🚀", titulo: "Vos controlás todo", texto: "Reservas, pedidos y avisos en tiempo real desde el panel." },
];

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".paso-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="py-28 px-6" style={{ background: "var(--film-black)" }}>
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(32px,5vw,56px)", letterSpacing: "-0.02em" }}>
          Funcionando en menos<br />de 48 horas
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative px-4">
        <div className="hidden md:block absolute left-0 right-0 top-7 h-px" style={{ background: "var(--film-border)" }} />
        <div ref={lineRef} className="hidden md:block absolute left-0 right-0 top-7 h-px" style={{ background: "var(--projector)" }} />

        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {PASOS.map((p, i) => (
            <div key={i} className="paso-item relative">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl relative z-10"
                style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)" }}
              >
                {p.icono}
              </div>
              <div className="font-num text-xs mt-4" style={{ color: "var(--projector)" }}>PASO {i + 1}</div>
              <h3 className="text-lg font-bold mt-1">{p.titulo}</h3>
              <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
