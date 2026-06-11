import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { COMMERCIAL_PAGES, urlToPath } from "@/lib/seo/pageType";
import { toast } from "sonner";
import { fmt, pct, type QueryRow } from "./types";

type WaCount = Record<string, number>;

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/bm-verificada": "BM Verificada",
  "/bm-ilimitada": "BM Ilimitada",
  "/contingencia-meta-ads": "Contingência Meta Ads",
  "/consultoria-meta-ads": "Consultoria Meta Ads",
  "/business-manager": "Business Manager",
  "/whatsapp-cloud-api": "WhatsApp Cloud API",
  "/dominios-verificados": "Domínios Verificados",
  "/perfis-facebook": "Perfis Facebook",
  "/perfil-aged": "Perfil Aged",
};

const CommercialPagesTab = ({ rows }: { rows: QueryRow[] }) => {
  const [wa, setWa] = useState<WaCount>({});

  useEffect(() => {
    supabase
      .from("whatsapp_clicks")
      .select("landing_page,route")
      .gte("created_at", new Date(Date.now() - 90 * 86400000).toISOString())
      .limit(5000)
      .then(({ data }) => {
        const m: WaCount = {};
        (data ?? []).forEach((c) => {
          const path = urlToPath(c.landing_page || c.route || "");
          m[path] = (m[path] ?? 0) + 1;
        });
        setWa(m);
      });
  }, []);

  const summary = useMemo(() => {
    return COMMERCIAL_PAGES.map((path) => {
      const matches = rows.filter((r) => r.page && urlToPath(r.page) === path);
      const clicks = matches.reduce((s, r) => s + r.clicks, 0);
      const impressions = matches.reduce((s, r) => s + r.impressions, 0);
      const ctr = impressions ? clicks / impressions : 0;
      const position = matches.length
        ? matches.reduce((s, r) => s + r.position * r.impressions, 0) / Math.max(1, impressions)
        : 0;
      const commercial = matches.filter((r) => r.intent === "comercial").length;
      const topQuery = [...matches].sort((a, b) => b.clicks - a.clicks)[0]?.query ?? "—";
      const waClicks = wa[path] ?? 0;
      const conv = clicks ? waClicks / clicks : 0;
      return { path, label: PAGE_LABELS[path] ?? path, clicks, impressions, ctr, position, commercial, topQuery, waClicks, conv, queryCount: matches.length };
    }).sort((a, b) => b.impressions - a.impressions);
  }, [rows, wa]);

  async function logOptimization(page: string) {
    const type = window.prompt("Tipo de otimização (title, meta, cta, link_interno, conteudo, schema)?", "title");
    if (!type) return;
    const notes = window.prompt("Notas (opcional)") ?? "";
    const { error } = await supabase.from("seo_optimizations").insert({ page, type, notes });
    if (error) toast.error(error.message);
    else toast.success("Otimização registrada.");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {summary.map((p) => (
        <Card key={p.path} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold">{p.label}</div>
              <div className="text-xs font-mono text-muted-foreground">{p.path}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => logOptimization(p.path)}>
              Marcar otimização
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3 text-center">
            <Metric label="Cliques" value={fmt(p.clicks)} />
            <Metric label="Impr." value={fmt(p.impressions)} />
            <Metric label="CTR" value={pct(p.ctr)} />
            <Metric label="Pos." value={p.position ? p.position.toFixed(1) : "—"} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <Metric label="Consultas" value={String(p.queryCount)} />
            <Metric label="Comerciais" value={String(p.commercial)} />
            <Metric label="WhatsApp" value={`${fmt(p.waClicks)} (${pct(p.conv)})`} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <strong>Top consulta:</strong> {p.topQuery}
          </div>
          {p.impressions === 0 && (
            <Badge variant="destructive" className="mt-2">Sem impressões no período</Badge>
          )}
        </Card>
      ))}
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
    <div className="font-semibold text-sm">{value}</div>
  </div>
);

export default CommercialPagesTab;
