export type Intent =
  | "comercial"
  | "problema"
  | "informacional"
  | "marca"
  | "tecnica"
  | "navegacional";

const dict: { intent: Intent; terms: string[] }[] = [
  {
    intent: "marca",
    terms: ["ad scale", "adscale", "ad scale contingência", "adscalecontingencia"],
  },
  {
    intent: "comercial",
    terms: [
      "comprar", "preço", "preco", "valor", "contratar", "serviço", "servico", "fornecedor",
      "bm verificada", "bm ilimitada", "contingência meta ads", "contingencia meta ads",
      "contingência facebook ads", "contingencia facebook ads",
      "business manager verificada", "consultoria meta", "perfil aged",
    ],
  },
  {
    intent: "problema",
    terms: [
      "bloqueio", "bloqueada", "bloqueado", "conta restrita", "qualidade da conta",
      "account quality", "limite de gasto", "conta desativada", "bm caiu", "bm bloqueada",
      "anúncio rejeitado", "anuncio rejeitado", "rejeitado", "desativada", "reprovado",
    ],
  },
  {
    intent: "tecnica",
    terms: [
      "capi", "pixel", "api", "whatsapp cloud api", "domínio verificado", "dominio verificado",
      "autenticação 2 fatores", "autenticacao 2 fatores", "business manager", "dns",
      "verificação de domínio", "verificacao de dominio",
    ],
  },
  {
    intent: "informacional",
    terms: [
      "como ", "o que é", "o que e ", "guia", "tutorial", "boas práticas", "boas praticas",
      "diferença", "diferenca", "quando usar", "passo a passo",
    ],
  },
];

export function classifyIntent(q: string): Intent {
  const s = (q || "").toLowerCase();
  for (const { intent, terms } of dict) {
    if (terms.some((t) => s.includes(t))) return intent;
  }
  return "navegacional";
}

export const INTENT_WEIGHTS: Record<Intent, number> = {
  comercial: 1,
  problema: 0.85,
  tecnica: 0.6,
  informacional: 0.45,
  marca: 0.3,
  navegacional: 0.2,
};
