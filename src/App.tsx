
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Api from "./pages/Api";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { analyticsService } from "./services/analyticsService";

// Initialiser le client de requêtes React Query
const queryClient = new QueryClient();

const App = () => {
  // Initialiser les services au démarrage de l'application
  useEffect(() => {
    // Configure le service d'analytics avec des valeurs par défaut
    analyticsService.configure('demo-site-key', true, false);
    
    // Tracking de page vue pour démo
    analyticsService.trackEvent('generated');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/api" element={<Api />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
