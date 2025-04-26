// contexts/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/Firebase/firebaseConfig"; // Import Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider component to wrap your app and manage user authentication
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to false, since user is not logged in initially
  const [user, setUser] = useState(null); // Store current user object

  // Set up listener for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLogin(true); // User is logged in
        setUser(currentUser); // Store user info
      } else {
        setIsLogin(false); // No user logged in
        setUser(null); // Clear user data
      }
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const login = async (email, password) => {
    // Firebase login logic (use signInWithEmailAndPassword or other methods)
    // Example: await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth); // Firebase logout logic
      setIsLogin(false); // Set login state to false
      setUser(null); // Clear user data
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth state
export const useAuth = () => {
  return useContext(AuthContext);
};
