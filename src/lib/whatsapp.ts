export interface DatosCuestionario {
  nombre: string;
  negocio: string;
  nichoLabel: string;
  necesidad: string;
  agenteNombre: string;
}

export function abrirWhatsApp({ nombre, negocio, nichoLabel, necesidad, agenteNombre }: DatosCuestionario) {
  const primerNombre = nombre.trim().split(" ")[0] || "";
  const terminaEnA = primerNombre.toLowerCase().endsWith("a");
  const interesadoA = terminaEnA ? "interesada" : "interesado";

  const mensaje =
    `Holaa! Te escribo porque estoy ${interesadoA} en contratar a tu agente llamado ${agenteNombre}.\n\n` +
    `Mi nombre: ${nombre}\n` +
    `Mi negocio: ${negocio}\n` +
    `Rubro: ${nichoLabel}\n` +
    `Lo que necesito resolver: ${necesidad}`;

  const url = `https://wa.me/5493813035855?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
