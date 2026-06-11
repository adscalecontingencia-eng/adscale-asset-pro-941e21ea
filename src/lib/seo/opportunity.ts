import type { Intent } from "./intent";
import type { PageType } from "./pageType";

export type Opportunity =
  | "quick_win"
  | "baixo_ctr"
  | "comercial_prioritaria"
  | "lead_informacional"
  | "nova_pagina"
  | "canibalizacao"
  | "monitorar";

export const OPPORTUNITY_LABEL: Record<Opportunity, string> = {
  quick_win: "Oportunidade rápida",
  baixo_ctr: "Baixo CTR",
  comercial_prioritaria: "Comercial prioritária",
  lead_informacional: "Potencial de lead",
  nova_pagina: "Precisa de nova página",
  canibalizacao: "Possível canibalização",
  monitorar: "Monitorar",
};

// Expected CTR by position (simplified industry baseline).
const EXPECTED_CTR: Record<number, number> = {
  1: 0.28, 2: 0.16, 3: 0.10, 4: 0.07, 5: 0.05,
  6: 0.04, 7: 0.035, 8: 0.03, 9: 0.025, 10: 0.022,
};

export function expectedCtr(position: number): number {
  const p = Math.max(1, Math.round(position));
  if (p <= 10) return EXPECTED_CTR[p] ?? 0.02;
  if (p <= 20) return 0.012;
  if (p <= 30) return 0.007;
  return 0.004;
}

export function ctrGap(ctr: number, position: number): number {
  const exp = expectedCtr(position);
  if (exp <= 0) return 0;
  return Math.max(0, (exp - ctr) / exp); // 0..1
}

export function detectOpportunity(args: {
  impressions: number;
  ctr: number;
  position: number;
  intent: Intent;
  pageType: PageType;
  pageDuplicates?: number; // how many pages rank for same query
}): Opportunity {
  const { impressions, ctr, position, intent, pageType, pageDuplicates = 1 } = args;

  if (pageDuplicates > 1 && impressions >= 30) return "canibalizacao";
  if (intent === "comercial" && pageType === "blog" && impressions >= 20) return "nova_pagina";
  if (intent === "comercial" && pageType === "comercial") return "comercial_prioritaria";
  if (impressions >= 100 && ctr < 0.02 && position <= 20) return "baixo_ctr";
  if (position >= 4 && position <= 20 && impressions >= 20) return "quick_win";
  if ((intent === "problema" || intent === "informacional") && impressions >= 30) {
    return "lead_informacional";
  }
  return "monitorar";
}

export function recommendAction(o: Opportunity, intent: Intent, pageType: PageType): string {
  switch (o) {
    case "quick_win":
      return "Melhorar title/meta, adicionar FAQ e linkagem interna para empurrar para a top 3.";
    case "baixo_ctr":
      return "Reescrever title e meta description com benefício claro; testar ano e prova.";
    case "comercial_prioritaria":
      return "Fortalecer CTA de WhatsApp, prova social e FAQ comercial; receber mais links internos.";
    case "lead_informacional":
      return "Inserir CTA de diagnóstico no meio do artigo e linkar para LP comercial relacionada.";
    case "nova_pagina":
      return "Criar/otimizar landing page comercial dedicada e redirecionar links do blog para ela.";
    case "canibalizacao":
      return "Escolher URL principal, ajustar canonical e consolidar linkagem interna.";
    default:
      return pageType === "comercial"
        ? "Monitorar posição e CTR; ajustar copy se cair."
        : "Sem ação imediata; revisar na próxima rodada.";
  }
}
