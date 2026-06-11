import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { ArrowDown, ArrowRight, ArrowUp, LogOut, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { classifyIntent, type Intent } from "@/lib/seo/intent";
import { classifyPageType, type PageType } from "@/lib/seo/pageType";
import {
  detectOpportunity, OPPORTUNITY_LABEL, recommendAction, type Opportunity,
} from "@/lib/seo/opportunity";
import { priorityScore, scoreBand } from "@/lib/seo/score";
import { normalize, parseSheet } from "@/lib/seo/csvImport";

type Daily = { date: string; clicks: number; impressions: number; ctr: number; position: number };
type QueryRow = {
  query: string; page: string | null;
  clicks: number; impressions: number; ctr: number; position: number;
  intent: Intent; pageType: PageType; opportunity: Opportunity; score: number;
};

type Period = "7d" | "28d" | "90d" | "180d" | "365d";
const periodDays: Record<Period, number> = {
  "7d": 7, "28d": 28, "90d": 90, "180d": 180, "365d": 365,
};

function pct(n: number) { return `${(n * 100).toFixed(2)}%`; }
function fmt(n: number) { return n.toLocaleString("pt-BR"); }
function delta(curr: number, prev: number) {
  if (!prev) return null;
  return (curr - prev) / prev;
}

const DeltaBadge = ({ d }: { d: number | null }) => {
  if (d === null) return <span className="text-xs text-muted-foreground">—</span>;
  const color = d >= 0.05 ? "text-emerald-500" : d <= -0.05 ? "text-red-500" : "text-yellow-500";
  const Icon = d >= 0.05 ? ArrowUp : d <= -0.05 ? ArrowDown : ArrowRight;
  return (
    <span className={`text-xs inline-flex items-center gap-1 ${color}`}>
      <Icon className="w-3 h-3" />{(d * 100).toFixed(1)}%
    </span>
  );
};

const Kpi = ({ label, value, d }: { label: string; value: string; d: number | null }) => (
  <Card className="p-4">
    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="font-display text-2xl font-bold mt-1">{value}</div>
    <div className="mt-1"><DeltaBadge d={d} /></div>
  </Card>
);

const SeoDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [period, setPeriod] = useState<Period>("28d");
  const [pageTypeFilter, setPageTypeFilter] = useState<string>("all");
  const [intentFilter, setIntentFilter] = useState<string>("all");
  const [posFilter, setPosFilter] = useState<string>("all");
  const [oppFilter, setOppFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [daily, setDaily] = useState<Daily[]>([]);
  const [queries, setQueries] = useState<QueryRow[]>([]);
  const [latestSnapshot, setLatestSnapshot] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate("/admin/login", { replace: true }); return; }
      setAuthorized(true);
      await loadData();
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function loadData() {
    const { data: d } = await supabase
      .from("gsc_daily_metrics").select("*")
      .order("date", { ascending: true }).limit(400);
    setDaily((d ?? []) as Daily[]);

    const { data: latest } = await supabase
      .from("gsc_query_snapshots").select("snapshot_date")
      .order("snapshot_date", { ascending: false }).limit(1);
    const snap = latest?.[0]?.snapshot_date as string | undefined;
    setLatestSnapshot(snap ?? null);

    if (snap) {
      const { data: rows } = await supabase
        .from("gsc_query_snapshots").select("*")
        .eq("snapshot_date", snap).limit(5000);
      const enriched: QueryRow[] = (rows ?? []).map((r) => {
        const intent = classifyIntent(r.query);
        const pageType = r.page ? classifyPageType(r.page) : "outras";
        const opportunity = detectOpportunity({
          impressions: r.impressions, ctr: Number(r.ctr), position: Number(r.position),
          intent, pageType,
        });
        const score = priorityScore({
          impressions: r.impressions, ctr: Number(r.ctr), position: Number(r.position),
          intent, pageType,
        });
        return {
          query: r.query, page: r.page,
          clicks: r.clicks, impressions: r.impressions,
          ctr: Number(r.ctr), position: Number(r.position),
          intent, pageType, opportunity, score,
        };
      });
      setQueries(enriched);
    } else {
      setQueries([]);
    }
  }

  async function handleSync() {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("gsc-sync", {
        body: { days: periodDays[period] },
      });
      if (error) throw error;
      toast.success(`Sincronizado: ${data?.queries ?? 0} consultas, ${data?.pages ?? 0} páginas.`);
      await loadData();
    } catch (e: unknown) {
      toast.error(`Falha ao sincronizar: ${e instanceof Error ? e.message : String(e)}`);
    } finally { setSyncing(false); }
  }

  async function handleUpload(file: File) {
    try {
      const rows = normalize(await parseSheet(file));
      const snap = new Date().toISOString().slice(0, 10);
      const payload = rows
        .filter((r) => r.query || r.page)
        .map((r) => ({
          snapshot_date: snap, query: r.query ?? "(sem consulta)", page: r.page ?? null,
          clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
        }));
      if (!payload.length) { toast.error("Planilha vazia ou sem colunas reconhecidas."); return; }
      await supabase.from("gsc_query_snapshots").delete().eq("snapshot_date", snap);
      for (let i = 0; i < payload.length; i += 500) {
        const { error } = await supabase.from("gsc_query_snapshots").insert(payload.slice(i, i + 500));
        if (error) throw error;
      }
      toast.success(`Importado: ${payload.length} linhas.`);
      await loadData();
    } catch (e: unknown) {
      toast.error(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  // KPIs from daily series within selected period
  const kpis = useMemo(() => {
    const days = periodDays[period];
    const cutoff = Date.now() - days * 86400000;
    const prevCutoff = Date.now() - 2 * days * 86400000;
    const curr = daily.filter((d) => new Date(d.date).getTime() >= cutoff);
    const prev = daily.filter((d) => {
      const t = new Date(d.date).getTime();
      return t >= prevCutoff && t < cutoff;
    });
    const sum = (arr: Daily[], k: keyof Daily) =>
      arr.reduce((s, r) => s + Number(r[k] ?? 0), 0);
    const avg = (arr: Daily[], k: keyof Daily) =>
      arr.length ? sum(arr, k) / arr.length : 0;
    return {
      clicks: { v: sum(curr, "clicks"), d: delta(sum(curr, "clicks"), sum(prev, "clicks")) },
      impressions: { v: sum(curr, "impressions"), d: delta(sum(curr, "impressions"), sum(prev, "impressions")) },
      ctr: { v: avg(curr, "ctr"), d: delta(avg(curr, "ctr"), avg(prev, "ctr")) },
      position: { v: avg(curr, "position"), d: delta(avg(prev, "position"), avg(curr, "position")) }, // inverted: lower=better
      series: curr,
    };
  }, [daily, period]);

  // Apply filters to query rows
  const filteredQueries = useMemo(() => {
    return queries.filter((q) => {
      if (pageTypeFilter !== "all" && q.pageType !== pageTypeFilter) return false;
      if (intentFilter !== "all" && q.intent !== intentFilter) return false;
      if (oppFilter !== "all" && q.opportunity !== oppFilter) return false;
      if (posFilter !== "all") {
        const p = q.position;
        if (posFilter === "top3" && !(p <= 3)) return false;
        if (posFilter === "4_10" && !(p >= 4 && p <= 10)) return false;
        if (posFilter === "11_20" && !(p >= 11 && p <= 20)) return false;
        if (posFilter === "21_50" && !(p >= 21 && p <= 50)) return false;
        if (posFilter === "50plus" && !(p > 50)) return false;
      }
      if (search) {
        const s = search.toLowerCase();
        if (!q.query.toLowerCase().includes(s) && !(q.page ?? "").toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [queries, pageTypeFilter, intentFilter, oppFilter, posFilter, search]);

  const quickWins = useMemo(
    () => filteredQueries
      .filter((q) => q.opportunity === "quick_win" || (q.position >= 4 && q.position <= 20 && q.impressions >= 20))
      .sort((a, b) => b.score - a.score)
      .slice(0, 100),
    [filteredQueries],
  );

  const lowCtr = useMemo(
    () => filteredQueries
      .filter((q) => q.impressions >= 100 && q.ctr < 0.02 && q.position <= 20)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 100),
    [filteredQueries],
  );

  // Build page aggregation from queries
  const pages = useMemo(() => {
    const map = new Map<string, {
      page: string; clicks: number; impressions: number; ctr: number; position: number;
      queryCount: number; topQuery: string; pageType: PageType; score: number;
    }>();
    for (const q of filteredQueries) {
      if (!q.page) continue;
      const ex = map.get(q.page);
      if (!ex) {
        map.set(q.page, {
          page: q.page, clicks: q.clicks, impressions: q.impressions,
          ctr: q.ctr, position: q.position, queryCount: 1, topQuery: q.query,
          pageType: q.pageType, score: q.score,
        });
      } else {
        ex.clicks += q.clicks; ex.impressions += q.impressions;
        ex.queryCount += 1;
        if (q.clicks > 0 && q.clicks > (map.get(q.page)!.clicks - q.clicks)) ex.topQuery = q.query;
        ex.score = Math.max(ex.score, q.score);
      }
    }
    return Array.from(map.values()).sort((a, b) => b.impressions - a.impressions);
  }, [filteredQueries]);

  async function generateActionPlan() {
    const items = quickWins.slice(0, 30).map((q) => ({
      priority: q.score >= 81 ? "critica" : q.score >= 61 ? "alta" : "media",
      type: OPPORTUNITY_LABEL[q.opportunity],
      page: q.page,
      query: q.query,
      metric: `impr ${q.impressions} · CTR ${pct(q.ctr)} · pos ${q.position.toFixed(1)}`,
      recommendation: recommendAction(q.opportunity, q.intent, q.pageType),
      score: q.score,
      status: "todo",
    }));
    if (!items.length) { toast.message("Nada a inserir."); return; }
    const { error } = await supabase.from("seo_action_items").insert(items);
    if (error) toast.error(error.message); else toast.success(`${items.length} ações geradas.`);
  }

  if (loading || !authorized) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando…</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="SEO Dashboard | AD Scale Admin" description="Painel de SEO Google Search Console" noIndex />
      <header className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="text-sm text-muted-foreground">SEO Dashboard</span>
            {latestSnapshot && (
              <Badge variant="secondary" className="text-xs">snapshot {latestSnapshot}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin"><Button variant="ghost" size="sm">Cliques</Button></Link>
            <Button size="sm" variant="outline" onClick={handleSync} disabled={syncing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
              Sincronizar GSC
            </Button>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm border border-input rounded-md px-3 h-9 hover:bg-accent">
              <Upload className="w-4 h-4" /> CSV/XLSX
              <input
                type="file" accept=".csv,.xlsx,.xls" className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
            </label>
            <Button size="sm" variant="ghost" onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Período</div>
              <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="28d">28 dias</SelectItem>
                  <SelectItem value="90d">3 meses</SelectItem>
                  <SelectItem value="180d">6 meses</SelectItem>
                  <SelectItem value="365d">12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Tipo de página</div>
              <Select value={pageTypeFilter} onValueChange={setPageTypeFilter}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="pilar">Pilar</SelectItem>
                  <SelectItem value="outras">Outras</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Intenção</div>
              <Select value={intentFilter} onValueChange={setIntentFilter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="problema">Problema/Dor</SelectItem>
                  <SelectItem value="informacional">Informacional</SelectItem>
                  <SelectItem value="tecnica">Técnica</SelectItem>
                  <SelectItem value="marca">Marca</SelectItem>
                  <SelectItem value="navegacional">Navegacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Posição</div>
              <Select value={posFilter} onValueChange={setPosFilter}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="top3">Top 3</SelectItem>
                  <SelectItem value="4_10">4 a 10</SelectItem>
                  <SelectItem value="11_20">11 a 20</SelectItem>
                  <SelectItem value="21_50">21 a 50</SelectItem>
                  <SelectItem value="50plus">Acima de 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Oportunidade</div>
              <Select value={oppFilter} onValueChange={setOppFilter}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="quick_win">Oportunidade rápida</SelectItem>
                  <SelectItem value="baixo_ctr">Baixo CTR</SelectItem>
                  <SelectItem value="comercial_prioritaria">Comercial prioritária</SelectItem>
                  <SelectItem value="lead_informacional">Potencial de lead</SelectItem>
                  <SelectItem value="nova_pagina">Nova página</SelectItem>
                  <SelectItem value="canibalizacao">Canibalização</SelectItem>
                  <SelectItem value="monitorar">Monitorar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-[11px] uppercase text-muted-foreground mb-1">Buscar consulta ou URL</div>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex.: bm verificada" />
            </div>
          </div>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="queries">Consultas</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
            <TabsTrigger value="querypage">Consulta × Página</TabsTrigger>
            <TabsTrigger value="quickwins">Quick Wins</TabsTrigger>
            <TabsTrigger value="lowctr">Baixo CTR</TabsTrigger>
            <TabsTrigger value="commercial">Páginas Comerciais</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="technical">SEO Técnico</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="actions">Plano de Ação</TabsTrigger>
            <TabsTrigger value="beforeafter">Antes/Depois</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
          </TabsList>


          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Kpi label="Cliques" value={fmt(kpis.clicks.v)} d={kpis.clicks.d} />
              <Kpi label="Impressões" value={fmt(kpis.impressions.v)} d={kpis.impressions.d} />
              <Kpi label="CTR médio" value={pct(kpis.ctr.v)} d={kpis.ctr.d} />
              <Kpi label="Posição média" value={kpis.position.v.toFixed(1)} d={kpis.position.d} />
            </div>
            <Card className="p-4">
              <div className="text-sm font-medium mb-3">Cliques x Impressões (diário)</div>
              <div className="h-72">
                <ResponsiveContainer>
                  <AreaChart data={kpis.series}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" fillOpacity={0.15} fill="hsl(var(--muted-foreground))" />
                    <Area type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            {!daily.length && (
              <Card className="p-6 text-sm text-muted-foreground">
                Nenhum dado ainda. Clique em <strong>Sincronizar GSC</strong> ou faça upload de um CSV/XLSX do Search Console.
              </Card>
            )}
          </TabsContent>

          {/* Queries */}
          <TabsContent value="queries">
            <Card className="p-0 overflow-hidden">
              <QueryTable rows={filteredQueries.slice(0, 500)} />
            </Card>
          </TabsContent>

          {/* Pages */}
          <TabsContent value="pages">
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead><TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Cliques</TableHead>
                    <TableHead className="text-right">Impressões</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Pos.</TableHead>
                    <TableHead className="text-right">Consultas</TableHead>
                    <TableHead>Top consulta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.slice(0, 200).map((p) => (
                    <TableRow key={p.page}>
                      <TableCell className="font-mono text-xs max-w-[280px] truncate">{p.page}</TableCell>
                      <TableCell><Badge variant="outline">{p.pageType}</Badge></TableCell>
                      <TableCell className="text-right">{fmt(p.clicks)}</TableCell>
                      <TableCell className="text-right">{fmt(p.impressions)}</TableCell>
                      <TableCell className="text-right">{pct(p.ctr)}</TableCell>
                      <TableCell className="text-right">{p.position.toFixed(1)}</TableCell>
                      <TableCell className="text-right">{p.queryCount}</TableCell>
                      <TableCell className="text-xs max-w-[200px] truncate">{p.topQuery}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="quickwins">
            <Card className="p-0 overflow-hidden">
              <QueryTable rows={quickWins} />
            </Card>
          </TabsContent>

          <TabsContent value="lowctr">
            <Card className="p-0 overflow-hidden">
              <QueryTable rows={lowCtr} />
            </Card>
          </TabsContent>

          <TabsContent value="querypage">
            <QueryPageTab rows={filteredQueries} />
          </TabsContent>

          <TabsContent value="commercial">
            <CommercialPagesTab rows={filteredQueries} />
          </TabsContent>

          <TabsContent value="blog">
            <BlogTab rows={filteredQueries} />
          </TabsContent>

          <TabsContent value="technical">
            <TechnicalTab />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppTab rows={filteredQueries} />
          </TabsContent>

          <TabsContent value="actions" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Gera automaticamente itens de plano de ação a partir dos Quick Wins atuais (topo 30).
              </p>
              <Button onClick={generateActionPlan}>Gerar 30 ações</Button>
            </div>
            <ActionPlanList />
          </TabsContent>

          <TabsContent value="beforeafter">
            <BeforeAfterTab />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab rows={filteredQueries} daily={daily} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};


const intentColor: Record<Intent, string> = {
  comercial: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  problema: "bg-red-500/10 text-red-500 border-red-500/20",
  informacional: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  tecnica: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  marca: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  navegacional: "bg-muted text-muted-foreground border-border",
};

const QueryTable = ({ rows }: { rows: QueryRow[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Consulta</TableHead>
        <TableHead>Intenção</TableHead>
        <TableHead>Página</TableHead>
        <TableHead className="text-right">Cliques</TableHead>
        <TableHead className="text-right">Impr.</TableHead>
        <TableHead className="text-right">CTR</TableHead>
        <TableHead className="text-right">Pos.</TableHead>
        <TableHead>Oportunidade</TableHead>
        <TableHead className="text-right">Score</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((q, i) => {
        const band = scoreBand(q.score);
        return (
          <TableRow key={`${q.query}-${q.page}-${i}`}>
            <TableCell className="max-w-[260px] truncate">{q.query}</TableCell>
            <TableCell>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${intentColor[q.intent]}`}>{q.intent}</span>
            </TableCell>
            <TableCell className="font-mono text-xs max-w-[220px] truncate">{q.page ?? "—"}</TableCell>
            <TableCell className="text-right">{fmt(q.clicks)}</TableCell>
            <TableCell className="text-right">{fmt(q.impressions)}</TableCell>
            <TableCell className="text-right">{pct(q.ctr)}</TableCell>
            <TableCell className="text-right">{q.position.toFixed(1)}</TableCell>
            <TableCell className="text-xs">{OPPORTUNITY_LABEL[q.opportunity]}</TableCell>
            <TableCell className={`text-right font-medium ${band.color}`}>{q.score}</TableCell>
          </TableRow>
        );
      })}
      {!rows.length && (
        <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Sem dados.</TableCell></TableRow>
      )}
    </TableBody>
  </Table>
);

type ActionItem = {
  id: string; priority: string; type: string; page: string | null; query: string | null;
  metric: string | null; recommendation: string; status: string; score: number | null; created_at: string;
};

const ActionPlanList = () => {
  const [items, setItems] = useState<ActionItem[]>([]);
  useEffect(() => {
    supabase.from("seo_action_items").select("*").order("score", { ascending: false }).limit(200)
      .then(({ data }) => setItems((data ?? []) as ActionItem[]));
  }, []);
  async function toggle(it: ActionItem) {
    const next = it.status === "done" ? "todo" : "done";
    await supabase.from("seo_action_items").update({
      status: next, completed_at: next === "done" ? new Date().toISOString() : null,
    }).eq("id", it.id);
    setItems((arr) => arr.map((x) => x.id === it.id ? { ...x, status: next } : x));
  }
  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prio</TableHead><TableHead>Tipo</TableHead>
            <TableHead>Página</TableHead><TableHead>Consulta</TableHead>
            <TableHead>Métrica</TableHead><TableHead>Recomendação</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((it) => (
            <TableRow key={it.id}>
              <TableCell><Badge variant={it.priority === "critica" ? "destructive" : "secondary"}>{it.priority}</Badge></TableCell>
              <TableCell className="text-xs">{it.type}</TableCell>
              <TableCell className="font-mono text-xs max-w-[200px] truncate">{it.page ?? "—"}</TableCell>
              <TableCell className="text-xs max-w-[200px] truncate">{it.query ?? "—"}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{it.metric}</TableCell>
              <TableCell className="text-xs max-w-[360px]">{it.recommendation}</TableCell>
              <TableCell className="text-right">{it.score ?? "—"}</TableCell>
              <TableCell>
                <Button size="sm" variant={it.status === "done" ? "secondary" : "outline"} onClick={() => toggle(it)}>
                  {it.status === "done" ? "Concluído" : "Marcar feito"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {!items.length && (
            <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Nenhuma ação ainda. Gere a partir dos Quick Wins.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SeoDashboard;
