"use client";
import { useState } from "react";
import { PageHeader, Card, StatCard } from "@/components/ui";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { PRICE_ITEMS } from "@/data/mock";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PricesPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(PRICE_ITEMS[0]);

  const results = PRICE_ITEMS.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const margin = selected.today - selected.trader;
  const trend = selected.today > selected.avg7;

  const chartData = ["L-6", "L-5", "L-4", "L-3", "L-2", "Hier", "Auj"].map((day, i) => ({
    day,
    prix: Math.round(selected.history[i] * 1000),
  }));

  return (
    <div>
      <PageHeader title="Prix marché" sub="Flea Market vs Traders — données tarkov.dev" />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem" }}>
        {/* Left: search + list */}
        <div>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Chercher un objet..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border2)",
                borderRadius: 8,
                padding: "9px 12px 9px 34px",
                fontSize: 13,
                color: "var(--text)",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {results.map(item => (
              <button
                key={item.name}
                onClick={() => setSelected(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: selected.name === item.name ? "var(--gold-dim)" : "var(--bg-card)",
                  border: selected.name === item.name ? "1px solid rgba(200,168,75,0.3)" : "1px solid var(--border)",
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: selected.name === item.name ? "var(--gold)" : "var(--text)" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.category}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 12, color: selected.name === item.name ? "var(--gold)" : "var(--text-muted)", fontWeight: 500 }}>
                  {(item.today / 1000).toFixed(0)}k
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Header */}
          <Card style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 36 }}>{selected.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{selected.category}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              {trend
                ? <TrendingUp size={20} color="var(--green)" />
                : <TrendingDown size={20} color="var(--red)" />
              }
              <span style={{ fontSize: 13, color: trend ? "var(--green)" : "var(--red)", fontWeight: 500 }}>
                {trend ? "Hausse" : "Baisse"} 7 jours
              </span>
            </div>
          </Card>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            <StatCard label="Flea aujourd'hui" value={`${selected.today.toLocaleString("fr")} ₽`} color="var(--gold)" />
            <StatCard label="Moy. 7 jours" value={`${selected.avg7.toLocaleString("fr")} ₽`} />
            <StatCard label="Moy. 30 jours" value={`${selected.avg30.toLocaleString("fr")} ₽`} />
            <StatCard
              label="Marge Flea/Trader"
              value={`+${margin.toLocaleString("fr")} ₽`}
              color="var(--green)"
              sub={`Trader: ${selected.trader.toLocaleString("fr")} ₽`}
            />
          </div>

          {/* Chart */}
          <Card>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Historique 7 jours
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <XAxis dataKey="day" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Tooltip
                  contentStyle={{ background: "var(--bg-card2)", border: "1px solid var(--border2)", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "var(--text-muted)" }}
                  itemStyle={{ color: "var(--gold)" }}
                  formatter={(v) => [`${Number(v).toLocaleString("fr")} ₽`, "Prix"]}
                />
                <Line
                  type="monotone"
                  dataKey="prix"
                  stroke="var(--gold)"
                  strokeWidth={2}
                  dot={{ fill: "var(--gold)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Advice */}
          <div style={{
            background: margin > 100000 ? "var(--green-bg)" : "var(--bg-card2)",
            border: `1px solid ${margin > 100000 ? "rgba(61,158,106,0.3)" : "var(--border)"}`,
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            color: margin > 100000 ? "var(--green)" : "var(--text-muted)",
          }}>
            {margin > 100000
              ? `✓ Meilleure vente sur le Flea Market — tu gagnes ${margin.toLocaleString("fr")} ₽ de plus qu'en trader.`
              : "La marge Flea/Trader est faible. Pense aux frais de listing avant de vendre sur le Flea."}
          </div>
        </div>
      </div>
    </div>
  );
}
