// AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider"; // Import the useAuth hook
import PublicLayout from "./components/layout/PublicLayout"; // Public layout for non-authenticated users
import PrivateLayout from "./components/layout/PrivateLayout"; // Private layout for authenticated users

import Login from "./pages/Login"; // Public Route
import Register from "./pages/Register"; // Public Route
import Home from "./pages/Home"; // Public Route

import UserHome from "./pages/UserHome"; // Private Route
import Dashboard from "./pages/Dashboard"; // Private Route
import Account from "./pages/Account"; // Private Route
import Settings from "./pages/Settings"; // Private Route
import TodoMaker from "./pages/TodoMaker";
import BlogMaker from "./pages/BlogMaker";
import NoteMaker from "./pages/NoteMaker";
import NotFound from "./pages/NotFound"; // Catch-all route
import Help from "./pages/Help";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Custom protected route logic

const AppRoutes = () => {
  const { isLogin } = useAuth(); // Get login state from AuthProvider

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Navigate to={isLogin ? "/userHome" : "/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isLogin ? <Navigate to="/userHome" replace /> : <Login />} />
        <Route path="/register" element={isLogin ? <Navigate to="/userHome" replace /> : <Register />} />
      </Route>

      {/* Private routes */}
      <Route element={<PrivateLayout />}>
        <Route
          path="/userHome"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/notes"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <NoteMaker />
            </ProtectedRoute>
          }
        />
         <Route
          path="/blog-maker"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <BlogMaker />
            </ProtectedRoute>
          }
        />
         <Route
          path="/todos"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <TodoMaker />
            </ProtectedRoute>
          }
        />
         <Route
          path="/help"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
