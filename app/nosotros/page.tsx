import type { Metadata } from "next";
import NosotrosContent from "@/components/nosotros/NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La historia detrás de Lunexta: misión, visión y los valores que guían cada proyecto que construimos.",
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
