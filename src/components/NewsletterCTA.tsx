import { Mail, ArrowRight } from "lucide-react";

type Props = {
  pillarLabel?: string;
};

/**
 * Inline newsletter capture. Sends the lead to WhatsApp with a structured
 * subscribe message + UTM tracking. No backend required (MVP).
 */
const NewsletterCTA = ({ pillarLabel }: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim();
    if (!email) return;
    const msg = `Quero assinar a Contingência Semanal da AD Scale.\n\nE-mail: ${email}${
      pillarLabel ? `\nInteresse: ${pillarLabel}` : ""
    }`;
    const qs = new URLSearchParams({
      text: msg,
      utm_source: "blog",
      utm_medium: "newsletter_cta",
      utm_campaign: "contingencia_semanal",
    }).toString();
    window.open(`https://wa.me/553198416336?${qs}`, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="my-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Contingência Semanal</p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
            Receba o que muda no Meta antes do bloqueio chegar
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Um e-mail por semana com mudanças de política, alertas de risco e táticas testadas em operações 7 dígitos.
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          E-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className="flex-1 px-4 py-3 rounded-lg bg-background border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 whitespace-nowrap"
        >
          Quero assinar
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        Sem spam. Você confirma a inscrição em uma conversa rápida no WhatsApp.
      </p>
    </aside>
  );
};

export default NewsletterCTA;
