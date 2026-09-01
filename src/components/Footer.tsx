import { AGENTES } from "../data/agentes";

const COLUMNAS = [
  { titulo: "Agentes", links: AGENTES.map((a) => ({ label: a.nombre, href: "#agentes" })) },
  { titulo: "Empresa", links: [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Precios", href: "#precios" },
    { label: "Empezar", href: "#cuestionario" },
  ] },
  { titulo: "Legal", links: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Privacidad", href: "#" },
    { label: "Cookies", href: "#" },
  ] },
];

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6" style={{ background: "var(--film-surface)", borderTop: "1px solid var(--film-border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div>
            <div className="font-display text-xl font-extrabold mb-3 uppercase">
              Crone<span className="text-projector">Time AI</span>
            </div>
            <p className="text-sm max-w-[220px]" style={{ color: "var(--muted)" }}>Agentes de IA que atienden tu negocio por WhatsApp, las 24 horas.</p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/ignaciocheca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{ border: "1px solid var(--film-border)", color: "var(--muted)" }}
              >
                Instagram
              </a>
            </div>
          </div>

          {COLUMNAS.map((col) => (
            <div key={col.titulo}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--bone)" }}>{col.titulo}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm transition-colors" style={{ color: "var(--muted)" }}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 text-center text-xs" style={{ borderTop: "1px solid var(--film-border)", color: "var(--muted)" }}>
          © 2026 CroneTime AI — Todos los agentes trabajan las 24 horas.
        </div>
      </div>
    </footer>
  );
}
