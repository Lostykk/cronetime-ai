import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav({ onEmpezar }: { onEmpezar: () => void }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "#agentes", label: t("nav.agentes") },
    { href: "#como-funciona", label: t("nav.comoFunciona") },
    { href: "#precios", label: t("nav.precios") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--film-border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
        <a href="#" className="font-display text-xl font-extrabold uppercase tracking-tight">
          Crone<span className="text-projector">Time AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm transition-colors" style={{ color: "var(--muted)" }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={onEmpezar}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: "var(--projector)", color: "#0A0A0C" }}
          >
            {t("nav.empezar")}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("nav.menuAria")}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-6 h-0.5 block" style={{ background: "var(--bone)" }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 block" style={{ background: "var(--bone)" }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-6 h-0.5 block" style={{ background: "var(--bone)" }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(10,10,12,0.97)", borderTop: "1px solid var(--film-border)" }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3" style={{ color: "var(--bone)", borderBottom: "1px solid var(--film-border)" }}>
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onEmpezar(); }}
                className="mt-3 text-center py-3 rounded-full font-semibold"
                style={{ background: "var(--projector)", color: "#0A0A0C" }}
              >
                {t("nav.empezar")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
