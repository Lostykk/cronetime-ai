import { motion } from "framer-motion";

export default function CuestionarioSection({ onEmpezar }: { onEmpezar: () => void }) {
  return (
    <section id="cuestionario" className="py-32 px-6" style={{ background: "var(--film-black)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-display font-extrabold uppercase" style={{ fontSize: "clamp(34px,6vw,64px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          Tu próximo empleado<br />no duerme, no se enferma<br />y no pide vacaciones.
        </h2>
        <p className="mt-6 text-lg" style={{ color: "var(--muted)" }}>
          Contanos sobre tu negocio y te decimos qué agente necesitás.
        </p>

        <button
          onClick={onEmpezar}
          className="mt-10 px-9 py-4 rounded-full font-semibold text-base"
          style={{ background: "var(--projector)", color: "#0A0A0C" }}
        >
          Empezar ahora
        </button>
      </motion.div>
    </section>
  );
}
