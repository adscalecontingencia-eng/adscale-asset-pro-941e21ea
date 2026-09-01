import type { ReactNode } from "react";

const KEYWORDS = [
  // Principais (GSC)
  "comprar bm verificada", "contingência meta ads", "contingencia meta ads",
  "contingência facebook ads comprar", "bm contingencia", "bm com gastos",
  "bm verificada", "comprar bm verificada facebook", "bm ilimitada",
  "fornecedor de bm", "comprar bm", "contingência facebook ads",
  "bm verificada comprar", "comprar bm facebook", "contingencia facebook",
  "comprar bm ilimitada", "contingência facebook", "comprar bm facebook ads",
  "bm verificada facebook", "qualidade da conta meta", "consultoria de facebook ads",
  "account quality", "meta account quality", "trust tier facebook",
  "auditoria do facebook", "trust tier meta ads", "consultoria facebook ads",
  "qualidade da conta meta ads", "qualidade da conta",
  // Comerciais / long tail
  "comprar business manager verificada", "aluguel de bm verificada",
  "aluguel de conta facebook ads", "aluguel de business manager",
  "conta de anúncio verificada", "conta anúncio meta ads",
  "conta anúncio facebook ads", "bm nova verificada", "bm 250 verificada",
  "bm 8k verificada", "bm high limit", "bm high tier",
  "bm verificada high limit", "bm facebook alto limite",
  "bm meta ads alto limite", "bm sem limite de gasto",
  "aumentar limite de gasto facebook ads", "conta meta ads antiga",
  "conta facebook aged", "perfil facebook aged", "perfil aged facebook",
  "perfil antigo facebook ads", "perfil facebook antigo comprar",
  "página facebook antiga", "fanpage antiga comprar", "fanpage aged",
  // Problemas
  "conta facebook bloqueada", "conta meta ads bloqueada",
  "bm bloqueada como recuperar", "bm caiu meta ads",
  "conta desativada facebook ads", "anúncio rejeitado facebook",
  "anúncio reprovado meta ads", "conta restrita facebook ads",
  "limite de gasto facebook ads", "strike no facebook ads",
  "recuperar bm bloqueada", "bm com strike", "conta com histórico limpo",
  // Técnicas
  "verificação de domínio meta", "domínio verificado facebook ads",
  "pixel meta ads maduro", "pixel facebook com histórico",
  "capi facebook ads", "conversions api meta", "whatsapp cloud api",
  "autenticação 2 fatores facebook", "business manager verificado meta",
  "verificação de negócios meta", "meta business verification",
  // Nichos sensíveis
  "contingência para dropshipping", "contingência para infoprodutos",
  "contingência para ecommerce", "contingência para black",
  "conta para escalar facebook ads", "escalar meta ads alto volume",
  "operação alto volume facebook ads", "gestor de tráfego alto volume",
  "gestão de contingência meta ads",
  // Genéricas
  "facebook ads", "meta ads", "instagram ads", "tráfego pago",
  "gestão de tráfego", "escalar campanha facebook", "roas alto meta ads",
  "cpa baixo facebook ads", "cpm meta ads", "leilão meta ads",
  "estrutura de campanha cbo", "estrutura de campanha abo",
  "otimização de campanha meta ads", "métricas meta ads",
  "adscale contingência",
  // Novas palavras-chave (GSC)
  "comprar pagina", "comprar perfil", "comprar fan page",
  "perfil verificado", "facebook campanhas", "conta de anuncios",
  "conta de anuncios facebook", "pagina antiga", "perfil antigo",
  "bm conta de anuncios", "bm api", "comprar perfil antigo",
  "anunciar no meta", "campanha meta", "conta de anuncio meta",
  "comprar contas de anuncios", "bm meta ads", "conta de agencia",
  "aluguel de contas", "conta de anuncios meta", "bms meta",
  "comprar bm meta", "conta meta ads", "bm api oficial",
  "bm de disparo", "comprar perfil verificado", "comprar bm de disparo",
  "comprar bm via api", "BM 2k disparo", "BM 250 disparos",
  "BM Disparo", "Disparo API Oficial", "conta para anunciar no facebook",
  "conta para anunciar no instagram", "conta para facebook ads",
  "conta para meta ads", "aluguar conta de anuncio", "alugar conta de anuncio",
];

interface SeoKeywordsProps {
  /** Elemento visual que abre/fecha a lista de palavras-chave (ex.: logo do rodapé). */
  trigger?: ReactNode;
}

const SeoKeywords = ({ trigger }: SeoKeywordsProps) => {
  return (
    <details className="group">
      <summary
        className="inline-block cursor-pointer list-none [&::-webkit-details-marker]:hidden"
        aria-label="Palavras-chave relacionadas"
      >
        {trigger ?? <span className="sr-only">Palavras-chave relacionadas</span>}
      </summary>
      <div
        className="mt-4 text-[11px] leading-relaxed text-muted-foreground/50"
        aria-label="Palavras-chave relacionadas"
      >
        {KEYWORDS.join(" · ")}
      </div>
    </details>
  );
};

export default SeoKeywords;
