import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface MidArticleCTAProps {
  /** Short context-specific headline (the topic of the post). */
  title?: string;
  /** Short pitch tailored to the post topic. */
  description?: string;
  /** Optional override of the WhatsApp pre-filled message. */
  whatsappMessage?: string;
  ctaLabel?: string;
}

/**
 * Value-driven CTA inserted in the middle of long blog posts. Pulls the
 * reader from "consuming content" into "starting a conversation" without
 * being aggressive — the offer is concrete (audit / diagnosis) and the
 * channel is WhatsApp so the lead is captured immediately.
 */
const MidArticleCTA = ({
  title = "Quer aplicar isso na sua operação hoje?",
  description = "Em 15 minutos no WhatsApp a gente faz um diagnóstico rápido da sua estrutura de contingência e mostra os 3 ajustes de maior impacto. Sem custo.",
  whatsappMessage,
  ctaLabel = "Agendar diagnóstico no WhatsApp",
}: MidArticleCTAProps) => {
  const href = buildWhatsAppUrl({
    message: whatsappMessage ?? `Olá! Vim do blog da AD Scale e quero o diagnóstico de contingência. Tema: ${title}`,
    cta: "mid_article",
  });

  return (
    <aside
      role="complementary"
      aria-label="Conversar com a AD Scale"
      className="my-10 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/15 items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">{description}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-transform hover:scale-[1.02]"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default MidArticleCTA;
