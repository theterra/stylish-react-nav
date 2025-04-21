
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/store" element={<Index />} />
          <Route path="/mac" element={<Index />} />
          <Route path="/ipad" element={<Index />} />
          <Route path="/iphone" element={<Index />} />
          <Route path="/watch" element={<Index />} />
          <Route path="/vision" element={<Index />} />
          <Route path="/airpods" element={<Index />} />
          <Route path="/tv-home" element={<Index />} />
          <Route path="/entertainment" element={<Index />} />
          <Route path="/accessories" element={<Index />} />
          <Route path="/support" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
