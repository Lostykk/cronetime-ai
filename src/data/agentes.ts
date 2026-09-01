export interface Agente {
  id: string;
  nombre: string;
  emoji: string;
  nicho: string;
  color: string;
  colorSecundario: string;
  descripcion: string;
  hace: string[];
  para: string;
  precio: number;
  setup: number;
}

export const AGENTES: Agente[] = [
  {
    id: "sofia",
    nombre: "Sofía",
    emoji: "🍽️",
    nicho: "Restaurantes y bares",
    color: "#F5B544",
    colorSecundario: "#8B4513",
    descripcion: "Atiende el WhatsApp de tu restaurante 24/7. Reservas, pedidos y quejas resueltas sola.",
    hace: ["Reservas automáticas", "Pedidos y delivery", "Consultas del menú", "Avisos de quejas", "Panel en tiempo real"],
    para: "Restaurantes, bares, cafés, parrillas, pizzerías y cualquier local gastronómico",
    precio: 120,
    setup: 290,
  },
  {
    id: "marcos",
    nombre: "Marcos",
    emoji: "🏠",
    nicho: "Inmobiliarias",
    color: "#4A9EFF",
    colorSecundario: "#1E3A5F",
    descripcion: "Califica leads inmobiliarios 24/7, agenda visitas y responde consultas de propiedades.",
    hace: ["Calificación de leads", "Agendado de visitas", "Consultas de propiedades", "Seguimiento automático", "CRM en tiempo real"],
    para: "Inmobiliarias, desarrolladoras, agentes independientes y portales de propiedades",
    precio: 150,
    setup: 320,
  },
  {
    id: "maria",
    nombre: "María",
    emoji: "🦷",
    nicho: "Salud",
    color: "#3ECF8E",
    colorSecundario: "#0B4D33",
    descripcion: "Gestiona la agenda de tu consultorio y responde dudas sobre tratamientos y costos.",
    hace: ["Turnos y agenda", "Info de tratamientos", "Recordatorios", "Seguimiento post-turno", "Gestión de cancelaciones"],
    para: "Dentistas, clínicas odontológicas, ortodoncistas y cualquier centro de salud",
    precio: 140,
    setup: 310,
  },
  {
    id: "pia",
    nombre: "Pía",
    emoji: "✨",
    nicho: "Estética y belleza",
    color: "#FF6FA5",
    colorSecundario: "#7A1F45",
    descripcion: "Agenda tratamientos de belleza y recuerda a tus clientes sus citas con anticipación.",
    hace: ["Agenda de turnos", "Info de tratamientos", "Recordatorios 24hs antes", "Seguimiento de clientes", "Venta de paquetes"],
    para: "Centros de estética, peluquerías, salones de uñas, spas y centros de bienestar",
    precio: 130,
    setup: 300,
  },
  {
    id: "emanuel",
    nombre: "Emanuel",
    emoji: "📊",
    nicho: "Finanzas",
    color: "#B084FF",
    colorSecundario: "#3B0764",
    descripcion: "Responde consultas financieras, califica prospectos y agenda reuniones con asesores.",
    hace: ["Calificación de prospectos", "Info de productos", "Agenda con asesores", "Seguimiento de leads", "Alertas al equipo"],
    para: "Asesores financieros, contadores, gestorías, fintech y servicios de inversión",
    precio: 160,
    setup: 340,
  },
  {
    id: "javier",
    nombre: "Javier",
    emoji: "✈️",
    nicho: "Turismo",
    color: "#FF9E2C",
    colorSecundario: "#78350F",
    descripcion: "Cotiza viajes y vehículos, agenda test drives y da seguimiento a cada prospecto.",
    hace: ["Presupuestos rápidos", "Agenda de test drives", "Info de destinos o modelos", "Seguimiento de prospectos", "Cierre de leads calientes"],
    para: "Agencias de viajes, concesionarias, rent-a-car, turismo aventura y aerolíneas",
    precio: 150,
    setup: 320,
  },
];

export const NICHO_A_AGENTE: Record<string, string> = {
  Restaurante: "Sofía",
  Inmobiliaria: "Marcos",
  Salud: "María",
  Estética: "Pía",
  Finanzas: "Emanuel",
  Turismo: "Javier",
};

export const NICHOS = Object.keys(NICHO_A_AGENTE);

export function nichoDeAgente(nombreAgente: string): string | undefined {
  return Object.entries(NICHO_A_AGENTE).find(([, v]) => v === nombreAgente)?.[0];
}
