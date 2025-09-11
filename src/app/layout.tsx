import type { Metadata } from "next";
import "./globals.css";
import { Anton } from "next/font/google";

const logo = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

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
      <body className={`bg-hero`}>{children}</body>
    </html>
  );
}
