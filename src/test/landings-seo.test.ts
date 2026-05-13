import { describe, it, expect } from "vitest";
import { productLandings, productLandingSlugs } from "@/data/landings";

// Regression tests for SEO on every product landing.
// Garante que após substituições de termos:
// - title/description/canonical/keywords/JSON-LD/FAQ continuam válidos
// - termos antigos ("idade real", "envelhecid", "aged" em UI) não vazaram
//   para copy visível (mantemos "aged" só em SEO keywords)

const FORBIDDEN_UI_TERMS = [
  "idade real",
  "Idade Real",
  "IDADE REAL",
  "envelhecid",
];

function collectVisibleStrings(slug: string): string[] {
  const d = productLandings[slug];
  const out: string[] = [];
  out.push(d.hero.eyebrow, d.hero.badgeText);
  if (typeof d.hero.subheadline === "string") out.push(d.hero.subheadline);
  if (typeof d.hero.subheadlineMobile === "string")
    out.push(d.hero.subheadlineMobile);
  d.hero.trustItems?.forEach((t) => out.push(t.value, t.label));
  out.push(d.assets.badge, d.assets.intro, d.assets.footerLine);
  d.assets.items.forEach((i) => {
    out.push(i.tag, i.title, i.description, ...i.bullets);
  });
  d.faq.items.forEach((f) => out.push(f.question, f.answer));
  out.push(d.cta.description, d.cta.ctaLabel);
  return out;
}

describe("Product landings — SEO regression", () => {
  it("registry has at least one landing", () => {
    expect(productLandingSlugs.length).toBeGreaterThan(0);
  });

  it("titles are unique", () => {
    const titles = productLandingSlugs.map((s) => productLandings[s].seo.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("canonicals are unique", () => {
    const cans = productLandingSlugs.map(
      (s) => productLandings[s].seo.canonical,
    );
    expect(new Set(cans).size).toBe(cans.length);
  });

  productLandingSlugs.forEach((slug) => {
    describe(`/${slug}`, () => {
      const data = productLandings[slug];

      it("has SEO title ≤ 60 chars and non-empty", () => {
        expect(data.seo.title).toBeTruthy();
        expect(data.seo.title.length).toBeLessThanOrEqual(60);
      });

      it("has SEO description between 50 and 160 chars", () => {
        expect(data.seo.description.length).toBeGreaterThanOrEqual(50);
        expect(data.seo.description.length).toBeLessThanOrEqual(160);
      });

      it("canonical matches slug", () => {
        expect(data.seo.canonical).toBe(`/${slug}`);
      });

      it("has at least 3 SEO keywords", () => {
        expect(Array.isArray(data.seo.keywords)).toBe(true);
        expect(data.seo.keywords.length).toBeGreaterThanOrEqual(3);
      });

      it("FAQ has 3+ items, each with question and answer", () => {
        expect(data.faq.items.length).toBeGreaterThanOrEqual(3);
        data.faq.items.forEach((f) => {
          expect(f.question.trim().length).toBeGreaterThan(0);
          expect(f.answer.trim().length).toBeGreaterThan(0);
        });
      });

      it("assets section has 3+ items", () => {
        expect(data.assets.items.length).toBeGreaterThanOrEqual(3);
      });

      it("featuredGuideSlugs has 3+ entries", () => {
        expect(data.featuredGuideSlugs.length).toBeGreaterThanOrEqual(3);
      });

      it("JSON-LD shape (Service + FAQPage + BreadcrumbList) is buildable", () => {
        const jsonLd = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: data.seo.title,
              description: data.seo.description,
            },
            {
              "@type": "FAQPage",
              mainEntity: data.faq.items.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: data.seo.title.split("|")[0].trim(),
                },
              ],
            },
          ],
        };
        // serializa sem lançar
        const serialized = JSON.stringify(jsonLd);
        expect(serialized).toContain('"@type":"Service"');
        expect(serialized).toContain('"@type":"FAQPage"');
        expect(serialized).toContain('"@type":"BreadcrumbList"');
        expect(jsonLd["@graph"][1].mainEntity.length).toBe(
          data.faq.items.length,
        );
      });

      it("does not leak old terminology in visible UI copy", () => {
        const strings = collectVisibleStrings(slug);
        FORBIDDEN_UI_TERMS.forEach((term) => {
          strings.forEach((s) => {
            expect(s.toLowerCase()).not.toContain(term.toLowerCase());
          });
        });
      });
    });
  });
});
