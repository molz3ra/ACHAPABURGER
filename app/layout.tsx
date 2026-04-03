import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton"; // 1. Adicione a importação aqui

export const metadata: Metadata = {
  title: "A Chapa | Burger & Beer",
  description: "O verdadeiro sabor artesanal, a um clique de distância.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-zinc-900 text-zinc-50 font-sans antialiased" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton /> {/* 2. Coloque o componente aqui */}
      </body>
    </html>
  );
}