
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
      try {
        const authData = JSON.parse(storedAuth);
        if (authData && authData.user) {
          setIsAuthenticated(true);
          setUser(authData.user);
        }
      } catch (error) {
        console.error("Error parsing stored auth:", error);
        localStorage.removeItem("zenith_auth");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", { email, password });
    
    // Demo login credentials - exact matches required
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
      },
      {
        email: "staff@zenithfilings.com",
        password: "staff123", 
        userData: {
          id: "3",
          name: "Staff Member",
          email: "staff@zenithfilings.com",
          role: "editor" as const,
          permissions: ["view_services", "manage_content", "view_users"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      }
    ];

    // Trim whitespace and check credentials
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    
    const matchedCredential = demoCredentials.find(
      cred => cred.email.toLowerCase() === trimmedEmail && cred.password === trimmedPassword
    );

    console.log("Credential match found:", !!matchedCredential);

    if (matchedCredential) {
      setIsAuthenticated(true);
      setUser(matchedCredential.userData);
      localStorage.setItem("zenith_auth", JSON.stringify({ user: matchedCredential.userData }));
      console.log("Login successful for:", matchedCredential.userData.name);
      return true;
    }
    
    console.log("Login failed - no matching credentials");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("zenith_auth");
    console.log("User logged out");
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
