import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeHomeProvider } from "./contexts/themeC";
import { AuthProvider } from "./contexts/AuthProvider";
import AppRoutes from "./AppRoutes";
import RouteLoader from "./pages/RouteLoader";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <RouteLoader/>
        <ThemeHomeProvider>
          <AuthProvider>
            <ThemeProvider defaultTheme="system">
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AppRoutes />
              </TooltipProvider>
            </ThemeProvider>
          </AuthProvider>
        </ThemeHomeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
