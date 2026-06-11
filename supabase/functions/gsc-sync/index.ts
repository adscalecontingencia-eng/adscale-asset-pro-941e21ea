import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "sc-domain:adscalecontingencia.com";

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData } = await userClient.auth.getUser();
    if (!userData.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: isAdmin } = await userClient.rpc("has_role", {
      _user_id: userData.user.id, _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY || !GSC_API_KEY) {
      return new Response(JSON.stringify({ error: "GSC connector not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const days = Math.min(Math.max(Number(body.days ?? 90), 7), 365);
    const startDate = todayISO(-days);
    const endDate = todayISO(-2); // GSC has 2d lag

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_API_KEY,
      "Content-Type": "application/json",
    };

    async function gsc(body: unknown) {
      const resp = await fetch(
        `${GATEWAY_URL}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
        { method: "POST", headers, body: JSON.stringify(body) },
      );
      if (!resp.ok) {
        const t = await resp.text();
        throw new Error(`GSC ${resp.status}: ${t}`);
      }
      return await resp.json();
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const result: Record<string, number> = {};

    // 1) Daily site-wide
    {
      const j = await gsc({ startDate, endDate, dimensions: ["date"], rowLimit: 1000 });
      const rows = (j.rows ?? []) as Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
      const payload = rows.map((r) => ({
        date: r.keys[0], clicks: r.clicks, impressions: r.impressions,
        ctr: r.ctr, position: r.position,
      }));
      if (payload.length) {
        await admin.from("gsc_daily_metrics").delete().gte("date", startDate);
        await admin.from("gsc_daily_metrics").insert(payload);
      }
      result.daily = payload.length;
    }

    const snapshot = todayISO();

    // 2) Query x Page
    {
      const j = await gsc({ startDate, endDate, dimensions: ["query", "page"], rowLimit: 5000 });
      const rows = (j.rows ?? []) as Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
      const payload = rows.map((r) => ({
        snapshot_date: snapshot, query: r.keys[0], page: r.keys[1],
        clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      }));
      if (payload.length) {
        await admin.from("gsc_query_snapshots").delete().eq("snapshot_date", snapshot);
        // chunk insert
        for (let i = 0; i < payload.length; i += 500) {
          await admin.from("gsc_query_snapshots").insert(payload.slice(i, i + 500));
        }
      }
      result.queries = payload.length;
    }

    // 3) Pages aggregated
    {
      const j = await gsc({ startDate, endDate, dimensions: ["page"], rowLimit: 1000 });
      const rows = (j.rows ?? []) as Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
      const payload = rows.map((r) => ({
        snapshot_date: snapshot, page: r.keys[0],
        clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      }));
      if (payload.length) {
        await admin.from("gsc_page_snapshots").delete().eq("snapshot_date", snapshot);
        for (let i = 0; i < payload.length; i += 500) {
          await admin.from("gsc_page_snapshots").insert(payload.slice(i, i + 500));
        }
      }
      result.pages = payload.length;
    }

    return new Response(JSON.stringify({ ok: true, ...result, snapshot, startDate, endDate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
