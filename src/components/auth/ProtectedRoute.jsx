import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useState, useEffect } from "react";
import { auth } from "@/Firebase/firebaseConfig";
import Cookies from 'js-cookie'
import { signOut } from "firebase/auth";
const ProtectedRoute = ({ isLoggedIn, children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  

  useEffect(() => {
    if (!isLoggedIn) {
      
      setShowLoader(true);
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 5000); // 1 second delay before redirect

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }
  

  if (!isLoggedIn && !auth.currentUser && showLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold flex  ">
          <div className="size-10 rounded-full m-1 bg-red-500 animate-bounce"></div>
          <div className="size-10 rounded-full m-1 bg-blue-500 animate-bounce"></div>
          <div className="size-10 rounded-full m-1 bg-green-500 animate-bounce"></div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
