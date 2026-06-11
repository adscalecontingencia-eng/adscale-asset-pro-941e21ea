import type { Intent } from "@/lib/seo/intent";
import type { PageType } from "@/lib/seo/pageType";
import type { Opportunity } from "@/lib/seo/opportunity";

export type QueryRow = {
  query: string;
  page: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  intent: Intent;
  pageType: PageType;
  opportunity: Opportunity;
  score: number;
};

export type Daily = {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export const fmt = (n: number) => n.toLocaleString("pt-BR");
export const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
