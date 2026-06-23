"use client";
import { useState } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Bot, MapPin, Package } from "lucide-react";
import { QUESTS } from "@/data/mock";

const STATUS: Record<string, { label: string; variant: "green" | "gold" | "gray" }> = {
  active: { label: "En cours", variant: "gold" },
  todo:   { label: "À faire",  variant: "gray" },
  done:   { label: "Terminé",  variant: "green" },
};

export default function QuestsPage() {
  const [open, setOpen] = useState<number[]>([1]);
  const [filter, setFilter] = useState<"all" | "active" | "todo" | "done">("all");

  const filtered = QUESTS.filter(q => filter === "all" || q.status === filter);

  function toggle(id: number) {
    setOpen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <div>
      <PageHeader title="Quêtes" sub="Suivi de progression et objets à conserver" />

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
        {(["all", "active", "todo", "done"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              cursor: "pointer",
              border: filter === f ? "1px solid var(--gold)" : "1px solid var(--border2)",
              background: filter === f ? "var(--gold-dim)" : "transparent",
              color: filter === f ? "var(--gold)" : "var(--text-muted)",
              transition: "all 0.15s",
            }}
          >
            {{ all: "Toutes", active: "En cours", todo: "À faire", done: "Terminées" }[f]}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(quest => {
          const isOpen = open.includes(quest.id);
          const done = quest.objectives.filter(o => o.done).length;
          const total = quest.objectives.length;
          const pct = Math.round((done / total) * 100);
          const st = STATUS[quest.status];

          return (
            <Card key={quest.id}>
              {/* Header */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                onClick={() => toggle(quest.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{quest.name}</span>
                    <Badge label={st.label} variant={st.variant} />
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={11} /> {quest.map}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{quest.trader}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginRight: 8 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{done}/{total} objectifs</div>
                  <div style={{ width: 80, height: 4, background: "var(--bg-card2)", borderRadius: 4 }}>
                    <div style={{ width: `${pct}%`, height: 4, borderRadius: 4, background: pct === 100 ? "var(--green)" : "var(--gold)" }} />
                  </div>
                </div>
                {isOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
              </div>

              {isOpen && (
                <>
                  <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />

                  {/* Objectives */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                      Objectifs
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {quest.objectives.map(obj => (
                        <div key={obj.id} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                          {obj.done
                            ? <CheckCircle2 size={16} color="var(--green)" />
                            : <Circle size={16} color="var(--text-dim)" />
                          }
                          <span style={{ color: obj.done ? "var(--text-muted)" : "var(--text)", textDecoration: obj.done ? "line-through" : "none" }}>
                            {obj.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keepers */}
                  {quest.keepers.length > 0 && (
                    <div style={{
                      background: "var(--gold-dim)",
                      border: "1px solid rgba(200,168,75,0.2)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      marginBottom: 12,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        <Package size={12} /> Objets à garder
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {quest.keepers.map(k => (
                          <span key={k} style={{ fontSize: 12, padding: "3px 10px", background: "rgba(200,168,75,0.15)", color: "var(--gold)", borderRadius: 20, border: "1px solid rgba(200,168,75,0.3)" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rewards */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                      Récompenses
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {quest.rewards.map(r => (
                        <span key={r} style={{ fontSize: 12, padding: "3px 10px", background: "var(--bg-card2)", color: "var(--text-muted)", borderRadius: 20, border: "1px solid var(--border)" }}>{r}</span>
                      ))}
                    </div>
                  </div>

                  {/* AI Help */}
                  <button style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--bg-card2)",
                    border: "1px solid var(--border2)",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    justifyContent: "center",
                  }}>
                    <Bot size={15} color="var(--blue)" />
                    Demander à l'IA comment compléter {quest.name}
                  </button>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
