import type { Metadata } from "next";
import ExperienciaContent from "@/components/experiencia/ExperienciaContent";

export const metadata: Metadata = {
  title: "Experiencia",
  description:
    "Trayectoria, capacidades técnicas y compromiso de calidad detrás de cada proyecto que construimos en Lunexta.",
};

export default function ExperienciaPage() {
  return <ExperienciaContent />;
}
