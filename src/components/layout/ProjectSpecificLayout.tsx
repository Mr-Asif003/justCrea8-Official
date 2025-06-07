import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Projector,Group,WorkflowIcon,LayoutDashboard ,NotebookPenIcon,LucideWorkflow,PercentDiamondIcon,TreePalm} from 'lucide-react';
export default function ProjectSpecificLayout() {
  const location = useLocation();
  const { theme } = useTheme();

  // Step 1: Get id from state OR localStorage
  const [projectId, setProjectId] = useState(location.state?.id || localStorage.getItem('currentProjectId'));

  useEffect(() => {
    if (location.state?.id) {
      setProjectId(location.state.id);
      localStorage.setItem('currentProjectId', location.state.id); // persist for nested routes
    }
  }, [location.state]);

  if (!projectId) {
    return <p className="text-red-500">Project ID not found. Please go back.</p>;
  }

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? ' text- text-cyan-400 font-semibold border-b-2 border-cyan-400 px-2'
      : 'flex gap-1 text-sm text-gray-500 hover:text-cyan-800 px-2';

  const projectname = 'justCrea8';

  return (
    <div>
      <header>
        <section className={`flex  flex-col gap-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className={`w-full backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 rounded ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
            <h1 className="text-pink-800 text-sm sm:text-lg font-bold">{projectname}</h1>
            <p className="text-sm">Welcome Mr. Admin</p>
          </div>

          {/* Navigation Bar */}
          <div className={`w-full backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex flex-wrap gap-4 items-center rounded ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
            <NavLink to="project" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Project</p>  <Projector size={13}/></div></NavLink>
            <NavLink to="workspace" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>WorkSpace</p>  <WorkflowIcon size={13}/></div></NavLink>
            <NavLink to="dashboard" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Dashboard</p>  <LayoutDashboard size={13}/></div></NavLink>
            <NavLink to="documents" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Documents</p>  <NotebookPenIcon size={13}/></div></NavLink>
            <NavLink to="team" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Teams</p>  <Group size={13}/></div></NavLink>
            <NavLink to="tasks" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Tasks</p>  <WorkflowIcon size={13}/></div></NavLink>
           <NavLink to="predict" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>Predict</p>  <PercentDiamondIcon size={13}/></div></NavLink>
           <NavLink to="predict" className={navLinkStyle}><div className='flex items-center justify-center gap-2'><p>LinkTree</p>  <TreePalm size={15}/></div></NavLink>

          </div>
        </section>
      </header>

      <Outlet context={{ projectId }} />
    </div>
  );
}
