import type { Agente } from "../data/agentes";

export default function AgentAvatar({ agente, size = 96 }: { agente: Agente; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-num font-extrabold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${agente.color}, ${agente.colorSecundario})`,
        border: `${Math.max(2, size * 0.025)}px solid ${agente.color}`,
        boxShadow: `0 0 ${size * 0.4}px -${size * 0.15}px ${agente.color}`,
        color: "#0A0A0C",
        fontSize: size * 0.4,
      }}
    >
      {agente.nombre[0]}
    </div>
  );
}
