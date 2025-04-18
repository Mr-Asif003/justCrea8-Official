import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; // Corrected import
import { useNavigate } from 'react-router-dom'; // Corrected import
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

  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      console.log('User registered:', userCredential.user);
      alert("Registration successful!");

      toggleModal();
      navigate('userHome');
    } catch (error) {
      alert(error.message);
    }
  };

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

          {/* Register Modal */}
          <div className="bg-white dark:bg-[#1e1e2f] p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Create an Account</h2>
              <Link to='/home' className="text-lg font-semibold text-gray-600 dark:text-white hover:text-red-500 transition">✕</Link>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2b2b3d] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>

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
