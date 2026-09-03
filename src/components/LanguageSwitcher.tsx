import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const LANGUAGES = [
  { code: "es", flag: "🇦🇷", label: "ES" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const actual =
    LANGUAGES.find((l) => l.code === i18n.language) ??
    LANGUAGES.find((l) => l.code === i18n.language.split("-")[0]) ??
    LANGUAGES[0];

  useEffect(() => {
    function alClickear(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", alClickear);
    return () => document.removeEventListener("mousedown", alClickear);
  }, []);

  function cambiarIdioma(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title={t("language.label")}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors"
        style={{ background: "var(--film-surface)", border: "1px solid var(--film-border)", color: "var(--bone)" }}
      >
        <span>{actual.flag}</span>
        <span>{actual.label}</span>
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: "var(--muted)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 rounded-2xl overflow-hidden"
            style={{
              top: "calc(100% + 8px)",
              minWidth: 160,
              background: "var(--film-surface)",
              border: "1px solid var(--film-border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {LANGUAGES.map((lang) => {
              const activo = lang.code === i18n.language;
              return (
                <button
                  key={lang.code}
                  onClick={() => cambiarIdioma(lang.code)}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-left transition-colors"
                  style={{
                    background: activo ? "var(--film-raised)" : "transparent",
                    color: activo ? "var(--bone)" : "var(--muted)",
                    fontWeight: activo ? 600 : 400,
                    borderBottom: "1px solid var(--film-border)",
                  }}
                >
                  <span style={{ fontSize: 17 }}>{lang.flag}</span>
                  <span>{t(`language.${lang.code}`)}</span>
                  {activo && (
                    <svg
                      className="ml-auto"
                      style={{ color: "var(--projector)" }}
                      width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
