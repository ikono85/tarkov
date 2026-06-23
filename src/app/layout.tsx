import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Tarkov Assistant",
  description: "Ton compagnon de raid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: 220, padding: "2rem", minHeight: "100vh", maxWidth: "calc(100vw - 220px)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
