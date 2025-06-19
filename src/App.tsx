import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/contexts/ThemeProvider"; // Added import

const queryClient = new QueryClient();


const App = () => (
<ThemeProvider storageKey="authapp-theme" defaultTheme="light"> {/* Added ThemeProvider */}
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>


            <Route path="/" element={<LoginPage />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />


          </Routes>
      </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
);

export default App;