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
import WorkSpace from "./pages/specificProjectPage/WorkSpace";
import TeamDetails from "./pages/specificProjectPage/TeamDetails";
import Documents from "./pages/specificProjectPage/Documents";
import Pdashboard from "./pages/specificProjectPage/PDashboard4";
import Tasks from "./pages/specificProjectPage/Tasks";
import LinkTreeCardGrid from "./pages/specificProjectPage/LinkTree";
import TeamChatScreen from "./pages/specificProjectPage/ChatScreen";
import TodoProject from "./pages/specificProjectPage/TodoProject";
import NoteProject from "./pages/specificProjectPage/NoteProject";
import ProjectSettingsScreen from "./pages/projectPages/ProjectSetting";
import Poll from "./pages/specificProjectPage/Poll";
import TimelineScreen from "./pages/specificProjectPage/TimelineScreen";
import KanbanBoard from "./pages/specificProjectPage/KanbanBoard";
import SpecificProjectHome from "./pages/specificProjectPage/SpecificProjectHome";
import TeamsLayout from "./components/layout/TeamsLayout";
import TeamLayout from "./components/layout/TeamLayout";
import UserTeams from "./pages/projectPages/UserTeams";
import SpecificTeams from "./pages/projectPages/SpecificTeams";
import Rooms from "./pages/specificProjectPage/GroupDiscussion/Rooms";


import CreateTeam from "./pages/projectPages/teamWorkspace.tsx/CreateTeam";
import JoinTeam from "./pages/projectPages/teamWorkspace.tsx/JoinTeam";
import UpdateTeam from "./pages/projectPages/teamWorkspace.tsx/UpdateTeam";


import CreateProject from "./pages/projectPages/projectWorkspace.tsx/CreateProject";
import JoinProject from "./pages/projectPages/projectWorkspace.tsx/JoinProject";
import UpdateProject from "./pages/projectPages/projectWorkspace.tsx/UpdateProject";

const AppRoutes = () => {
  const { isLogin } = useAuth();

  const renderProtected = (element) => (
    <ProtectedRoute>{element}</ProtectedRoute>
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/userHome" : "/home"} />}
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/userHome" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogin ? <Navigate to="/userHome" replace /> : <Register />}
        />
      </Route>

      {/* Private Routes */}
      <Route element={renderProtected(<PrivateLayout />)}>
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        {/* Tools */}
        <Route path="/notes" element={<NoteMaker />} />
        <Route path="/blog-maker" element={<BlogMaker />} />
        <Route path="/todos" element={<TodoMaker />} />

        {/* Project Routes */}
        <Route element={<ProjectLayout />}>
          <Route path="/project" element={<ProjectHome />} />
          <Route path="/project/info" element={<PInfo />} />
              <Route path="/project/createteam" element={<CreateTeam/>}/>
               <Route path="/project/jointeam" element={<JoinTeam/>}/>
               <Route path="/project/updateteam" element={<UpdateTeam/>}/>
                
               <Route path="/project/updateproject" element={<UpdateProject/>}/>
          <Route path="/project/:userName" element={<UserProjectLayout />}>
            <Route index element={<ProjectUserHome />} />
            <Route path="setting" element={<ProjectSettingsScreen />} />
            <Route path="teams" element={<TeamsLayout />}>
              <Route index element={<UserTeams />} />
              <Route path=":teamId" element={<TeamLayout />}>
                <Route index element={<SpecificTeams />} />
                <Route path="projects" element={<UserProjects />} />

                <Route path=":projectId" element={<ProjectSpecificLayout />}>
                  <Route index element={<SpecificProjectHome />} />
                  <Route path='p' element={<Project />} />

                  <Route path="workspace" element={<WorkSpace />} />
                  <Route path="poll" element={<Poll />} />
                  <Route path="chat" element={<TeamChatScreen />} />
                  <Route path="linktree" element={<LinkTreeCardGrid />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="roadmap" element={<TimelineScreen />} />
                  <Route path="dashboard" element={<Pdashboard />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="team" element={<TeamDetails />} />
                  <Route path="todos" element={<TodoProject />} />
                  <Route path="notes" element={<NoteProject />} />
                  <Route path="setting" element={<ProjectSettingsScreen />} />
                  <Route path='kanban' element={<KanbanBoard />} />
                  <Route path='rooms/:roomId' element={<Rooms/>}/>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
