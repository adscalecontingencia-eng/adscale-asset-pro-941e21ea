import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { urlToPath } from "@/lib/seo/pageType";
import { fmt, pct, type QueryRow } from "./types";

type WaClick = { landing_page: string | null; route: string | null; source: string | null; search_engine: string | null };

const WhatsAppTab = ({ rows }: { rows: QueryRow[] }) => {
  const [clicks, setClicks] = useState<WaClick[]>([]);

  useEffect(() => {
    supabase
      .from("whatsapp_clicks")
      .select("landing_page,route,source,search_engine")
      .gte("created_at", new Date(Date.now() - 90 * 86400000).toISOString())
      .limit(10000)
      .then(({ data }) => setClicks((data ?? []) as WaClick[]));
  }, []);

  const byPage = useMemo(() => {
    const orgClicks: Record<string, number> = {};
    for (const c of clicks) {
      const path = urlToPath(c.landing_page || c.route || "");
      orgClicks[path] = (orgClicks[path] ?? 0) + 1;
    }
    const seoClicks: Record<string, number> = {};
    for (const r of rows) {
      if (!r.page) continue;
      const path = urlToPath(r.page);
      seoClicks[path] = (seoClicks[path] ?? 0) + r.clicks;
    }
    const pages = new Set([...Object.keys(orgClicks), ...Object.keys(seoClicks)]);
    return Array.from(pages)
      .map((p) => ({
        page: p,
        seo: seoClicks[p] ?? 0,
        wa: orgClicks[p] ?? 0,
        conv: seoClicks[p] ? (orgClicks[p] ?? 0) / seoClicks[p] : 0,
      }))
      .sort((a, b) => b.wa - a.wa);
  }, [rows, clicks]);

  const totals = {
    organic: byPage.reduce((s, p) => s + p.seo, 0),
    wa: byPage.reduce((s, p) => s + p.wa, 0),
  };
  const overallConv = totals.organic ? totals.wa / totals.organic : 0;

  const orphanPages = byPage.filter((p) => p.seo >= 20 && p.wa === 0).slice(0, 20);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Cliques orgânicos (snapshot)" value={fmt(totals.organic)} />
        <Kpi label="Cliques WhatsApp (90d)" value={fmt(totals.wa)} />
        <Kpi label="Conversão WhatsApp" value={pct(overallConv)} />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-3 text-sm font-medium border-b">SEO × WhatsApp por página</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Cliques orgânicos</TableHead>
              <TableHead className="text-right">Cliques WhatsApp</TableHead>
              <TableHead className="text-right">Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {byPage.slice(0, 100).map((p) => (
              <TableRow key={p.page}>
                <TableCell className="font-mono text-xs max-w-[320px] truncate">{p.page}</TableCell>
                <TableCell className="text-right">{fmt(p.seo)}</TableCell>
                <TableCell className="text-right">{fmt(p.wa)}</TableCell>
                <TableCell className={`text-right ${p.conv >= 0.05 ? "text-emerald-500" : p.conv > 0 ? "" : "text-muted-foreground"}`}>{pct(p.conv)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {orphanPages.length > 0 && (
        <Card className="p-0 overflow-hidden border-yellow-500/30">
          <div className="p-3 text-sm font-medium border-b bg-yellow-500/5">
            Páginas com tráfego, mas sem clique no WhatsApp ({orphanPages.length})
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Cliques orgânicos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orphanPages.map((p) => (
                <TableRow key={p.page}>
                  <TableCell className="font-mono text-xs">{p.page}</TableCell>
                  <TableCell className="text-right">{fmt(p.seo)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

const Kpi = ({ label, value }: { label: string; value: string }) => (
  <Card className="p-4">
    <div className="text-[11px] uppercase text-muted-foreground">{label}</div>
    <div className="font-display text-2xl font-bold mt-1">{value}</div>
  </Card>
);

export default WhatsAppTab;
