import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConceptForge AI - Architectural Concept Ideation",
  description: "AI-powered architectural concept ideation tool. Transform project constraints into visionary narratives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
