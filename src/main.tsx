import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

if (typeof window !== "undefined") {
  const { pathname, search, hash } = window.location;
  const normalizedPath = pathname.replace(/\/{2,}/g, "/");
  if (normalizedPath !== pathname) {
    window.history.replaceState(window.history.state, "", `${normalizedPath}${search}${hash}`);
  }
}

// Remove the static SEO snapshot injected by scripts/prerender.mjs so it never
// appears alongside the live React UI for real users. Crawlers without JS keep
// seeing it; Googlebot reads it before executing this script.
const seoSnapshot = document.getElementById("prerendered-seo");
if (seoSnapshot) seoSnapshot.remove();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
