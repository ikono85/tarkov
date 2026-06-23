"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package, Map, TrendingUp, ClipboardList,
  Home, Users, Bot, Target
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: Target },
  { href: "/stash", label: "Stash IA", icon: Package },
  { href: "/quests", label: "Quêtes", icon: ClipboardList },
  { href: "/prices", label: "Prix marché", icon: TrendingUp },
  { href: "/hideout", label: "Hideout", icon: Home },
  { href: "/team", label: "Équipe LFG", icon: Users },
  { href: "/coach", label: "IA Coach", icon: Bot },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside style={{
      width: 220,
      background: "var(--bg-card)",
      borderRight: "1px solid var(--border)",
      position: "fixed",
      top: 0, left: 0, bottom: 0,
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 0",
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "var(--gold-dim)",
            border: "1px solid var(--gold)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🎯</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.05em" }}>
              TARKOV
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Assistant
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                color: active ? "var(--gold)" : "var(--text-muted)",
                background: active ? "var(--gold-dim)" : "transparent",
                border: active ? "1px solid rgba(200,168,75,0.2)" : "1px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6 }}>
          Data: tarkov.dev API
          <br />
          v0.1 — Early Access
        </div>
      </div>
    </aside>
  );
}
