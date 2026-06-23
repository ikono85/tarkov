"use client";
import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { Search, Globe, Users, MessageCircle, Plus } from "lucide-react";
import { TEAM_PLAYERS } from "@/data/mock";

const COUNTRIES = ["Tous", "France", "Belgique", "Canada", "Suisse"];
const LEVELS = ["Tous niveaux", "Niv 1+", "Niv 20+", "Niv 40+", "Niv 60+"];
const STYLES = ["Toute activité", "Quêtes", "PvP", "Farm", "Labs"];

export default function TeamPage() {
  const [country, setCountry] = useState("Tous");
  const [levelFilter, setLevelFilter] = useState("Tous niveaux");
  const [style, setStyle] = useState("Toute activité");
  const [showForm, setShowForm] = useState(false);

  const levelMin: Record<string, number> = { "Tous niveaux": 0, "Niv 1+": 1, "Niv 20+": 20, "Niv 40+": 40, "Niv 60+": 60 };

  const filtered = TEAM_PLAYERS.filter(p => {
    if (country !== "Tous" && p.countryName !== country) return false;
    if (p.level < levelMin[levelFilter]) return false;
    if (style !== "Toute activité" && !p.style.includes(style)) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Recherche d'équipe" sub="Trouve des joueurs francophones · lien Discord direct" />

      {/* Filters */}
      <Card style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
              Pays
            </label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card2)",
                border: "1px solid var(--border2)",
                color: "var(--text)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
              Niveau
            </label>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card2)",
                border: "1px solid var(--border2)",
                color: "var(--text)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
              Style de jeu
            </label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card2)",
                border: "1px solid var(--border2)",
                color: "var(--text)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {STYLES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 16px",
              background: "var(--gold-dim)",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={15} /> Mon profil
          </button>
        </div>
      </Card>

      {/* Post form */}
      {showForm && (
        <Card style={{ marginBottom: "1.5rem", border: "1px solid rgba(200,168,75,0.3)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Créer mon annonce</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { label: "Pseudo Tarkov", placeholder: "TonPseudo" },
              { label: "Discord", placeholder: "Pseudo#0000" },
              { label: "Lien invitation Discord", placeholder: "https://discord.gg/..." },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} style={{
                  width: "100%",
                  background: "var(--bg-card2)",
                  border: "1px solid var(--border2)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "var(--text)",
                  outline: "none",
                }} />
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 12,
            padding: "9px 20px",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}>
            Publier mon profil
          </button>
        </Card>
      )}

      {/* Results count */}
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        {filtered.length} joueur{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Player cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(player => (
          <Card key={player.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Avatar */}
            <div style={{
              width: 44, height: 44,
              borderRadius: "50%",
              background: player.color,
              border: "1px solid var(--border2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text)",
              flexShrink: 0,
            }}>
              {player.initials}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{player.name}</span>
                <span style={{ fontSize: 14 }}>{player.country}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Niv {player.level}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {player.style.map(s => (
                  <span key={s} style={{ fontSize: 11, padding: "2px 8px", background: "var(--bg-card2)", color: "var(--text-muted)", borderRadius: 20, border: "1px solid var(--border)" }}>{s}</span>
                ))}
                {player.langs.map(l => (
                  <span key={l} style={{ fontSize: 11, padding: "2px 8px", background: "var(--blue-bg)", color: "var(--blue)", borderRadius: 20, border: "1px solid rgba(74,127,193,0.3)" }}>{l}</span>
                ))}
                <span style={{ fontSize: 11, padding: "2px 8px", background: "var(--bg-card2)", color: "var(--text-muted)", borderRadius: 20, border: "1px solid var(--border)" }}>
                  {player.server}
                </span>
              </div>
            </div>

            {/* Discord button */}
            <div>
              {player.discord && (
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, textAlign: "right" }}>
                  {player.discord}
                </div>
              )}
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                background: "#2c2f5b",
                border: "1px solid #4a50a0",
                color: "#7289da",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}>
                <MessageCircle size={14} />
                {player.invite ? "Rejoindre" : "Contacter"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
