import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { fmt, pct } from "./types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";

type Opt = {
  id: string; page: string; type: string; applied_at: string; notes: string | null;
};

type Daily = { date: string; clicks: number; impressions: number; ctr: number; position: number };

const BeforeAfterTab = () => {
  const [opts, setOpts] = useState<Opt[]>([]);
  const [pagesData, setPagesData] = useState<Record<string, { before: Agg; after: Agg }>>({});

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from("seo_optimizations").select("*")
      .order("applied_at", { ascending: false }).limit(100);
    const list = (data ?? []) as Opt[];
    setOpts(list);

    // For each optimized page, compare 28d before vs 28d after applied_at using gsc_page_snapshots
    const result: Record<string, { before: Agg; after: Agg }> = {};
    for (const o of list) {
      const applied = new Date(o.applied_at);
      const before = await aggPage(o.page, daysBefore(applied, 28), applied);
      const after = await aggPage(o.page, applied, daysAfter(applied, 28));
      result[o.id] = { before, after };
    }
    setPagesData(result);
  }

  async function remove(id: string) {
    if (!confirm("Remover registro?")) return;
    const { error } = await supabase.from("seo_optimizations").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Removido."); load(); }
  }

  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Página</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Cliques antes → depois</TableHead>
            <TableHead className="text-right">Impr. antes → depois</TableHead>
            <TableHead className="text-right">CTR antes → depois</TableHead>
            <TableHead className="text-right">Pos. antes → depois</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opts.map((o) => {
            const d = pagesData[o.id];
            const b = d?.before; const a = d?.after;
            return (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs max-w-[220px] truncate">{o.page}</TableCell>
                <TableCell><Badge variant="outline">{o.type}</Badge></TableCell>
                <TableCell className="text-xs">{new Date(o.applied_at).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell className="text-right text-xs">{b ? `${fmt(b.clicks)} → ${fmt(a!.clicks)}` : "—"} {b && delta(a!.clicks, b.clicks)}</TableCell>
                <TableCell className="text-right text-xs">{b ? `${fmt(b.impressions)} → ${fmt(a!.impressions)}` : "—"} {b && delta(a!.impressions, b.impressions)}</TableCell>
                <TableCell className="text-right text-xs">{b ? `${pct(b.ctr)} → ${pct(a!.ctr)}` : "—"}</TableCell>
                <TableCell className="text-right text-xs">{b ? `${b.position.toFixed(1)} → ${a!.position.toFixed(1)}` : "—"}</TableCell>
                <TableCell><Button size="sm" variant="ghost" onClick={() => remove(o.id)}>×</Button></TableCell>
              </TableRow>
            );
          })}
          {!opts.length && (
            <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">
              Nenhuma otimização registrada. Use o botão "Marcar otimização" na aba Páginas Comerciais.
            </TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

type Agg = { clicks: number; impressions: number; ctr: number; position: number };

async function aggPage(page: string, from: Date, to: Date): Promise<Agg> {
  // Match by path suffix to be resilient to www vs apex
  const path = page.startsWith("/") ? page : new URL(page).pathname;
  const { data } = await supabase
    .from("gsc_page_snapshots")
    .select("clicks,impressions,ctr,position,page,snapshot_date")
    .gte("snapshot_date", from.toISOString().slice(0, 10))
    .lt("snapshot_date", to.toISOString().slice(0, 10))
    .ilike("page", `%${path}`);
  const rows = data ?? [];
  const clicks = rows.reduce((s, r) => s + (r.clicks ?? 0), 0);
  const impressions = rows.reduce((s, r) => s + (r.impressions ?? 0), 0);
  const ctr = impressions ? clicks / impressions : 0;
  const position = rows.length
    ? rows.reduce((s, r) => s + Number(r.position ?? 0) * (r.impressions ?? 0), 0) / Math.max(1, impressions)
    : 0;
  return { clicks, impressions, ctr, position };
}

function daysBefore(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate() - n); return x; }
function daysAfter(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

function delta(after: number, before: number) {
  if (!before) return null;
  const d = (after - before) / before;
  const color = d >= 0.05 ? "text-emerald-500" : d <= -0.05 ? "text-red-500" : "text-yellow-500";
  const Icon = d >= 0 ? ArrowUp : ArrowDown;
  return <span className={`inline-flex items-center gap-1 ${color}`}><Icon className="w-3 h-3" />{(d * 100).toFixed(1)}%</span>;
}

export default BeforeAfterTab;
