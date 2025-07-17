import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isLogin, loading } = useAuth();

 

  // if (!isLogin) {
    
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
