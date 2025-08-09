import React, { useState } from 'react';
import heroImgbg from '../../assets/images/heroImg4.jpg';
import heroImg from '../../assets/images/heroImg3.jpg';
import { useTheme } from '@/contexts/ThemeContext';
import { ChartNoAxesCombined, CirclePlus, Info, Headset, CircleUser, ArrowBigRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TypeWriterEffect from 'react-typewriter-effect';
import InfiniteCarousel from '@/components/ui/projectUi/ProjectFeature';
import { projectFeatures } from '../../components/ui/projectUi/ProjectFeatures';
import VerticalLinearStepper from '@/components/ui/projectUi/VerticalLinearStepper';
import { NavLink, useParams,Navigate } from 'react-router-dom';
import { auth } from '@/Firebase/firebaseConfig';
import TestimonialCard from '@/components/ui/TestimonialCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import StatCard from '@/components/ui/StatCard';
import SplashCursor from '@/animationComponents/SplashCursor/SplashCursor';
import { cyan } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function ProjectHome() {
  const p = useParams(); // p will be an object like { userName: "someValue" }
  const { userName } = useParams(); // Get userName from URL
  const currentUserUID = auth.currentUser?.uid; // Get current user's UID from Firebase Auth

  // Redirect if the URL's userName does not match the current user's UID
  // if (userName !== currentUserUID) {
  //   return <Navigate to={`/project/${currentUserUID}`} replace />;
  // }

  
  const { theme } = useTheme();
  const [joinProjectLink, setJoinProjectLink] = useState('');
  const [joinBtnClicked, setJoinBtnClicked] = useState(false);
  
  // Get the userName from Firebase Authentication

  
  // if (p.userName === userName) {
  //   // Do something if the userName from the URL matches the current user's UID
  //   alert('same user')
  // }

    const numOfProjects = 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (numOfProjects > 0) {
      navigate('/help'); // correct usage
    }
  }, [numOfProjects, navigate]);
const user=auth.currentUser?.displayName
const handleClick=()=>{
  navigate(`./${user}`)
}


  const navItems = [
    { icon: CircleUser, path:`/account`, label: 'Project Account' },
    { icon: Info, path: '/project/info', label: 'Project Info' },

    { icon: Headset, path: '/help', label: 'Help & Support' },
  ];
  const mySteps = [
    {
      label: 'Plan Your Project',
      description: 'Define goals, roles, and scope before starting.',
    },
    {
      label: 'Teammates & Mentor ',
      description: 'Add team mates and mentors in your project',
    },
    {
      label: 'Design Workflow',
      description: 'Create tasks and assign them to collaborators.',
    },
    {
      label: 'Launch & Monitor',
      description: 'Track progress and adjust timelines as needed.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-4 md:px-6 xl:px-12 2xl:px-25 mb-10 mt-4 space-y-8">
     
      {/* Header */}
      
      {/* Hero Section */}
      <section className="relative w-full py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg rounded-xl bg-black">
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

        <div className="w-full md:w-1/2 z-10 text-white space-y-4 px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Plan Smart Work.</h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Create Project Freely</h1>
          <p className="text-sm max-w-lg">
            <TypeWriterEffect
              textStyle={{ fontFamily: 'Red Hat Display' }}
              startDelay={100}
              cursorColor="black"
              text="Plan, track, and collaborate effortlessly. Empower your team to stay aligned, meet deadlines, and deliver results — all from one powerful dashboard."
              typeSpeed={50}
            />
          </p>
        </div>
      </section>
      <div className={`w-1/2 gap-4  backdrop-blur-xl bg-white/10 border border-white/30 shadow-md p-4 flex items-center justify-around rounded-xl border-cyan-600 shadow-purple-700 animate-pulse  ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
         <p>If you have already created project ? 
          </p>       
            <button onClick={handleClick} className="size-14 bg-black hover:animate-pulse rounded-full flex items-center justify-center hover:bg-gray-700 transition-transform duration-300">
             <ArrowBigRight  className=''/>
            </button>
      </div>
      {/* Welcome + Create Project Section */}
      <section className={`flex flex-col sm:flex-row gap-4 ${theme === "dark" ? 'text-white' : 'text-black'}`}>
        {/* Welcome Card */}
        <div className={`w-full sm:w-2/3 xl:w-3/4 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex items-center rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <div className="w-2/3 flex flex-col justify-center px-2">
            <h2 className="text-lg font-semibold">
              <TypeWriterEffect
                textStyle={{ fontFamily: 'Red Hat Display', fontSize: '25px' }}
                startDelay={100}
                cursorColor="black"
                text="Hi,  Asif "
                typeSpeed={50}
              />
            </h2>
            <div className="flex items-center">
              <p className="text-sm mt-2 font-light">You haven't made any project yet</p>
              <ChartNoAxesCombined className="ml-2" size={16} color="purple" />
            </div>
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce">
              <h1 className='text-4xl'>🤨</h1>
            </div>
          </div>
        </div>
                


        {/* Create Project Card */}
        <div className={`w-full sm:w-1/3 xl:w-1/4 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex items-center justify-between rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <div className="flex flex-col px-2">
            <h2 className="text-lg font-semibold">Create Team Now!</h2>
            <p className="text-xs">Start building your ideas</p>
          </div>
          <div className="p-2">
            <button onClick={handleClick} className="size-14 bg-black hover:animate-spin rounded-full flex items-center justify-center hover:bg-gray-700 transition-transform duration-300">
              <CirclePlus size={20} color='white' className="hover:animate-spin" />
            </button>
          </div>
        </div>
      </section>


      {/* Join Project + Carousel Section */}
      <section className="flex flex-col md:flex-row gap-4">
        {/* Carousel / Info Section */}
        <div className={`w-full md:w-2/3 xl:w-3/4 backdrop-blur-xl bg-white/10 border border-white/30 text-white shadow-2xl rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <InfiniteCarousel features={projectFeatures} />
         
        </div>

        {/* Join Project Card */}
        <div className="flex flex-col w-full md:w-1/3 xl:w-1/4">
          <div className={`backdrop-blur-xl bg-white/10 border border-white/30 text-white shadow-2xl p-6 rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
            <div className="w-full flex justify-between items-center">
              <div className="text-center">
                <h1 className="text-xl font-semibold">Join Team Now!</h1>
                <p className="text-sm">via Link</p>
              </div>
               <button onClick={handleClick} className="size-14 bg-black hover:animate-spin rounded-full flex items-center justify-center hover:bg-gray-700 transition-transform duration-300">
              <CirclePlus size={20} color='white' className="hover:animate-spin" />
            </button>
              
            </div>

          
          </div>

          {/* Icons */}
          <div className="flex justify-around mt-2 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-6 rounded-xl">
      {navItems.map(({ icon: Icon, path, label }, i) => (
        <NavLink
          to={path}
          key={i}
          className={({ isActive }) =>
            `relative group rounded-full  p-2 cursor-pointer ${
              isActive ? 'bg-purple-600' : 'bg-purple-800'
            } hover:bg-purple-700 transition-colors`
          }
        >
          <Icon color="white" className='hover:animate-spin' size={25} />

          {/* Tooltip on hover */}
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            {label}
          </span>
        </NavLink>
      ))}
    </div>
    </div>
      </section>


<div className="w-full mt-4 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="w-full xl:w-1/3 h-20 m-4"><StatCard label="Total Users"  count={764} theme={theme} /></div>
        
        {/* Testimonial */}
      
        <div className="w-full xl:w-1/3 h-20 m-4"> <TestimonialCard name="Asif Khan" quote="A truly collaborative experience." /></div>
        {/* FAQ */}
        <div className="w-full xl:w-1/3 h-20 m-4"> <FAQAccordion question="Is this free?" answer="Yes! All core features are free to use." /></div>
     </div>
      {/* Footer Info Cards Section */}
      <section className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {/* Profile Card */}
      

        {/* Placeholder Card */}
       

        {/* Stepper Card */}
        <div className={`flex flex-col items-center backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 rounded-xl ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <VerticalLinearStepper steps={mySteps} />
        </div>
       
        
      </section>
    </div>
  );
}
