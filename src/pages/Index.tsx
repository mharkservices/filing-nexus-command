
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./admin/Dashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
};

export default Index;
