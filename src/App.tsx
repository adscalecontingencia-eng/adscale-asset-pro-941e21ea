import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import BlogPillar from "./pages/BlogPillar.tsx";
import BmVerificada from "./pages/BmVerificada.tsx";
import ContingenciaMetaAds from "./pages/ContingenciaMetaAds.tsx";
import Contingencia from "./pages/Contingencia.tsx";
import ConsultoriaMetaAds from "./pages/ConsultoriaMetaAds.tsx";
import Sobre from "./pages/Sobre.tsx";
import Autor from "./pages/Autor.tsx";
import PillarFacebookAds from "./pages/PillarFacebookAds.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import SeoDashboard from "./pages/admin/SeoDashboard.tsx";
import AnalyticsTracker from "./components/AnalyticsTracker.tsx";
import ProductLanding from "./pages/ProductLanding.tsx";
import SolucoesMetaAds from "./pages/SolucoesMetaAds.tsx";
import EstruturaAds from "./pages/EstruturaAds.tsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.tsx";
import TermosDeUso from "./pages/TermosDeUso.tsx";
import AluguelContasMetaAds from "./pages/AluguelContasMetaAds.tsx";
import { productLandingSlugs } from "./data/landings";
import CookieConsent from "./components/CookieConsent.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/pilar/:slug" element={<BlogPillar />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/bm-verificada" element={<BmVerificada />} />
          <Route path="/contingencia-meta-ads" element={<ContingenciaMetaAds />} />
          <Route path="/contingencia" element={<Contingencia />} />
          <Route path="/consultoria-meta-ads" element={<ConsultoriaMetaAds />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/autor/:slug" element={<Autor />} />
          <Route path="/guia-facebook-ads-alto-volume" element={<PillarFacebookAds />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/seo" element={<SeoDashboard />} />
          <Route path="/solucoes-meta-ads" element={<SolucoesMetaAds />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/aluguel-de-contas-meta-ads" element={<AluguelContasMetaAds />} />
          {productLandingSlugs.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<ProductLanding slug={slug} />} />
          ))}
          {/* PT-BR aliases redirecting to canonical product slugs */}
          <Route path="/gerente-de-negocios" element={<Navigate to="/business-manager" replace />} />
          <Route path="/gerente-de-negócios" element={<Navigate to="/business-manager" replace />} />
          <Route path="/bm" element={<Navigate to="/business-manager" replace />} />
          <Route path="/bms" element={<Navigate to="/business-manager" replace />} />
          <Route path="/perfis" element={<Navigate to="/perfis-facebook" replace />} />
          <Route path="/perfil" element={<Navigate to="/perfis-facebook" replace />} />
          <Route path="/paginas" element={<Navigate to="/paginas-facebook" replace />} />
          <Route path="/fan-page" element={<Navigate to="/paginas-facebook" replace />} />
          <Route path="/fanpage" element={<Navigate to="/paginas-facebook" replace />} />
          <Route path="/dominios" element={<Navigate to="/dominios-verificados" replace />} />
          <Route path="/whatsapp-api" element={<Navigate to="/whatsapp-cloud-api" replace />} />
          <Route path="/pixel" element={<Navigate to="/pixel-capi" replace />} />
          <Route path="/aquecimento" element={<Navigate to="/aquecimento-contas" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
