import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntanos qué necesita tu negocio y te decimos, sin rodeos, cómo lo construiríamos.",
};

export default function ContactoPage() {
  return <ContactPageContent />;
}
