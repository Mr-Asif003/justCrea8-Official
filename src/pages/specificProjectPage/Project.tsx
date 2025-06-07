import React from 'react'

import { NavLink, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useOutletContext } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import { AlignEndVertical } from 'lucide-react';
import EraLogoComponent from '../projectPages/EraLogoComponent';
export default function Project() {
  const { userName } = useParams()

  const location = useLocation();

  const { theme } = useTheme();
  const { projectId } = useOutletContext();


  return (
    <div>
      <section className={`flex mt-2 flex-col sm:flex-row gap-4 ${theme === "dark" ? 'text-white' : 'text-black'}`}>
        {/* Welcome Card */}
        <div className={`w-full  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-between rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          {/* left */}
          <div className="w-1/2 p-2 flex flex-col justify-between">
            <div className="text-gray-400">
              <h1 className='text-cyan-400'>Project Name</h1>
              <TypeWriterEffect
                textStyle={{ fontFamily: 'Red Hat Display', fontSize: '15px' }}
                startDelay={100}
                cursorColor="black"
                text="Welcome to justCrea8 Project Management"
                typeSpeed={100}
              />
            </div>
            <div className="mt-20">
              <div className="flex gap-8 text-sm text-gray-500"> <p>Created At :-</p>
                <p>End At :-</p></div>

            </div>



          </div>
          {/* right */}
          <div className="w-1/2 flex flex-col justify-center items-center p-2">
            <div className="logo mb-4 flex gap-4 rounded-lg">
              <div className="w-36 h-16 bg-cyan-950 rounded-lg flex justify-center items-center">
                logo
              </div>
            </div>
            <div className="role flex gap-4 text-sm text-cyan-500">
              <h3>Admin :-</h3>
              <h4>Project manager :-</h4>
            </div>
            <div className="link flex gap-4 text-xs text-gray-500">
              <p>Project Link :- </p>
              <p>Master Key :- only admin pm</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`flex mt-2 flex-col sm:flex-row gap-4 ${theme === "dark" ? 'text-white' : 'text-black'}`}>
        
        <div className={`w-full  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-between rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <div className="text-gray-500">Go to </div>
          <div className="text-sm flex gap-2 text-gray-500 ">
            <NavLink to={'commits'} >Commits</NavLink>
            <NavLink to={'commits'}>Todo</NavLink>
            <NavLink to={'commits'}>Note</NavLink>
            <NavLink to={'commits'}>blog</NavLink>
            <NavLink to={'commits'}>Add event</NavLink>
          </div>
        </div>
      </section>


      {/* <section className={`flex mt-5 flex-col sm:flex-row gap-4 ${theme === "dark" ? 'text-white' : 'text-black'}`}>
       
        <div className={`w-full  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-between rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
        </div>
      </section> */}

      <div className="w-full flex gap-2 mt-2">
        {/* left...... */}
        <div className="w-2/3">
          <div className={`w-full  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-between rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
            <div className="text-sm text-cyan-500"><h4>Status :- Ongoing</h4></div>
            <div className="text-sm text-cyan-500"><h4>Progress :- 70%</h4></div>

          </div>
          <div className={`w-full mt-2 h-40 backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-between rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
            <div className="text-sm text-cyan-500">Announcement</div>
          </div>
        </div>

        {/* right.... */}
        <div className="w-1/3 flex flex-col gap-2">
         <NavLink to='era' className={`  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-center gap-4 items-center rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
           Chatbot <EraLogoComponent size={40}/>
          </NavLink>
          <button className={`w-full text-xs  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-center items-center gap-2 rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <p>End Project </p>
          < AlignEndVertical size={14}/>
          </button>
             <button className={`w-full text-sm  backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl p-4 flex justify-center items-center gap-2 rounded ${theme === "dark" ? 'bg-gradient-to-r from-black to-gray-800' : ''}`}>
          <p >Filter </p>
          
          </button>

         


        </div>
      </div>

    </div>
  )
}
