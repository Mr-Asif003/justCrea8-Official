import React, { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { auth } from "@/Firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  deleteUser
} from "firebase/auth";
import heroImgbg from "@/assets/images/heroImg4.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showModal, setShowModal] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return alert("Please fill in all fields.");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      auth.languageCode = 'en';

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);

      alert("Verification email sent. Please check your inbox or spam folder.");
      setVerifying(true);

      // Check every 3 seconds if email is verified
      const checkInterval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(checkInterval);
          setVerifying(false);
          alert("Email verified! Redirecting to login...");
          navigate("/login");
        }
      }, 3000);

      // Delete user if not verified after 2 minutes
      const expireTimeout = setTimeout(async () => {
        await user.reload();
        if (!user.emailVerified) {
          clearInterval(checkInterval);
          await deleteUser(user);
          alert("Account deleted because email was not verified in time.");
          setVerifying(false);
          navigate("/register");
        }
      }, 120000);

    } catch (err) {
      console.error("Registration error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="relative z-50">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImgbg}
              alt="Background"
              className="w-full h-full object-cover opacity-80 blur-sm"
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)' }}
            />
          </div>
          <div className="bg-white dark:bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Create an Account
              </h2>
              <Link to="/home" className="text-lg font-semibold hover:text-red-500">
                ✕
              </Link>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {["name", "email", "password", "confirmPassword"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === "name" ? "John Doe" : ""}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-medium"
              >
                {verifying ? "Waiting for verification..." : "Register"}
              </button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account?
              <NavLink to="/login" className="text-purple-600 hover:underline ml-1">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
