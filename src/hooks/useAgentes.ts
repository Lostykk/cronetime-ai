import { useTranslation } from "react-i18next";
import { AGENTES_BASE, type Agente } from "../data/agentes";

export function useAgentes(): Agente[] {
  const { t } = useTranslation();
  return AGENTES_BASE.map((a) => ({
    ...a,
    nombre: t(`agentes.${a.id}.nombre`),
    nicho: t(`agentes.${a.id}.nicho`),
    descripcion: t(`agentes.${a.id}.descripcion`),
    hace: t(`agentes.${a.id}.hace`, { returnObjects: true }) as string[],
    para: t(`agentes.${a.id}.para`),
  }));
}

export function useAgenteById(id: string | undefined): Agente | undefined {
  const agentes = useAgentes();
  return agentes.find((a) => a.id === id);
}
