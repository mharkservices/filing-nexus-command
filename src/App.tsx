
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Homepage from "./pages/public/Homepage";
import ServicesPage from "./pages/public/ServicesPage";
import ContactPage from "./pages/public/ContactPage";
import BlogPage from "./pages/public/BlogPage";
import BlogPostPage from "./pages/public/BlogPostPage";
import DocumentationPage from "./pages/public/DocumentationPage";
import LoginPage from "./pages/auth/LoginPage";
import UserManagement from "./pages/admin/UserManagement";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Troubleshooting from "./pages/admin/Troubleshooting";
import RegistrationsPage from "./pages/public/RegistrationsPage";
import CompliancePage from "./pages/public/CompliancePage";
import GSTPage from "./pages/public/GSTPage";
import IncomeTaxPage from "./pages/public/IncomeTaxPage";
import MCAPage from "./pages/public/MCAPage";
import HRAPage from "./pages/public/HRAPage";
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
            <Route path="/home" element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/registrations" element={<RegistrationsPage />} />
            <Route path="/services/compliance" element={<CompliancePage />} />
            <Route path="/services/gst" element={<GSTPage />} />
            <Route path="/services/income-tax" element={<IncomeTaxPage />} />
            <Route path="/services/mca" element={<MCAPage />} />
            <Route path="/services/hra" element={<HRAPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/troubleshooting" element={<Troubleshooting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
