import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export interface CTASectionProps {
  heading?: React.ReactNode;
  description?: string;
  ctaLabel?: string;
}

const CTASection = ({
  heading = (
    <>
      Chega de queimar dinheiro com ativo fraco.{" "}
      <span className="text-gradient italic">Escale com base sólida.</span>
    </>
  ),
  description = "BMs Verificadas, BMs antigas, perfis e páginas com Trust Score alto — entregues sob curadoria para quem opera volume de verdade.",
  ctaLabel = "FALAR COM O TIME COMERCIAL",
}: CTASectionProps) => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-4xl relative z-10 text-center">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">{heading}</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{description}</p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground font-bold px-12 py-5 rounded-xl text-lg transition-all hover:scale-105 animate-pulse-glow"
        >
          <MessageCircle className="w-5 h-5" />
          {ctaLabel}
        </a>

        <p className="mt-6 text-muted-foreground text-sm">
          Atendimento técnico · Briefing 1 a 1 · Sem catálogo público
        </p>
      </div>
    </section>
  );
};

export default CTASection;
