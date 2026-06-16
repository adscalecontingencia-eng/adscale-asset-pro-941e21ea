import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "adscale_cookie_consent_v1";

type Consent = "accepted" | "essential_only";

const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (value: Consent) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, ts: new Date().toISOString() })
      );
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] max-w-md rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md shadow-2xl p-5 md:p-6"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <Cookie className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-sm font-bold text-foreground mb-1">
            Privacidade e cookies
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Usamos cookies essenciais para o site funcionar e cookies de análise/marketing
            (Google Analytics, Meta Pixel) para melhorar sua experiência. Cookies não
            essenciais dependem do seu consentimento (LGPD).{" "}
            <Link
              to="/politica-de-privacidade"
              className="underline hover:text-foreground"
            >
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => save("accepted")}
              className="inline-flex items-center justify-center bg-gradient-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-lg hover:scale-[1.02] transition-transform"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={() => save("essential_only")}
              className="inline-flex items-center justify-center border border-border/60 text-foreground font-semibold text-xs px-4 py-2 rounded-lg hover:border-primary/40 transition-colors"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => save("essential_only")}
          aria-label="Fechar aviso"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
