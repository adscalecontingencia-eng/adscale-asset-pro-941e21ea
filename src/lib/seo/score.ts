import { INTENT_WEIGHTS, type Intent } from "./intent";
import { PAGE_TYPE_WEIGHTS, type PageType } from "./pageType";
import { ctrGap } from "./opportunity";

export function priorityScore(args: {
  impressions: number;
  ctr: number;
  position: number;
  intent: Intent;
  pageType: PageType;
  techIssue?: boolean;
}): number {
  const { impressions, ctr, position, intent, pageType, techIssue } = args;
  const imprComp = Math.min(1, Math.log10(impressions + 1) / 4); // up to ~10k
  let posBonus = 0;
  if (position >= 4 && position <= 10) posBonus = 1;
  else if (position > 10 && position <= 20) posBonus = 0.6;
  else if (position > 20 && position <= 50) posBonus = 0.3;
  const ctrComp = ctrGap(ctr, position);
  const intentComp = INTENT_WEIGHTS[intent] ?? 0.2;
  const pageComp = PAGE_TYPE_WEIGHTS[pageType] ?? 0.3;
  const techComp = techIssue ? 1 : 0;

  const raw =
    25 * imprComp + 25 * posBonus + 20 * ctrComp + 15 * intentComp + 10 * pageComp + 5 * techComp;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function scoreBand(score: number): { label: string; color: string } {
  if (score >= 81) return { label: "Crítica", color: "text-red-500" };
  if (score >= 61) return { label: "Alta", color: "text-orange-500" };
  if (score >= 31) return { label: "Média", color: "text-yellow-500" };
  return { label: "Baixa", color: "text-muted-foreground" };
}
