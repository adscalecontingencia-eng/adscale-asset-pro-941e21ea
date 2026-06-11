import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { parseSheet } from "@/lib/seo/csvImport";
import { toast } from "sonner";
import { COMMERCIAL_PAGES, urlToPath } from "@/lib/seo/pageType";

type IndexRow = {
  id: string;
  snapshot_date: string;
  page: string;
  state: string | null;
  reason: string | null;
  priority: string | null;
};

const CRITICAL_STATES = [
  "Erro", "Erro de redirecionamento", "URL enviada não encontrada (404)",
  "Página com erro de redirecionamento", "Soft 404",
];

function classifyPriority(state: string | null, reason: string | null, page: string): string {
  const s = `${state ?? ""} ${reason ?? ""}`.toLowerCase();
  const path = urlToPath(page);
  const isCommercial = COMMERCIAL_PAGES.includes(path);
  if (s.includes("404") || s.includes("erro de redirecionamento")) return isCommercial ? "critica" : "alta";
  if (isCommercial && (s.includes("não indexada") || s.includes("excluída"))) return "critica";
  if (s.includes("descoberta") || s.includes("rastreada")) return "media";
  if (s.includes("excluída") || s.includes("noindex")) return "media";
  return "baixa";
}

const TechnicalTab = () => {
  const [rows, setRows] = useState<IndexRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data: latest } = await supabase
      .from("gsc_index_status").select("snapshot_date")
      .order("snapshot_date", { ascending: false }).limit(1);
    const snap = latest?.[0]?.snapshot_date;
    if (!snap) { setRows([]); setLoading(false); return; }
    const { data } = await supabase
      .from("gsc_index_status").select("*")
      .eq("snapshot_date", snap).limit(2000);
    setRows((data ?? []) as IndexRow[]);
    setLoading(false);
  }

  async function handleUpload(file: File) {
    try {
      const parsed = await parseSheet(file);
      const snap = new Date().toISOString().slice(0, 10);
      const payload = parsed
        .map((r) => {
          const lk = Object.keys(r).reduce<Record<string, string>>((a, k) => { a[k.toLowerCase().trim()] = k; return a; }, {});
          const page = String(r[lk["url"] ?? lk["página"] ?? lk["pagina"] ?? lk["page"] ?? ""] ?? "").trim();
          if (!page) return null;
          const state = String(r[lk["estado"] ?? lk["state"] ?? lk["status"] ?? ""] ?? "") || null;
          const reason = String(r[lk["motivo"] ?? lk["reason"] ?? ""] ?? "") || null;
          return { snapshot_date: snap, page, state, reason, priority: classifyPriority(state, reason, page) };
        })
        .filter(Boolean) as IndexRow[];
      if (!payload.length) { toast.error("Não encontrei URLs."); return; }
      await supabase.from("gsc_index_status").delete().eq("snapshot_date", snap);
      for (let i = 0; i < payload.length; i += 500) {
        const { error } = await supabase.from("gsc_index_status").insert(payload.slice(i, i + 500));
        if (error) throw error;
      }
      toast.success(`Importado: ${payload.length} URLs.`);
      load();
    } catch (e: unknown) {
      toast.error(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  const counts = {
    total: rows.length,
    critica: rows.filter((r) => r.priority === "critica").length,
    alta: rows.filter((r) => r.priority === "alta").length,
    notIndexed: rows.filter((r) => (r.state ?? "").toLowerCase().includes("não indexada") || (r.state ?? "").toLowerCase().includes("excluída")).length,
    errors: rows.filter((r) => CRITICAL_STATES.some((s) => (r.state ?? "").toLowerCase().includes(s.toLowerCase()))).length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Importe o relatório de Indexação/Cobertura do Search Console (Exportar → CSV/Sheets).
        </p>
        <label className="inline-flex items-center gap-2 cursor-pointer text-sm border border-input rounded-md px-3 h-9 hover:bg-accent">
          <Upload className="w-4 h-4" /> Importar CSV/XLSX
          <input type="file" accept=".csv,.xlsx,.xls" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard label="URLs" value={counts.total} />
        <KpiCard label="Críticas" value={counts.critica} color="text-red-500" />
        <KpiCard label="Alta prioridade" value={counts.alta} color="text-orange-500" />
        <KpiCard label="Não indexadas" value={counts.notIndexed} color="text-yellow-500" />
        <KpiCard label="Erros" value={counts.errors} color="text-red-500" />
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Prioridade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows
              .sort((a, b) => prioRank(b.priority) - prioRank(a.priority))
              .slice(0, 500)
              .map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs max-w-[320px] truncate">{r.page}</TableCell>
                  <TableCell className="text-xs">{r.state}</TableCell>
                  <TableCell className="text-xs">{r.reason}</TableCell>
                  <TableCell>
                    <Badge variant={r.priority === "critica" ? "destructive" : "secondary"}>{r.priority}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            {!rows.length && (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                {loading ? "Carregando…" : "Sem dados — importe o CSV de Indexação."}
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const prioRank = (p: string | null) => p === "critica" ? 3 : p === "alta" ? 2 : p === "media" ? 1 : 0;

const KpiCard = ({ label, value, color }: { label: string; value: number; color?: string }) => (
  <Card className="p-3">
    <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
    <div className={`text-xl font-bold ${color ?? ""}`}>{value.toLocaleString("pt-BR")}</div>
  </Card>
);

export default TechnicalTab;
