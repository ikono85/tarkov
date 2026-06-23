"use client";
import { PageHeader, StatCard, Card } from "@/components/ui";
import { Package, ClipboardList, TrendingUp, Home, Users, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

const modules = [
  { href: "/stash",   icon: Package,       label: "Stash IA",     desc: "Analyse ta capture — garde/vends en 1 clic", color: "var(--gold)" },
  { href: "/quests",  icon: ClipboardList, label: "Quêtes",       desc: "Suivi, objets à garder, aide IA", color: "var(--blue)" },
  { href: "/prices",  icon: TrendingUp,    label: "Prix marché",  desc: "Flea vs Trader, historique 30j", color: "var(--green)" },
  { href: "/hideout", icon: Home,          label: "Hideout",      desc: "Progression, upgrades prioritaires", color: "#9b6fd4" },
  { href: "/team",    icon: Users,         label: "Équipe LFG",   desc: "Cherche des joueurs par pays + Discord", color: "var(--blue)" },
  { href: "/coach",   icon: Bot,           label: "IA Coach",     desc: "Conseils personnalisés selon ton niveau", color: "var(--gold)" },
];

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
          Tarkov Assistant
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", margin: 0 }}>
          Bienvenue, Survivant
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "6px 0 0" }}>
          Tous tes outils de raid en un seul endroit
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "2rem" }}>
        <StatCard label="Roubles potentiels" value="2 450 000 ₽" sub="dans ton stash" color="var(--gold)" />
        <StatCard label="Quêtes actives" value="2" sub="1 terminée" />
        <StatCard label="Hideout" value="4 / 6" sub="modules actifs" />
        <StatCard label="GPU collectés" value="3 / 10" sub="Bitcoin Farm" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {modules.map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.25rem",
              cursor: "pointer",
              transition: "border-color 0.15s",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border2)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Icon size={20} color={color} />
                <ArrowRight size={14} color="var(--text-dim)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
