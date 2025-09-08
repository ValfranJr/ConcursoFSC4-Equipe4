import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quizz - App",
  description: "Concurso FSC - Equipe 4 - Quizz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
