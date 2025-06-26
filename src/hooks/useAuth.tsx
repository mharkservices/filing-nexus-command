
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
  role: "super_admin" | "admin" | "editor" | "user";
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
    // Demo login credentials
    const demoCredentials = [
      {
        email: "admin@zenithfilings.com",
        password: "admin123",
        userData: {
          id: "1",
          name: "Super Admin",
          email: "admin@zenithfilings.com",
          role: "super_admin" as const,
          permissions: ["all"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      },
      {
        email: "user@zenithfilings.com",
        password: "user123",
        userData: {
          id: "2",
          name: "Demo User",
          email: "user@zenithfilings.com",
          role: "user" as const,
          permissions: ["view_services", "submit_requests"],
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        }
      }
    ];

    // Check credentials
    const matchedCredential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (matchedCredential) {
      setIsAuthenticated(true);
      setUser(matchedCredential.userData);
      localStorage.setItem("zenith_auth", JSON.stringify({ user: matchedCredential.userData }));
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
