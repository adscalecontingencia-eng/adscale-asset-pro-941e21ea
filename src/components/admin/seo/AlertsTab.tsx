import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { urlToPath, COMMERCIAL_PAGES } from "@/lib/seo/pageType";
import { fmt, pct, type QueryRow, type Daily } from "./types";

type Alert = { severity: "alta" | "media" | "baixa"; title: string; detail: string };

const AlertsTab = ({ rows, daily }: { rows: QueryRow[]; daily: Daily[] }) => {
  const alerts = useMemo(() => {
    const out: Alert[] = [];

    // 1) Páginas comerciais sem impressões
    const presentPages = new Set(rows.map((r) => r.page ? urlToPath(r.page) : ""));
    for (const p of COMMERCIAL_PAGES) {
      if (!presentPages.has(p)) {
        out.push({ severity: "alta", title: `Página comercial sem impressões: ${p}`, detail: "Verifique indexação, links internos e backlinks." });
      }
    }

    // 2) Baixo CTR com muitas impressões
    for (const r of rows) {
      if (r.impressions >= 200 && r.ctr < 0.02 && r.position <= 20) {
        out.push({ severity: "alta", title: `Baixo CTR — ${r.query}`, detail: `${fmt(r.impressions)} impressões, CTR ${pct(r.ctr)} em ${r.page ?? "—"}. Reescreva title/meta.` });
      }
    }

    // 3) Consulta comercial em artigo de blog
    for (const r of rows) {
      if (r.intent === "comercial" && r.pageType === "blog" && r.impressions >= 30) {
        out.push({ severity: "alta", title: `Consulta comercial em blog — ${r.query}`, detail: `Ranqueando em ${r.page}. Criar/fortalecer LP comercial e linkar.` });
      }
    }

    // 4) Queda de cliques > 20% (últimos 7d vs 7d anteriores)
    if (daily.length >= 14) {
      const last7 = daily.slice(-7).reduce((s, d) => s + d.clicks, 0);
      const prev7 = daily.slice(-14, -7).reduce((s, d) => s + d.clicks, 0);
      if (prev7 > 0 && (last7 - prev7) / prev7 <= -0.2) {
        out.push({ severity: "alta", title: "Queda de cliques > 20%", detail: `7d atual: ${last7} · 7d anterior: ${prev7}.` });
      }
      const lastI = daily.slice(-7).reduce((s, d) => s + d.impressions, 0);
      const prevI = daily.slice(-14, -7).reduce((s, d) => s + d.impressions, 0);
      if (prevI > 0 && (lastI - prevI) / prevI <= -0.2) {
        out.push({ severity: "media", title: "Queda de impressões > 20%", detail: `7d atual: ${lastI} · 7d anterior: ${prevI}.` });
      }
    }

    // 5) Quick wins de alta intenção
    for (const r of rows) {
      if (r.intent === "comercial" && r.position >= 4 && r.position <= 10 && r.impressions >= 50) {
        out.push({ severity: "media", title: `Quase top 3 — ${r.query}`, detail: `Pos ${r.position.toFixed(1)} · ${fmt(r.impressions)} impr. Reforçar título, links internos e schema.` });
      }
    }

    return out
      .sort((a, b) => sevRank(b.severity) - sevRank(a.severity))
      .slice(0, 80);
  }, [rows, daily]);

  return (
    <div className="space-y-2">
      {alerts.map((a, i) => (
        <Card key={i} className={`p-3 flex items-start gap-3 border-l-4 ${
          a.severity === "alta" ? "border-l-red-500" : a.severity === "media" ? "border-l-yellow-500" : "border-l-muted"
        }`}>
          <AlertTriangle className={`w-4 h-4 mt-0.5 ${a.severity === "alta" ? "text-red-500" : "text-yellow-500"}`} />
          <div className="flex-1">
            <div className="font-medium text-sm">{a.title}</div>
            <div className="text-xs text-muted-foreground">{a.detail}</div>
          </div>
          <Badge variant={a.severity === "alta" ? "destructive" : "secondary"}>{a.severity}</Badge>
        </Card>
      ))}
      {!alerts.length && (
        <Card className="p-6 text-center text-muted-foreground text-sm">Sem alertas no momento.</Card>
      )}
    </div>
  );
};

const sevRank = (s: string) => s === "alta" ? 3 : s === "media" ? 2 : 1;

export default AlertsTab;
