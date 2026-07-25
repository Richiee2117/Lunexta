import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LanguageProvider from "@/components/providers/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lunextasoft.com"),
  title: {
    default: "Lunexta — Soluciones que escalan contigo",
    template: "%s — Lunexta",
  },
  description:
    "Lunexta construye páginas web, ecommerce, sistemas de punto de venta y software a la medida para negocios que buscan escalar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-foreground">
        <LanguageProvider>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
