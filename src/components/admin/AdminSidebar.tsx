
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Shield,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  Database,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: Package, label: "Service Management", href: "/admin/services" },
  { icon: FileText, label: "Content Management", href: "/admin/content" },
  { icon: Database, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ZenithFilings</h1>
            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-105"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
