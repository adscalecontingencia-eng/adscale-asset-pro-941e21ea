import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { urlToPath, COMMERCIAL_PAGES } from "@/lib/seo/pageType";
import { fmt, pct, type QueryRow } from "./types";

const BlogTab = ({ rows }: { rows: QueryRow[] }) => {
  const articles = useMemo(() => {
    const map = new Map<string, {
      page: string; clicks: number; impressions: number; ctr: number; position: number;
      queryCount: number; topQuery: string; topIntent: string;
      hasCommercialQuery: boolean; potentialLp: string | null;
    }>();
    for (const r of rows) {
      if (!r.page) continue;
      const p = urlToPath(r.page);
      if (!p.startsWith("/blog/") || p.startsWith("/blog/pilar/")) continue;
      const ex = map.get(p);
      if (!ex) {
        map.set(p, {
          page: p, clicks: r.clicks, impressions: r.impressions,
          ctr: r.ctr, position: r.position, queryCount: 1, topQuery: r.query,
          topIntent: r.intent, hasCommercialQuery: r.intent === "comercial",
          potentialLp: r.intent === "comercial" ? suggestLp(r.query) : null,
        });
      } else {
        ex.clicks += r.clicks; ex.impressions += r.impressions;
        ex.queryCount += 1;
        if (r.clicks > (ex.clicks - r.clicks)) { ex.topQuery = r.query; ex.topIntent = r.intent; }
        if (r.intent === "comercial") {
          ex.hasCommercialQuery = true;
          ex.potentialLp = ex.potentialLp ?? suggestLp(r.query);
        }
      }
    }
    return Array.from(map.values())
      .map((a) => ({
        ...a,
        ctr: a.impressions ? a.clicks / a.impressions : 0,
        action: recommendBlogAction(a),
      }))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 200);
  }, [rows]);

  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artigo</TableHead>
            <TableHead className="text-right">Cliques</TableHead>
            <TableHead className="text-right">Impr.</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Pos.</TableHead>
            <TableHead>Top consulta</TableHead>
            <TableHead>Comercial?</TableHead>
            <TableHead>LP sugerida</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((a) => (
            <TableRow key={a.page}>
              <TableCell className="font-mono text-xs max-w-[240px] truncate">{a.page}</TableCell>
              <TableCell className="text-right">{fmt(a.clicks)}</TableCell>
              <TableCell className="text-right">{fmt(a.impressions)}</TableCell>
              <TableCell className="text-right">{pct(a.ctr)}</TableCell>
              <TableCell className="text-right">{a.position.toFixed(1)}</TableCell>
              <TableCell className="text-xs max-w-[200px] truncate">{a.topQuery}</TableCell>
              <TableCell>
                {a.hasCommercialQuery
                  ? <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Sim</Badge>
                  : <span className="text-muted-foreground text-xs">não</span>}
              </TableCell>
              <TableCell className="text-xs font-mono">{a.potentialLp ?? "—"}</TableCell>
              <TableCell className="text-xs">{a.action}</TableCell>
            </TableRow>
          ))}
          {!articles.length && (
            <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Sem artigos de blog no snapshot.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

function suggestLp(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("verificada")) return "/bm-verificada";
  if (q.includes("ilimitada")) return "/bm-ilimitada";
  if (q.includes("whatsapp")) return "/whatsapp-cloud-api";
  if (q.includes("consultoria")) return "/consultoria-meta-ads";
  if (q.includes("domínio") || q.includes("dominio")) return "/dominios-verificados";
  if (q.includes("perfil") || q.includes("perfis")) return "/perfis-facebook";
  if (q.includes("contingência") || q.includes("contingencia")) return "/contingencia-meta-ads";
  if (q.includes("business manager") || q.includes("bm")) return "/business-manager";
  return COMMERCIAL_PAGES[0];
}

function recommendBlogAction(a: { impressions: number; ctr: number; position: number; hasCommercialQuery: boolean }): string {
  if (a.hasCommercialQuery && a.impressions >= 30) return "Adicionar CTA e link para LP comercial";
  if (a.impressions >= 100 && a.ctr < 0.02) return "Reescrever title/meta";
  if (a.position >= 4 && a.position <= 20 && a.impressions >= 30) return "Atualizar e expandir conteúdo";
  if (a.position > 20 && a.impressions >= 50) return "Revisar SEO on-page e linkagem";
  return "Monitorar";
}

export default BlogTab;
