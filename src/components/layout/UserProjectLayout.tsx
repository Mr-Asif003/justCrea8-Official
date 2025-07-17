import { useAuth } from '@/contexts/AuthProvider';
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function UserProjectLayout() {
  
  const {user}=useAuth()
const userName= user?.displayName || user?.email || 'User';
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-sm md:text-lg text-cyan-500 font-serif bg-gray-800 p-0.1 pl-2 pr-2 rounded'
      : 'text-gray-100 text-sm md:text-sm hover:text-cyan-500 hover:text-lg  font-serif';

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <header className="w-[95%] md:w-[80%] flex justify-around items-center backdrop-blur-xl bg-white/2 border border-white/30 shadow-2xl p-2 mb-5 md:mt-[-60px] rounded-xl bg-gradient-to-r">
          <NavLink to={`/project/${userName}`} end className={navLinkStyle} aria-label="Home">
            Home
          </NavLink>
          <NavLink to={`/project/${userName}/teams`} className={navLinkStyle} aria-label="Projects">
            Teams
          </NavLink>
          <NavLink to={`/project/${userName}/setting`} className={navLinkStyle} aria-label="Settings">
            Settings
          </NavLink>
        </header>
      </div>

      <Outlet />
    </div>
  );
}
