// AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import { MainLayout } from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserHome from "./pages/UserHome";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import BlogMaker from "./pages/BlogMaker";
import NoteMaker from "./pages/NoteMaker";
import TodoMaker from "./pages/TodoMaker";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const AppRoutes = () => {
  const { isLogin } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to={isLogin ? "/userHome" : "/home"} replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isLogin ? <Navigate to="/userHome" replace /> : <Login />} />
        <Route path="/register" element={isLogin ? <Navigate to="/userHome" replace /> : <Register />} />

        {/* Protected Routes */}
        <Route
          path="/userHome"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <UserHome />
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
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Dashboard />
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
          path="/notes"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <NoteMaker />
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
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLogin}>
              <Settings />
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
