import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { captureAttribution } from "@/lib/whatsapp";

type Props = {
  pillarLabel?: string;
  pillarSlug?: string;
};

const WA_NUMBER = "553198416336";

/** Per-pillar message + UTM. Falls back to generic if unknown. */
const pillarCopy: Record<string, { topic: string; promise: string }> = {
  "business-manager": {
    topic: "Business Manager (verificada, ilimitada, fornecedores)",
    promise: "alertas de novas BMs disponíveis, mudanças de política de verificação e benchmarks de preço.",
  },
  "perfis-e-paginas": {
    topic: "perfis aged e páginas antigas",
    promise: "estoque novo de perfis farmados, sinais de saúde de admin e mudanças de fingerprint.",
  },
  "seguranca-e-bloqueios": {
    topic: "segurança e bloqueios no Meta",
    promise: "ondas de bloqueio identificadas, runbooks de recuperação e novos motivos de ban.",
  },
  "escala-e-performance": {
    topic: "escala, Trust Score e CAPI",
    promise: "playbooks de warm-up, mudanças no leilão e checklist quando o CPA disparar.",
  },
  "whatsapp-api": {
    topic: "WhatsApp Cloud API e WABA",
    promise: "atualizações de tier, mudanças em templates e como manter número high quality.",
  },
  "fundamentos-e-estrategia": {
    topic: "estratégia para gestores de tráfego",
    promise: "leituras de mercado, benchmarks de honorário e decisões estratégicas.",
  },
};

const NewsletterCTA = ({ pillarLabel, pillarSlug }: Props) => {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim().toLowerCase();
    if (!email || status === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 255) return;
    setStatus("loading");

    const copy = (pillarSlug && pillarCopy[pillarSlug]) || null;
    const attr = captureAttribution();
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const device = /Mobi|Android|iPhone/i.test(ua) ? "mobile" : "desktop";
    const sessionId =
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("adscale_session_id")
        : null;
    const route =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : null;

    const campaign = pillarSlug
      ? `contingencia_semanal_${pillarSlug.replace(/-/g, "_")}`
      : "contingencia_semanal";

    // 1) Persist lead (RLS allows anon insert with email validation).
    await supabase
      .from("newsletter_leads")
      .insert({
        email,
        pillar_slug: pillarSlug ?? null,
        pillar_label: pillarLabel ?? null,
        source_route: route,
        landing_page: attr.landing_page ?? route ?? null,
        utm_source: "blog",
        utm_medium: "newsletter_cta",
        utm_campaign: campaign,
        utm_term: attr.utm_term ?? attr.search_keyword ?? null,
        utm_content: pillarSlug ?? null,
        referrer: attr.referrer ?? null,
        device,
        user_agent: ua,
        session_id: sessionId,
      })
      .then(({ error }) => {
        if (error) console.warn("[newsletter] insert:", error.message);
      });

    // 2) Build WhatsApp message — personalized per pillar.
    const intro = copy
      ? `Quero assinar a Contingência Semanal da AD Scale com foco em ${copy.topic}.`
      : `Quero assinar a Contingência Semanal da AD Scale.`;
    const promise = copy ? `\n\nMeu interesse principal: ${copy.promise}` : "";
    const msg = `${intro}${promise}\n\nE-mail para confirmação: ${email}${
      pillarLabel ? `\nPilar: ${pillarLabel}` : ""
    }`;

    const qs = new URLSearchParams({
      text: msg,
      utm_source: "blog",
      utm_medium: "newsletter_cta",
      utm_campaign: campaign,
      ...(pillarSlug ? { utm_content: pillarSlug } : {}),
    }).toString();

    setStatus("done");
    window.open(`https://wa.me/${WA_NUMBER}?${qs}`, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="my-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
            Contingência Semanal{pillarLabel ? ` · ${pillarLabel}` : ""}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
            {pillarLabel
              ? `O que muda em ${pillarLabel} antes do bloqueio chegar`
              : "Receba o que muda no Meta antes do bloqueio chegar"}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Um e-mail por semana com mudanças de política, alertas de risco e táticas testadas
            em operações 7 dígitos.
          </p>
        </div>
      </div>

      {status === "done" ? (
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Abrimos o WhatsApp para confirmar sua inscrição.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            E-mail
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            maxLength={255}
            placeholder="seu@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 whitespace-nowrap disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Quero assinar"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
      <p className="text-xs text-muted-foreground mt-3">
        Sem spam. Confirmação rápida pelo WhatsApp — saída em 1 clique. Ao cadastrar, você concorda com a nossa{" "}
        <a href="/politica-de-privacidade" className="underline hover:text-foreground">
          Política de Privacidade
        </a>{" "}
        (LGPD). Coletamos seu e-mail e dados básicos de navegação para enviar as atualizações e mensurar engajamento.
      </p>

    </aside>
  );
};

export default NewsletterCTA;
