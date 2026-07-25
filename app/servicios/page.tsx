import type { Metadata } from "next";
import ServiciosIndexContent from "@/components/servicios/ServiciosIndexContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Web, ecommerce, punto de venta y software a la medida — cuatro formas de resolver el mismo problema: hacer crecer tu negocio.",
};

export default function ServiciosPage() {
  return <ServiciosIndexContent />;
}
