import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const BlogSearch = () => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return blogPosts
      .filter((p) => {
        const haystack = normalize(
          [p.title, p.description, ...(p.keywords ?? [])].join(" "),
        );
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="blog-search" className="sr-only">
        Buscar artigos no blog
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          id="blog-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por BM verificada, warm-up, bloqueio, CAPI…"
          className="w-full h-12 pl-11 pr-10 rounded-full border border-border/60 bg-card/70 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-colors"
        />
        {query && (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/60 text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {query.trim().length >= 2 && (
        <div className="absolute z-20 left-0 right-0 mt-2 rounded-lg border border-border/60 bg-card shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              Nenhum artigo encontrado para "{query}".
            </p>
          ) : (
            <ul role="listbox" aria-label="Resultados da busca">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-foreground truncate">
                        {p.title}
                      </span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {p.category} • {p.readingTime}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
