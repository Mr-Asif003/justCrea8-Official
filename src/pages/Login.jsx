import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import heroImgbg from "../assets/images/heroImg4.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig.js";

export default function Login() {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   

  const handleClose = () => {
    setShowModal(false);
    navigate("/home");
  };

  const handleEsc = useCallback((e) => {
    if (e.key === "Escape") toggleModal();
  }, []);
  useEffect(()=>{
    
  })

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

   const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        setErrorMsg("Please verify your email before logging in.");
        return;
      }
      // After login, AuthProvider will update isLogin via onAuthStateChanged
      navigate("/userHome"); // Optionally wait a few ms if needed
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        setErrorMsg('Network error. Please check your connection.');
      } else {
        setErrorMsg('Invalid email or password.');
      }
    }
  };

  return (
    <div className="relative z-50 p-4 m-4">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImgbg}
              alt="Login Background"
              className="w-full h-full object-cover"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 100%)",
                opacity: 0.8,
                filter: "blur(1px)",
              }}
            />
          </div>

          <div className="bg-white dark:bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl w-full max-w-md border dark:border-gray-700 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Welcome Back</h2>
              <Link
                to="/home"
                onClick={handleClose}
                className="text-lg font-semibold text-gray-600 dark:text-white hover:text-red-500"
              >
                ✕
              </Link>
            </div>

            <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-medium disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-500 dark:text-gray-400">
              Don’t have an account?
              <NavLink to="/register" className="text-purple-600 hover:underline ml-1">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
