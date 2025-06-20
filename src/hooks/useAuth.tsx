
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor";
  permissions: string[];
  avatar?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate checking for stored auth
    const storedAuth = localStorage.getItem("zenith_auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login API call
    if (email === "admin@zenithfilings.com" && password === "admin123") {
      const userData: User = {
        id: "1",
        name: "Super Admin",
        email: "admin@zenithfilings.com",
        role: "super_admin",
        permissions: ["all"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      localStorage.setItem("zenith_auth", JSON.stringify({ user: userData }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("zenith_auth");
  };

  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes("all") || user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      checkPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
