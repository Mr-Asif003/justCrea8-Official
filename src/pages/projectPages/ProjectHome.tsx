import React, { useState } from 'react';
import heroImgbg from '../../assets/images/heroImg4.jpg';
import heroImg from '../../assets/images/heroImg3.jpg';
import { useTheme } from '@/contexts/ThemeContext';
import { ChartNoAxesCombined, CirclePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ProjectHome() {
  const { theme } = useTheme();
  const [joinProjectLink, setJoinProjectLink] = useState('');
  const [joinBtnClicked, setJoinBtnClicked] = useState(false);

  return (
    <div className="w-full h-auto px-4 md:px-10 mt-4 space-y-8">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-15 px-6 md:px-10 flex flex-row items-center justify-between overflow-hidden shadow-lg rounded-xl bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImgbg}
            alt="Background"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
              opacity: 0.6,
            }}
          />
        </div>

        <div className="w-full md:w-1/2 z-10 text-white space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">Plan Smart Work.</h1>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">Create Project Freely</h1>
          <p className="text-sm opacity-90 max-w-lg">
            Plan, track, and collaborate effortlessly. Empower your team to stay aligned, meet deadlines,
            and deliver results — all from one powerful dashboard.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 animate-pulse duration-3000 hover:animate-none text-white px-6 py-3 rounded-xl shadow-md transition">
            Create Now!
          </button>
        </div>
      </section>

      {/* Welcome + Create Project */}
      <section className={`flex flex-col md:flex-row gap-4 ${theme === "dark" ? 'text-white' : 'text-black'}`}>
  {/* Welcome Card */}
  <div className={`w-full md:w-2/3 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex items-center rounded-xl h-32 ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
    <div className="w-2/3 flex flex-col justify-center px-2">
      <h2 className="text-lg font-semibold">Hi ! Asif</h2>
      <div className="flex items-center">
        <p className="text-xs">You haven't made any project yet</p>
        <ChartNoAxesCombined className="ml-2" size={16} color="purple" />
      </div>
    </div>
    <div className="w-1/3 flex justify-center items-center">
      <img src={heroImg} className="rounded-full h-20 w-20 object-cover" />
    </div>
  </div>

  {/* Create Project Card */}
  <div className={`w-full md:w-1/3 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex items-center justify-between rounded-xl h-32 ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
    <div className="flex flex-col px-2">
      <h2 className="text-lg font-semibold">Create Project</h2>
      <p className="text-xs">Start building your ideas</p>
    </div>
    <div className="p-2">
      <button className="size-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-transform duration-300">
        <CirclePlus size={20} className="hover:animate-spin" />
      </button>
    </div>
  </div>
</section>

      {/* Join Project + Placeholder */}
      <section className="flex h-[20%] flex-col md:flex-row gap-4">
        {/* Placeholder left box */}
        <div className={`w-2/3 h-48 backdrop-blur-xl bg-white/10 border border-white/30 text-white shadow-2xl p-6 rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <h2 className="text-lg font-semibold">Your Workspace</h2>
          <p className="text-sm">This section can be used for recent projects, quick actions, etc.</p>
        </div>

        {/* Join Project Card */}
        <div className="flex flex-col w-full md:w-1/3">
  
        <div className={`w-full  backdrop-blur-xl bg-white/10 border border-white/30 text-white shadow-2xl p-6 rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <div className="w-full flex justify-between items-center">
            <div className="text-center">
              <h1 className="text-xl font-semibold">Join Project</h1>
              <p className="text-sm">via Link</p>
            </div>
            <button
              onClick={() => setJoinBtnClicked(!joinBtnClicked)}
              className="bg-purple-700 h-10 px-4 rounded-xl hover:bg-purple-900 transition-all"
            >
              {joinBtnClicked ? "Close" : "Join"}
            </button>
          </div>

          {joinBtnClicked && (
            <div className="mt-4 space-y-3">
              <Input
                placeholder="Enter Joining Link"
                value={joinProjectLink}
                onChange={(e) => setJoinProjectLink(e.target.value)}
              />
              <Input placeholder="Enter Project Password" type="password" autoComplete='false' />
              <Input placeholder="Enter Master Key" type="number" />
              <button className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded-xl mt-2">
                Submit
              </button>
            </div>
          )}
        </div>
        <div className={`w-full flex justify-around mt-2 backdrop-blur-xl bg-white/10 border border-white/30 text-white shadow-2xl p-6 rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
           <p>Help</p>
           <p>tool1</p>
        </div>
        </div>
        
      </section>
    </div>
  );
}
