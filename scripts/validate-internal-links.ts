#!/usr/bin/env tsx
/**
 * validate-internal-links.ts
 *
 * Sanity-check para o blog: garante que todos os posts publicados tenham
 * pelo menos 2 links internos (para outros posts, pilares ou LPs comerciais).
 *
 * Roda como prebuild — se algum post estiver "ilhado", o build falha.
 */
import { blogPosts } from "../src/data/blogPosts";

const INTERNAL_LINK_RE = /\]\((\/(?:blog|pilar|business-manager|wa:|[a-z][a-z0-9-]*)[^)]*)\)/g;

let errors = 0;
const warnings: string[] = [];

for (const post of blogPosts) {
  const matches = [...post.content.matchAll(INTERNAL_LINK_RE)];
  const internalCount = matches.filter((m) => !m[1].startsWith("wa:")).length;
  const waCount = matches.filter((m) => m[1].startsWith("wa:")).length;

  if (internalCount < 2) {
    warnings.push(
      `  ⚠ ${post.slug}: apenas ${internalCount} link(s) interno(s) (mín. 2). WhatsApp CTAs: ${waCount}`,
    );
  }
}

if (warnings.length) {
  console.warn(`\n[internal-links] ${warnings.length} posts com cobertura interna baixa:`);
  warnings.forEach((w) => console.warn(w));
  console.warn(`\n  → Edite o markdown e adicione links para /blog/<slug> ou /<lp>.\n`);
}

console.log(`[internal-links] validados ${blogPosts.length} posts (${errors} erros, ${warnings.length} avisos).`);

if (errors > 0) process.exit(1);
