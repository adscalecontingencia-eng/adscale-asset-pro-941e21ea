import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { fmt, pct, type QueryRow } from "./types";

type Decision =
  | "otimizar_pagina_atual"
  | "criar_nova_lp"
  | "consolidar"
  | "linkar_para_comercial"
  | "adicionar_cta_whatsapp"
  | "atualizar_title_meta"
  | "monitorar";

const DECISION_LABEL: Record<Decision, string> = {
  otimizar_pagina_atual: "Otimizar página atual",
  criar_nova_lp: "Criar nova LP comercial",
  consolidar: "Consolidar / canonical",
  linkar_para_comercial: "Linkar para LP comercial",
  adicionar_cta_whatsapp: "Adicionar CTA WhatsApp",
  atualizar_title_meta: "Atualizar title/meta",
  monitorar: "Monitorar",
};

function decide(q: QueryRow, dupes: number): Decision {
  if (dupes > 1) return "consolidar";
  if (q.intent === "comercial" && q.pageType === "blog") return "criar_nova_lp";
  if ((q.intent === "problema" || q.intent === "informacional") && q.pageType === "blog" && q.impressions >= 30)
    return "linkar_para_comercial";
  if (q.impressions >= 100 && q.ctr < 0.02 && q.position <= 20) return "atualizar_title_meta";
  if (q.intent === "comercial" && q.pageType === "comercial" && q.ctr < 0.05) return "adicionar_cta_whatsapp";
  if (q.position >= 4 && q.position <= 20) return "otimizar_pagina_atual";
  return "monitorar";
}

const QueryPageTab = ({ rows }: { rows: QueryRow[] }) => {
  const decorated = useMemo(() => {
    const dupeMap = new Map<string, number>();
    for (const r of rows) dupeMap.set(r.query, (dupeMap.get(r.query) ?? 0) + 1);
    return rows
      .map((r) => ({
        ...r,
        dupes: dupeMap.get(r.query) ?? 1,
        decision: decide(r, dupeMap.get(r.query) ?? 1),
        match:
          (r.intent === "comercial" && r.pageType === "comercial") ||
          (r.intent !== "comercial" && r.pageType !== "comercial"),
      }))
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 300);
  }, [rows]);

  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Consulta</TableHead>
            <TableHead>URL ranqueada</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Impr.</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Pos.</TableHead>
            <TableHead>Intenção × página</TableHead>
            <TableHead>Decisão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decorated.map((r, i) => (
            <TableRow key={`${r.query}-${r.page}-${i}`}>
              <TableCell className="max-w-[220px] truncate">
                {r.query}
                {r.dupes > 1 && <Badge variant="destructive" className="ml-2 text-[10px]">×{r.dupes}</Badge>}
              </TableCell>
              <TableCell className="font-mono text-xs max-w-[240px] truncate">{r.page ?? "—"}</TableCell>
              <TableCell><Badge variant="outline">{r.pageType}</Badge></TableCell>
              <TableCell className="text-right">{fmt(r.impressions)}</TableCell>
              <TableCell className="text-right">{pct(r.ctr)}</TableCell>
              <TableCell className="text-right">{r.position.toFixed(1)}</TableCell>
              <TableCell className="text-xs">
                {r.match ? <span className="text-emerald-500">combina</span> : <span className="text-red-500">desalinhado</span>}
              </TableCell>
              <TableCell className="text-xs font-medium">{DECISION_LABEL[r.decision]}</TableCell>
            </TableRow>
          ))}
          {!decorated.length && (
            <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Sem dados.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default QueryPageTab;
