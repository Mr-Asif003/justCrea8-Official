import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig.js';
import heroImgbg from '../assets/images/heroImg4.jpg';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match!');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });

      alert("Registration successful!");
      toggleModal();

      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      navigate('/userHome');
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const toggleModal = () => setShowModal(false);

  return (
    <div className="relative z-50">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImgbg}
              alt="Background"
              className="w-full h-full object-cover"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                opacity: 0.8,
                filter: 'blur(1px)'
              }}
            />
          </div>

          {/* Modal */}
          <div className="bg-white dark:bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Create an Account</h2>
              <Link to='/home' className="text-lg font-semibold text-gray-600 dark:text-white hover:text-red-500 transition">
                ✕
              </Link>
            </div>

            <form onSubmit={handleRegister} className="space-y-5" autoComplete='off'>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete='off'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  about='off'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  autoCapitalize='off'
                  autoComplete='new-password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition font-medium"
              >
                Register
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
