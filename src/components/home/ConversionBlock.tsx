import { Check, MessageCircle } from "lucide-react";
import { WA_MESSAGES } from "./homeData";
import { waHref } from "@/lib/whatsapp";
import { trackHomeEvent, type HomeEventName } from "@/lib/homeAnalytics";

const BULLETS = [
  "Consulta de disponibilidade",
  "Orientação sobre os tipos de estrutura",
  "Combinações de ativos",
  "Atendimento comercial",
];

export interface ConversionBlockProps {
  heading?: string;
  text?: string;
  note?: string;
  event?: HomeEventName;
  ctaLocation?: string;
  showBullets?: boolean;
  message?: string;
}

const ConversionBlock = ({
  heading = "Precisa de ajuda para montar sua estrutura?",
  text = "Fale com nossa equipe, explique sua operação e consulte as opções disponíveis atualmente.",
  note,
  event = "homepage_whatsapp_unsure",
  ctaLocation = "bloco_conversao",
  showBullets = true,
  message = WA_MESSAGES.unsure,
}: ConversionBlockProps) => {
  return (
    <section className="section-padding relative overflow-hidden" aria-labelledby={`cta-${ctaLocation}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="container max-w-3xl relative z-10 text-center">
        <h2 id={`cta-${ctaLocation}`} className="font-display text-3xl md:text-5xl font-bold mb-4">
          {heading}
        </h2>
        <p className="text-muted-foreground text-lg mb-8">{text}</p>

        <a
          href={waHref(message)}
          data-wa-message={message}
          data-cta={event}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackHomeEvent(event, { category: "geral", cta_location: ctaLocation })}
          className="inline-flex items-center justify-center gap-3 bg-gradient-primary text-primary-foreground font-bold px-8 md:px-12 py-5 rounded-xl text-base md:text-lg transition-all hover:scale-[1.03]"
        >
          <MessageCircle className="w-5 h-5" />
          Falar com a AD•SCALE no WhatsApp
        </a>

        {showBullets && (
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {note && <p className="mt-6 text-sm text-muted-foreground">{note}</p>}
      </div>
    </section>
  );
};

export default ConversionBlock;
