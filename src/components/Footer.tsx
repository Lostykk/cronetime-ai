import { useTranslation } from "react-i18next";
import { useAgentes } from "../hooks/useAgentes";

export default function Footer() {
  const { t } = useTranslation();
  const AGENTES = useAgentes();

  const COLUMNAS = [
    { titulo: t("footer.columnas.agentesTitle"), links: AGENTES.map((a) => ({ label: a.nombre, href: "#agentes" })) },
    { titulo: t("footer.columnas.empresaTitle"), links: [
      { label: t("footer.columnas.comoFunciona"), href: "#como-funciona" },
      { label: t("footer.columnas.precios"), href: "#precios" },
      { label: t("footer.columnas.empezar"), href: "#cuestionario" },
    ] },
    { titulo: t("footer.columnas.legalTitle"), links: [
      { label: t("footer.columnas.terminos"), href: "#" },
      { label: t("footer.columnas.privacidad"), href: "#" },
      { label: t("footer.columnas.cookies"), href: "#" },
    ] },
  ];

  return (
    <footer className="pt-20 pb-10 px-6" style={{ background: "var(--film-surface)", borderTop: "1px solid var(--film-border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div>
            <div className="font-display text-xl font-extrabold mb-3 uppercase">
              Crone<span className="text-projector">Time AI</span>
            </div>
            <p className="text-sm max-w-[220px]" style={{ color: "var(--muted)" }}>{t("footer.tagline")}</p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/ignaciocheca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{ border: "1px solid var(--film-border)", color: "var(--muted)" }}
              >
                {t("footer.instagramLabel")}
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
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
