"use client";
import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/ui";
import { Bot, Send, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "J'ai 3 millions de roubles, je fais quoi ?",
  "Quels objets ne jamais vendre dans Tarkov ?",
  "Comment progresser vite dans les quêtes Prapor ?",
  "Quel équipement budget pour un niveau 30 ?",
  "Comment optimiser ma Bitcoin Farm ?",
  "Quelle carte choisir pour farm du rouble ?",
];

const SYSTEM = `Tu es un expert Escape from Tarkov. Tu donnes des conseils précis, directs et utiles aux joueurs. 
Tu connais tous les traders, quêtes, cartes, mécaniques de craft et d'économie du jeu.
Réponds en français, de façon concise et structurée. Utilise des tirets pour les listes.
Ne réponds qu'aux questions liées à Tarkov.`;

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Désolé, je n'ai pas pu répondre.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Erreur de connexion. Réessaie." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 4rem)" }}>
      <PageHeader title="IA Coach Tarkov" sub="Conseils personnalisés basés sur ta situation" />

      {/* Chat area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "0 0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {/* Empty state */}
        {messages.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "2rem" }}>
            <div style={{
              width: 56, height: 56,
              background: "var(--gold-dim)",
              border: "1px solid rgba(200,168,75,0.3)",
              borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <Bot size={28} color="var(--gold)" />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>
              Coach Tarkov IA
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
              Pose ta question ou choisis une suggestion
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560, margin: "0 auto" }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    padding: "8px 14px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border2)",
                    borderRadius: 20,
                    fontSize: 13,
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget.style.borderColor = "var(--gold)"); (e.currentTarget.style.color = "var(--gold)"); }}
                  onMouseLeave={e => { (e.currentTarget.style.borderColor = "var(--border2)"); (e.currentTarget.style.color = "var(--text-muted)"); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            gap: 10,
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            alignItems: "flex-start",
          }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: "50%",
              background: msg.role === "user" ? "var(--gold-dim)" : "var(--bg-card2)",
              border: `1px solid ${msg.role === "user" ? "rgba(200,168,75,0.3)" : "var(--border)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {msg.role === "user"
                ? <User size={15} color="var(--gold)" />
                : <Bot size={15} color="var(--text-muted)" />
              }
            </div>
            <div style={{
              maxWidth: "75%",
              padding: "10px 14px",
              borderRadius: msg.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
              background: msg.role === "user" ? "var(--gold-dim)" : "var(--bg-card)",
              border: `1px solid ${msg.role === "user" ? "rgba(200,168,75,0.2)" : "var(--border)"}`,
              fontSize: 13,
              color: "var(--text)",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "var(--bg-card2)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Bot size={15} color="var(--text-muted)" />
            </div>
            <div style={{
              padding: "12px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "4px 12px 12px 12px",
            }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--text-dim)",
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "1rem",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send(input)}
          placeholder="Pose ta question sur Tarkov..."
          style={{
            flex: 1,
            background: "var(--bg-card)",
            border: "1px solid var(--border2)",
            borderRadius: 10,
            padding: "11px 16px",
            fontSize: 14,
            color: "var(--text)",
            outline: "none",
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          style={{
            width: 44, height: 44,
            background: input.trim() && !loading ? "var(--gold-dim)" : "var(--bg-card)",
            border: `1px solid ${input.trim() && !loading ? "var(--gold)" : "var(--border)"}`,
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
          }}
        >
          <Send size={16} color={input.trim() && !loading ? "var(--gold)" : "var(--text-dim)"} />
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
