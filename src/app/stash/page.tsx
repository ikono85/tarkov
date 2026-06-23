"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, StatCard } from "@/components/ui";
import { Upload, Camera, CheckCircle, XCircle, Package, ArrowRight } from "lucide-react";
import { STASH_ITEMS } from "@/data/mock";

const ACTION_MAP: Record<string, { label: string; variant: "green" | "red" | "gold" | "blue" }> = {
  keep:       { label: "Garder",               variant: "green" },
  sell:       { label: "Vendre",               variant: "red"   },
  keep2sell1: { label: "Garder ×2 · Vendre 1", variant: "gold"  },
  craft:      { label: "Crafter",              variant: "blue"  },
};

export default function StashPage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const sellItems = STASH_ITEMS.filter(i => i.action === "sell");
  const gain = sellItems.reduce((s, i) => s + i.fleaPrice, 0)
    + STASH_ITEMS.filter(i => i.action === "keep2sell1").reduce((s, i) => s + i.fleaPrice, 0);

  function handleAnalyze() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAnalyzed(true); }, 1400);
  }

  return (
    <div>
      <PageHeader
        title="Stash IA"
        sub="Capture ton stash → l'IA analyse ce que tu peux garder, vendre ou crafter"
      />

      {!analyzed && (
        <Card style={{ textAlign: "center", padding: "3rem 2rem", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: 16 }}>
            <Camera size={40} color="var(--text-muted)" style={{ margin: "0 auto" }} />
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", margin: "0 0 8px" }}>
            Capture d'écran du stash
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 20px", maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
            Fais une capture de ton stash dans le jeu, puis upload-la ici. L'IA analyse chaque objet et te dit quoi faire.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              background: loading ? "var(--bg-card2)" : "var(--gold-dim)",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Analyse en cours...</>
            ) : (
              <><Upload size={15} /> Simuler l'analyse</>
            )}
          </button>
        </Card>
      )}

      {analyzed && (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            <StatCard label="Gain potentiel" value={`${gain.toLocaleString("fr")} ₽`} color="var(--gold)" />
            <StatCard label="Objets analysés" value={`${STASH_ITEMS.length}`} sub="dans le stash" />
            <StatCard label="Cases récupérables" value="48" sub="si tout vendu" />
          </div>

          {/* Alert */}
          <div style={{
            background: "var(--green-bg)",
            border: "1px solid rgba(61,158,106,0.3)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: "1.5rem",
            fontSize: 13,
            color: "var(--green)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <CheckCircle size={16} />
            Tu peux vendre <strong>12 objets</strong> sans impact sur tes quêtes actives ou ton Hideout.
          </div>

          {/* Item list */}
          <Card>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Recommandations IA
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {STASH_ITEMS.map(item => {
                const act = ACTION_MAP[item.action];
                return (
                  <div key={item.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: "var(--bg-card2)",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: 38, height: 38,
                      background: "#1a1a2e",
                      borderRadius: 6,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
                        {item.name} {item.qty > 1 && <span style={{ color: "var(--text-muted)" }}>×{item.qty}</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{item.reason}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Badge label={act.label} variant={act.variant} />
                      {item.fleaPrice > 0 && (
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                          Flea: {item.fleaPrice.toLocaleString("fr")} ₽
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <button
            onClick={() => setAnalyzed(false)}
            style={{
              marginTop: "1rem",
              background: "transparent",
              border: "1px solid var(--border2)",
              color: "var(--text-muted)",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Nouvelle analyse
          </button>
        </>
      )}
    </div>
  );
}
