// src/contexts/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/Firebase/firebaseConfig";
import { onAuthStateChanged, signOut, getIdTokenResult } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
     const timer=2*60*60*1000;
      setTimeout(() => {
        if(auth.currentUser){
          alert('session expired, please login again');
          logout();
        }
      },timer)
  }, [auth.currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // Ensure fresh verification status

        if (currentUser.emailVerified) {
          const tokenResult = await getIdTokenResult(currentUser, true); // fresh token
          setUser({
            ...currentUser,
            token: tokenResult.token,
            claims: tokenResult.claims, // useful for role-based auth
          });
          setIsLogin(true);
        } else {
          await signOut(auth); // Force logout if email not verified
          setUser(null);
          setIsLogin(false);
        }
      } else {
        setUser(null);
        setIsLogin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const logout = async () => {
    try {
      await signOut(auth);
      setIsLogin(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
