import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { LogOut, MousePointerClick, Search, TrendingUp, Globe } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import SEO from "@/components/SEO";
import { toast } from "sonner";

type Click = {
  id: string;
  created_at: string;
  route: string | null;
  source: string | null;
  cta_label: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  search_engine: string | null;
  search_keyword: string | null;
  gclid: string | null;
  fbclid: string | null;
  device: string | null;
};

const Stat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MousePointerClick;
  label: string;
  value: string | number;
}) => (
  <Card className="p-5 bg-card border-border/50">
    <div className="flex items-center gap-3 text-muted-foreground text-xs uppercase tracking-wider mb-2">
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </div>
    <div className="font-display text-3xl font-bold">{value}</div>
  </Card>
);

const groupCount = <T extends string | null | undefined>(
  rows: { [k: string]: unknown }[],
  key: string,
): { name: string; count: number }[] => {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = (r[key] as T) || "(vazio)";
    map.set(v as string, (map.get(v as string) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [clicks, setClicks] = useState<Click[]>([]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      // Fetch clicks — RLS only returns rows if the user is admin.
      const { data, error } = await supabase
        .from("whatsapp_clicks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);

      if (!mounted) return;

      if (error) {
        console.error("[admin] whatsapp_clicks query error:", error);
        toast.error(`Erro ao carregar métricas: ${error.message}`);
        setAuthorized(true);
        setLoading(false);
        return;
      }

      setClicks((data ?? []) as Click[]);
      setAuthorized(true);
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const stats = useMemo(() => {
    const total = clicks.length;
    const last24h = clicks.filter(
      (c) => Date.now() - new Date(c.created_at).getTime() < 24 * 3600 * 1000,
    ).length;
    const fromGoogle = clicks.filter(
      (c) => c.search_engine === "google" || c.utm_source?.toLowerCase().includes("google"),
    ).length;
    const withKeyword = clicks.filter((c) => c.search_keyword).length;
    return { total, last24h, fromGoogle, withKeyword };
  }, [clicks]);

  const series = useMemo(() => {
    const buckets = new Map<string, number>();
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      buckets.set(d.toISOString().slice(0, 10), 0);
    }
    for (const c of clicks) {
      const day = c.created_at.slice(0, 10);
      if (buckets.has(day)) buckets.set(day, (buckets.get(day) ?? 0) + 1);
    }
    return Array.from(buckets.entries()).map(([date, count]) => ({
      date: date.slice(5),
      cliques: count,
    }));
  }, [clicks]);

  const byRoute = useMemo(() => groupCount(clicks, "route").slice(0, 8), [clicks]);
  const bySource = useMemo(() => groupCount(clicks, "utm_source").slice(0, 8), [clicks]);
  const byCampaign = useMemo(
    () => groupCount(clicks, "utm_campaign").slice(0, 8),
    [clicks],
  );
  const byKeyword = useMemo(
    () =>
      groupCount(
        clicks.filter((c) => c.search_keyword),
        "search_keyword",
      ).slice(0, 12),
    [clicks],
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Carregando métricas...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dashboard interno · AD Scale"
        description="Métricas de cliques no WhatsApp e atribuição de tráfego."
        canonical="/admin"
        noIndex
      />

      <header className="border-b border-border/50 bg-card/40 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-7xl flex items-center justify-between py-4 px-4">
          <Logo size={22} />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:inline">
              Painel interno
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl py-8 px-4 space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">
            Cliques no WhatsApp
          </h1>
          <p className="text-muted-foreground text-sm">
            Atribuição completa: rota, UTM, palavra-chave do Google e dispositivo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat icon={MousePointerClick} label="Total" value={stats.total} />
          <Stat icon={TrendingUp} label="Últimas 24h" value={stats.last24h} />
          <Stat icon={Globe} label="Google" value={stats.fromGoogle} />
          <Stat icon={Search} label="Com keyword" value={stats.withKeyword} />
        </div>

        <Card className="p-5 bg-card border-border/50">
          <h2 className="font-display font-semibold mb-4">Cliques nos últimos 14 dias</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cliques"
                  stroke="hsl(var(--primary))"
                  fill="url(#g)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <BreakdownCard title="Por rota" rows={byRoute} />
          <BreakdownCard title="Por fonte (utm_source)" rows={bySource} />
          <BreakdownCard title="Por campanha (utm_campaign)" rows={byCampaign} />
          <BreakdownCard title="Palavras-chave do Google" rows={byKeyword} highlight />
        </div>

        <Card className="p-5 bg-card border-border/50">
          <h2 className="font-display font-semibold mb-4">Últimos 50 cliques</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Rota</TableHead>
                  <TableHead>CTA</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Device</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clicks.slice(0, 50).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-xs whitespace-nowrap">
                      {new Date(c.created_at).toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-xs">{c.route ?? "—"}</TableCell>
                    <TableCell className="text-xs">{c.cta_label ?? "—"}</TableCell>
                    <TableCell className="text-xs">
                      {c.utm_source ?? c.search_engine ?? "direto"}
                    </TableCell>
                    <TableCell className="text-xs">{c.utm_campaign ?? "—"}</TableCell>
                    <TableCell className="text-xs text-primary">
                      {c.search_keyword ?? c.utm_term ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs">{c.device ?? "—"}</TableCell>
                  </TableRow>
                ))}
                {clicks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Nenhum clique registrado ainda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
};

const BreakdownCard = ({
  title,
  rows,
  highlight,
}: {
  title: string;
  rows: { name: string; count: number }[];
  highlight?: boolean;
}) => {
  const max = rows[0]?.count ?? 1;
  return (
    <Card className="p-5 bg-card border-border/50">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.name} className="text-sm">
              <div className="flex justify-between mb-1">
                <span
                  className={`truncate pr-3 ${highlight ? "text-primary" : "text-foreground"}`}
                >
                  {r.name}
                </span>
                <span className="text-muted-foreground tabular-nums">{r.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(r.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default AdminDashboard;
