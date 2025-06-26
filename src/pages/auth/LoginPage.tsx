
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, User, UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to ZenithFilings Dashboard",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'admin' | 'user') => {
    setIsLoading(true);
    const credentials = type === 'admin' 
      ? { email: 'admin@zenithfilings.com', password: 'admin123' }
      : { email: 'user@zenithfilings.com', password: 'user123' };
    
    try {
      const success = await login(credentials.email, credentials.password);
      if (success) {
        toast({
          title: "Demo Login Successful",
          description: `Logged in as ${type === 'admin' ? 'Admin' : 'User'}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Demo login failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <Card className="w-full max-w-md mx-4 backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ZenithFilings
          </CardTitle>
          <CardDescription className="text-lg font-medium text-gray-600">
            Business Services Dashboard
          </CardDescription>
          <CardDescription className="text-sm text-gray-500 mt-2">
            Secure access to your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          {/* Demo Login Buttons */}
          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or try demo accounts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className="h-12 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50"
              >
                <UserCog className="w-4 h-4" />
                <span className="text-xs">Admin Demo</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('user')}
                disabled={isLoading}
                className="h-12 flex flex-col items-center justify-center space-y-1 hover:bg-green-50"
              >
                <User className="w-4 h-4" />
                <span className="text-xs">User Demo</span>
              </Button>
            </div>
          </div>
          
          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span className="font-medium">Admin:</span>
                <span>admin@zenithfilings.com / admin123</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">User:</span>
                <span>user@zenithfilings.com / user123</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
