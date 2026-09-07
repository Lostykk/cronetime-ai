import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ComoFunciona from "./components/ComoFunciona";
import Agentes from "./components/Agentes";
import Comparacion from "./components/Comparacion";
import Numeros from "./components/Numeros";
import Testimonios from "./components/Testimonios";
import Precios from "./components/Precios";
import FAQ from "./components/FAQ";
import CuestionarioSection from "./components/CuestionarioSection";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";
import Cuestionario from "./components/Cuestionario";
import SetterDemoPublica from "./pages/SetterDemoPublica";
import AgentLanding from "./pages/AgentLanding";
import { nichoCodeDeAgenteId, type Agente } from "./data/agentes";

// Ruta pública dedicada de cada agente que no es el Setter (que ya tiene su
// propia página de demo en vivo en /setter, sin landing de marketing).
const RUTA_A_AGENTE: Record<string, string> = {
  "/sofia-restaurantes": "sofia",
  "/marcos": "marcos",
  "/maria": "maria",
  "/pia": "pia",
  "/emanuel": "emanuel",
  "/javier": "javier",
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [agenteAbierto, setAgenteAbierto] = useState<Agente | null>(null);
  const [cuestionarioAbierto, setCuestionarioAbierto] = useState(false);
  const [nichoPreseleccionado, setNichoPreseleccionado] = useState<string | undefined>(undefined);
  const ruta = window.location.pathname.replace(/\/+$/, "") || "/";
  const esRutaSetter = ruta === "/setter";
  const agenteDeRuta = RUTA_A_AGENTE[ruta];

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    if (esRutaSetter || agenteDeRuta) return;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
  }, [i18n.language, t, esRutaSetter, agenteDeRuta]);

  function abrirCuestionario(nicho?: string) {
    setNichoPreseleccionado(nicho);
    setAgenteAbierto(null);
    setCuestionarioAbierto(true);
  }

  if (esRutaSetter) {
    return <SetterDemoPublica />;
  }

  if (agenteDeRuta) {
    return <AgentLanding agenteId={agenteDeRuta} />;
  }

  return (
    <div className="grain">
      <Nav onEmpezar={() => abrirCuestionario()} />
      <main>
        <Hero onOpenAgente={setAgenteAbierto} />
        <ComoFunciona />
        <Agentes onOpenAgente={setAgenteAbierto} />
        <Comparacion />
        <Numeros />
        <Testimonios />
        <Precios onAbrirCuestionario={() => abrirCuestionario()} />
        <FAQ />
        <CuestionarioSection onEmpezar={() => abrirCuestionario()} />
      </main>
      <Footer />

      <AnimatePresence>
        {agenteAbierto && (
          <DemoModal
            agente={agenteAbierto}
            onClose={() => setAgenteAbierto(null)}
            onQuerer={(a) => abrirCuestionario(nichoCodeDeAgenteId(a.id))}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cuestionarioAbierto && (
          <Cuestionario nichoInicial={nichoPreseleccionado} onClose={() => setCuestionarioAbierto(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
