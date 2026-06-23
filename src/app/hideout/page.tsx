"use client";
import { useState } from "react";
import { PageHeader, Card, StatCard } from "@/components/ui";
import { Hammer, CheckCircle, ArrowUpCircle } from "lucide-react";
import { HIDEOUT_MODULES } from "@/data/mock";

export default function HideoutPage() {
  const done = HIDEOUT_MODULES.filter(m => m.pct === 100).length;
  const total = HIDEOUT_MODULES.length;

  return (
    <div>
      <PageHeader title="Hideout" sub="Progression de tes modules et upgrades recommandées" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.75rem" }}>
        <StatCard label="Modules actifs" value={`${done} / ${total}`} color="var(--green)" />
        <StatCard label="Prochaine priorité" value="Workbench Niv 3" sub="Débloque crafts ammo" />
        <StatCard label="Bitcoin Farm" value="Niv 1 / 3" sub="10 GPU manquants" color="var(--gold)" />
      </div>

      {/* Next upgrade highlight */}
      <div style={{
        background: "var(--blue-bg)",
        border: "1px solid rgba(74,127,193,0.3)",
        borderRadius: 12,
        padding: "1rem 1.25rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <ArrowUpCircle size={28} color="var(--blue)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)", marginBottom: 4 }}>
            Prochaine upgrade recommandée : Workbench Niv 3
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
            Débloque le craft de munitions premium + réduction coût crafts
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["4× GPU", "2× VPX Flash Drive", "3× WD-40 100ml", "Niv 26 requis"].map(r => (
              <span key={r} style={{ fontSize: 11, padding: "3px 10px", background: "rgba(74,127,193,0.15)", color: "var(--blue)", borderRadius: 20, border: "1px solid rgba(74,127,193,0.3)" }}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {HIDEOUT_MODULES.map(mod => {
          const isMax = mod.pct === 100;
          return (
            <Card key={mod.id}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isMax
                    ? <CheckCircle size={16} color="var(--green)" />
                    : <Hammer size={16} color="var(--gold)" />
                  }
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{mod.name}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Niv {mod.level} / {mod.maxLevel}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 5, background: "var(--bg-card2)", borderRadius: 4, marginBottom: 10 }}>
                <div style={{
                  width: `${mod.pct}%`,
                  height: 5,
                  borderRadius: 4,
                  background: isMax ? "var(--green)" : "var(--gold)",
                  transition: "width 0.5s ease",
                }} />
              </div>

              {/* Profit */}
              <div style={{ fontSize: 12, color: isMax ? "var(--green)" : "var(--text-muted)", marginBottom: isMax ? 0 : 8 }}>
                {mod.profit}
              </div>

              {/* Needs */}
              {!isMax && mod.needs.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {mod.needs.map(n => (
                    <span key={n} style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      background: "var(--bg-card2)",
                      color: "var(--text-muted)",
                      borderRadius: 20,
                      border: "1px solid var(--border)",
                    }}>{n}</span>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
