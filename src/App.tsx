import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Kontakt from "./pages/Kontakt";
import UeberUns from "./pages/UeberUns";
import Referenzen from "./pages/Referenzen";
import Blog from "./pages/Blog";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Produkte from "./pages/Produkte";
import ProduktKategorie from "./pages/ProduktKategorie";
import ProduktDetail from "./pages/ProduktDetail";
import Anfrage from "./pages/Anfrage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/referenzen" element={<Referenzen />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/produkte" element={<Produkte />} />
          <Route path="/produkte/:kategorie" element={<ProduktKategorie />} />
          <Route path="/produkt/:slug" element={<ProduktDetail />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
