// AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

import PublicLayout from "./components/layout/PublicLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import ProjectLayout from "./components/layout/ProjectLayout";
import UserProjectLayout from "./components/layout/UserProjectLayout";
import ProjectSpecificLayout from "./components/layout/ProjectSpecificLayout";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import TodoMaker from "./pages/TodoMaker";
import BlogMaker from "./pages/BlogMaker";
import NoteMaker from "./pages/NoteMaker";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

// Project Pages
import ProjectHome from "./pages/projectPages/ProjectHome";
import PInfo from "./pages/projectPages/Pinfo";
import ProjectUserHome from "./pages/projectPages/ProjectUserHome";
import UserProjects from "./pages/projectPages/UserProjects";
import Project from "./pages/specificProjectPage/Project";
//specific project
import WorkSpace from "./pages/specificProjectPage/WorkSpace";
import TeamDetails from "./pages/specificProjectPage/TeamDetails";
import Documents from "./pages/specificProjectPage/Documents";
import Pdashboard  from "./pages/specificProjectPage/PDashboard4" ;
import Tasks from "./pages/specificProjectPage/Tasks";
import PredictCost from "./pages/specificProjectPage/PredictCost";
const AppRoutes = () => {
  const { isLogin } = useAuth();

  const renderProtected = (element) => (
    <ProtectedRoute isLoggedIn={isLogin}>{element}</ProtectedRoute>
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Navigate to={isLogin ? "/userHome" : "/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isLogin ? <Navigate to="/userHome" replace /> : <Login />} />
        <Route path="/register" element={isLogin ? <Navigate to="/userHome" replace /> : <Register />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/userHome" element={renderProtected(<UserHome />)} />
        <Route path="/dashboard" element={renderProtected(<Dashboard />)} />
        <Route path="/account" element={renderProtected(<Account />)} />
        <Route path="/settings" element={renderProtected(<Settings />)} />
        <Route path="/help" element={renderProtected(<Help />)} />

        {/* Tools */}
        <Route path="/notes" element={renderProtected(<NoteMaker />)} />
        <Route path="/blog-maker" element={renderProtected(<BlogMaker />)} />
        <Route path="/todos" element={renderProtected(<TodoMaker />)} />

        {/* Project Routes */}
        <Route element={<ProjectLayout />}>
          <Route path="/project" element={renderProtected(<ProjectHome />)} />
          <Route path="/project/info" element={renderProtected(<PInfo />)} />

          {/* User-specific project routes */}
          <Route path="/project/:userName" element={renderProtected(<UserProjectLayout />)}>
            <Route index element={<ProjectUserHome />} />
            <Route path="projects" element={<UserProjects />} />

            {/* ✅ Updated Project-specific route */}
            <Route path="/project/:userName/projects/project" element={<ProjectSpecificLayout />}>
  <Route path="project" element={<Project />} />
  <Route path="workspace" element={<WorkSpace />} />
  <Route path="dashboard" element={<Pdashboard />} />
  <Route path="documents" element={<Documents />} />
  <Route path="team" element={<TeamDetails />} />
   <Route path="tasks" element={<Tasks />} />
   <Route path="predict" element={<PredictCost/>}/>
</Route>
          </Route>
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
