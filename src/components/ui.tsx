import { CSSProperties, ReactNode } from "react";

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "1.25rem",
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Card2({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: "var(--bg-card2)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "1rem",
      ...style,
    }}>
      {children}
    </div>
  );
}

type BadgeVariant = "gold" | "green" | "red" | "blue" | "gray";
const BADGE: Record<BadgeVariant, CSSProperties> = {
  gold:  { background: "var(--gold-dim)",  color: "var(--gold)",  border: "1px solid rgba(200,168,75,0.3)" },
  green: { background: "var(--green-bg)",  color: "var(--green)", border: "1px solid rgba(61,158,106,0.3)" },
  red:   { background: "var(--red-bg)",    color: "var(--red)",   border: "1px solid rgba(217,79,79,0.3)" },
  blue:  { background: "var(--blue-bg)",   color: "var(--blue)",  border: "1px solid rgba(74,127,193,0.3)" },
  gray:  { background: "var(--bg-card2)",  color: "var(--text-muted)", border: "1px solid var(--border)" },
};

export function Badge({ label, variant = "gray" }: { label: string; variant?: BadgeVariant }) {
  return (
    <span style={{
      ...BADGE[variant],
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 9px",
      borderRadius: 20,
      display: "inline-block",
      letterSpacing: "0.02em",
    }}>{label}</span>
  );
}

export function StatCard({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "1rem",
    }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || "var(--text)" }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", margin: 0 }}>{title}</h1>
      {sub && <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "1rem 0" }} />;
}
