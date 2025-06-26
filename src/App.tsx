
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";

// Public Pages
import Homepage from "./pages/public/Homepage";
import ServicesPage from "./pages/public/ServicesPage";
import ContactPage from "./pages/public/ContactPage";
import BlogPage from "./pages/public/BlogPage";
import BlogPostPage from "./pages/public/BlogPostPage";
import DocumentationPage from "./pages/public/DocumentationPage";

// Service Pages
import RegistrationsPage from "./pages/public/RegistrationsPage";
import GSTPage from "./pages/public/GSTPage";
import IncomeTaxPage from "./pages/public/IncomeTaxPage";
import CompliancePage from "./pages/public/CompliancePage";
import MCAPage from "./pages/public/MCAPage";
import HRAPage from "./pages/public/HRAPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";

// Admin Pages
import Index from "./pages/Index";
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ServiceManagement from "./pages/admin/ServiceManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Troubleshooting from "./pages/admin/Troubleshooting";
import IntegrationManagement from "./pages/admin/IntegrationManagement";

// User Portal
import UserDashboard from "./pages/user/UserDashboard";

// 404 Page
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            
            {/* Service Routes */}
            <Route path="/services/registrations" element={<RegistrationsPage />} />
            <Route path="/services/gst" element={<GSTPage />} />
            <Route path="/services/income-tax" element={<IncomeTaxPage />} />
            <Route path="/services/compliance" element={<CompliancePage />} />
            <Route path="/services/mca" element={<MCAPage />} />
            <Route path="/services/hra" element={<HRAPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route path="/home" element={<Index />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/content" element={<ContentManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/troubleshooting" element={<Troubleshooting />} />
            <Route path="/admin/integrations" element={<IntegrationManagement />} />
            
            {/* User Portal Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
