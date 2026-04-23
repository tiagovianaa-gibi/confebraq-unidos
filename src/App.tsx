import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Panel from "./pages/Panel.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import EntityPage from "./pages/EntityPage.tsx";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index.html" element={<Index />} />
        <Route path="/painel" element={<Panel />} />
        <Route path="/noticia/:newsId" element={<NewsPage />} />
        <Route path="/entidade/:sigla" element={<EntityPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
