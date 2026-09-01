import { NICHO_A_AGENTE } from "../data/agentes";

export interface DatosCuestionario {
  nombre: string;
  negocio: string;
  nicho: string;
  necesidad: string;
}

export function abrirWhatsApp({ nombre, negocio, nicho, necesidad }: DatosCuestionario) {
  const agente = NICHO_A_AGENTE[nicho] || "el agente";

  const primerNombre = nombre.trim().split(" ")[0] || "";
  const terminaEnA = primerNombre.toLowerCase().endsWith("a");
  const interesadoA = terminaEnA ? "interesada" : "interesado";

  const mensaje =
    `Holaa! Te escribo porque estoy ${interesadoA} en contratar a tu agente llamado ${agente}.\n\n` +
    `Mi nombre: ${nombre}\n` +
    `Mi negocio: ${negocio}\n` +
    `Rubro: ${nicho}\n` +
    `Lo que necesito resolver: ${necesidad}`;

  const url = `https://wa.me/5493813035855?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
