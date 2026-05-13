import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import BmVerificada from "./pages/BmVerificada.tsx";
import ContingenciaMetaAds from "./pages/ContingenciaMetaAds.tsx";
import ConsultoriaMetaAds from "./pages/ConsultoriaMetaAds.tsx";
import Sobre from "./pages/Sobre.tsx";
import Autor from "./pages/Autor.tsx";
import PillarFacebookAds from "./pages/PillarFacebookAds.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AnalyticsTracker from "./components/AnalyticsTracker.tsx";
import ProductLanding from "./pages/ProductLanding.tsx";
import { productLandingSlugs } from "./data/landings";

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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/bm-verificada" element={<BmVerificada />} />
          <Route path="/contingencia-meta-ads" element={<ContingenciaMetaAds />} />
          <Route path="/consultoria-meta-ads" element={<ConsultoriaMetaAds />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/autor/:slug" element={<Autor />} />
          <Route path="/guia-facebook-ads-alto-volume" element={<PillarFacebookAds />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {productLandingSlugs.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<ProductLanding slug={slug} />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
