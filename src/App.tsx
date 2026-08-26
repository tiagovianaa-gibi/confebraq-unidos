import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Panel from "./pages/Panel.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import EntityPage from "./pages/EntityPage.tsx";
import SimposioBrasilia from "./pages/SimposioBrasilia.tsx";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Rola até o topo em troca de rota; âncoras entre páginas (com hash) são
    // tratadas pela própria página de destino após montar seu conteúdo.
    // Checa window.location.hash (além do hash do router) para não sobrescrever
    // uma rolagem até âncora quando a navegação inclui um #fragmento.
    if (!hash && !window.location.hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index.html" element={<Index />} />
        <Route path="/painel" element={<Panel />} />
        <Route path="/noticia/:newsId" element={<NewsPage />} />
        <Route path="/entidade/:sigla" element={<EntityPage />} />
        <Route path="/simposio-brasilia" element={<SimposioBrasilia />} />
        <Route
          path="/inscricao-simposio-brasilia"
          element={<Navigate to="/simposio-brasilia" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
