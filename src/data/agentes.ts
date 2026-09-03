export interface AgenteBase {
  id: string;
  emoji: string;
  color: string;
  colorSecundario: string;
  precio: number;
  setup: number;
}

export interface Agente extends AgenteBase {
  nombre: string;
  nicho: string;
  descripcion: string;
  hace: string[];
  para: string;
}

export const AGENTES_BASE: AgenteBase[] = [
  { id: "sofia", emoji: "🍽️", color: "#F5B544", colorSecundario: "#8B4513", precio: 120, setup: 290 },
  { id: "marcos", emoji: "🏠", color: "#4A9EFF", colorSecundario: "#1E3A5F", precio: 150, setup: 320 },
  { id: "maria", emoji: "🦷", color: "#3ECF8E", colorSecundario: "#0B4D33", precio: 140, setup: 310 },
  { id: "pia", emoji: "✨", color: "#FF6FA5", colorSecundario: "#7A1F45", precio: 130, setup: 300 },
  { id: "emanuel", emoji: "📊", color: "#B084FF", colorSecundario: "#3B0764", precio: 160, setup: 340 },
  { id: "javier", emoji: "✈️", color: "#FF9E2C", colorSecundario: "#78350F", precio: 150, setup: 320 },
];

export const NICHO_A_AGENTE_ID: Record<string, string> = {
  restaurante: "sofia",
  inmobiliaria: "marcos",
  salud: "maria",
  estetica: "pia",
  finanzas: "emanuel",
  turismo: "javier",
};

export const NICHOS_CODES = Object.keys(NICHO_A_AGENTE_ID);

export function nichoCodeDeAgenteId(agenteId: string): string | undefined {
  return Object.entries(NICHO_A_AGENTE_ID).find(([, v]) => v === agenteId)?.[0];
}
