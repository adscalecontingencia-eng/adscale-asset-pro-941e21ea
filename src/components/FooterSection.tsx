import Logo from "./Logo";
import SeoKeywords from "./SeoKeywords";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { Instagram } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <Logo size={28} withTagline />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Comercialização de ativos de contingência premium para operações
              profissionais de mídia paga no Meta Ads e Facebook Ads.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contato
            </h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp comercial da AD•SCALE"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                </svg>
                <span>WhatsApp comercial</span>
              </a>
              <a
                href="https://www.instagram.com/adscale_hub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram oficial da AD•SCALE"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram size={18} strokeWidth={1.5} />
                <span>adscale_hub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-muted-foreground text-sm">Redes sociais</span>
            <a
              href="https://www.instagram.com/adscale_hub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial da AD•SCALE"
              className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors"
              onClick={() => {
                // Fallback para contextos de preview/iframe onde target="_blank"
                // pode ser bloqueado pelo sandbox; mantém <a> nativo sem preventDefault.
                if (window.parent !== window) {
                  window.open(
                    "https://www.instagram.com/adscale_hub/",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
            >
              <Instagram size={18} strokeWidth={1.5} />
              <span>Instagram oficial</span>
            </a>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} AD Scale — Premium Contingency Assets.
            Todos os direitos reservados.
          </p>
          <SeoKeywords />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
