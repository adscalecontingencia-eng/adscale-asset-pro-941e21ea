import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { SITE_URL } from "@/lib/site";

type Props = { slug: string; title: string };

const ShareButtons = ({ slug, title }: Props) => {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${slug}/`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7.01L4.5 22H1.244l8.04-9.19L1 2h7l4.85 6.42L18.244 2Zm-2.4 18h1.9L7.27 4H5.27l10.574 16Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21H18.6v-5.45c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.08 1.4-2.08 2.87V21H10V9Z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M20.5 3.5A11.6 11.6 0 0 0 3.05 18.4L2 22l3.7-1.03A11.6 11.6 0 1 0 20.5 3.5ZM12 20.2a8.3 8.3 0 0 1-4.22-1.16l-.3-.18-2.2.61.6-2.15-.2-.31A8.3 8.3 0 1 1 12 20.2Zm4.55-6.2c-.25-.13-1.47-.73-1.7-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.35.99 2.51.13.16 1.72 2.62 4.18 3.68.58.25 1.04.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.11-.22-.18-.47-.31Z" />
        </svg>
      ),
    },
  ];

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 my-6">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Compartilhar:</span>
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar no ${t.label}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          {t.svg}
        </a>
      ))}
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copiar link do artigo"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ShareButtons;
