
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import UserManagement from "./pages/admin/UserManagement";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
