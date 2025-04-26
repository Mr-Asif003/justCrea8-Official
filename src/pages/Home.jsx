import React, { use, useState, useRef } from 'react';
import { Fade, Slide, JackInTheBox, Zoom } from 'react-awesome-reveal';

import { useTheme } from '@/contexts/themeC';
import FeatureCarousel from '../components/features';
import hero2 from '../assets/images/hero2.png';
import userUseCase from '../components/userUseCase';
import { Button } from 'react-scroll';
import { icons, Menu, X } from "lucide-react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./../pages/keenAutoSlider.css"
import family from '../assets/images/family.jpg'
import presentation from '../assets/images/presentation.jpg'
import student from '../assets/images/student.jpg'
import workingProfessional from '../assets/images/workingProfessional.jpg'
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { Building2,NotebookPen,Users,BriefcaseBusiness,Route } from 'lucide-react';
import heroImgbg from "../assets/images/heroImg4.jpg"
import useSmartHeader from '../components/useSmartHeader';
import LatestBlog from '../components/LatestBlog';
import Footer from '../components/Footer';
import Register from './Register';


export default function Home() {
  const [isGetStarted, setIsGetStarted] = useState(false);
  const [name, setName] = useState('');
  const [islock, setIsLock] = useState(false);
  const { themeMode, toggleTheme } = useTheme();
  const isDark = themeMode === 'dark';
  const [clickedLabel, setClickedLabel] = useState("");
  const navItems = ["Home", "Features", "Uses"];
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const useCaseRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const containerBg = isDark
    ? 'bg-gradient-to-b from-[#0F0C25] to-[#1A0B2E] text-white'
    : 'bg-white text-black';
   
   useSmartHeader();


  const [isLoginBtnClick, setIsLoginBtnClick] = useState(false);
  const [isRegisterBtnClick, setIsRegisterBtnClick] = useState(false);



  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )



  const uses = [
    {
      icon: <NotebookPen size={40} className="text-cyan-600" />, 
      title: `For Students`,
      desc: 'Manage your assignments, projects, and study schedules in one place. Reflect on your learning journey with our journaling feature.'
    },

    { icon: <Building2 size={40} className="text-cyan-600" />,
      title: 'for enterpreneurs',
      desc: 'Manage your business tasks, set goals, and track progress. Use our journaling feature to reflect on your entrepreneurial journey.'
    },
    { 
      icon: <Users size={40} className="text-cyan-600" />,
      title: 'For Families',
      desc: 'Keep track of your family members and their activities and manage your schedules together. Use our journaling feature to share family memories.'
    },
    { icon: <BriefcaseBusiness size={40} className="text-cyan-600" />,
      title: 'For Professionals',
      desc: 'Streamline your work tasks, set goals, and track progress. Use our journaling feature to reflect on your professional growth.'
    },


  ]



  return (

    <main className={`w-full min-h-screen ${containerBg} transition-all duration-1000  `}>
      <header id="smart-header"  className={`p-4 px-10 flex  items-center justify-between w-full  fixed top-0 z-50 transition-transform duration-300  ${isDark
        ? "bg-gradient-to-r from-[#0F0C25] to-[#0e7490] text-white"
        : "bg-white text-gray-900 shadow-[0_10px_30px_rgba(144,224,239,0.3)]"
        }`}>
        {/* Logo */}
        <div className="div">
        <span className={`text-3xl font-extrabold tracking-wide text-pink-600 ${themeMode == 'dark' ? "text-white" : ""} `}>
          Just
        </span>
        <span className={`text-3xl font-extrabold tracking-wide text-cyan-600 `}>
          Crea8
        </span>

        </div>

        <div className="hidden  sm:flex sm:w-[60%] xl:w-[45%] items-center gap-10 px-6 py-2 rounded-xl transition-all duration-500 bg-[#2E2B3F]">
          <ul className="flex items-center justify-around gap-20 w-full">
            <ul className="flex gap-4 w-full">
              {navItems.map((label) => (
                <li key={label} className='flex w-full justify-around'>
                  <Button
                    onClick={() => {
                      setClickedLabel(label)
                      if (label === 'Home') {
                        homeRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                      if (label === 'Features') {
                        featureRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                      if (label === 'Use Cases') {
                        useCaseRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    }
                    className={`font-semibold  sm:text-lg hover:text-pink-500 transition-all duration-200 ${clickedLabel === label ? "text-cyan-400 underline" : "text-white"
                      }`}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
            <li>
              <button
                onClick={toggleTheme}
                className="text-xl px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
                title="Toggle Theme"
              >
                {isDark ? "🌞" : "🌚"}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="sm:hidden flex items-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2" title="Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <button
            onClick={toggleTheme}
            className="text-lg px-2 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition"
            title="Toggle Theme"
          >
            {isDark ? "🌞" : "🌚"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-gradient-to-br from-[#2B2D42] to-[#1D1E33] text-white p-6 sm:hidden rounded-b-xl shadow-xl transition-all duration-500">
            <ul className="flex flex-col gap-4 text-lg">
              {navItems.map((label) => (
                <li key={label} className='flex w-[95%] justify-around'>
                  <Button
                    onClick={() => setClickedLabel(label)}
                    className={`font-semibold text-xl hover:text-pink-500 transition-all duration-200 ${clickedLabel === label ? "text-cyan-400 underline" : "text-white"
                      }`}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}





      </header>
      {/* HERO */}
      <section
        ref={homeRef}
        className="mt-[4%]  sm:w-[98%]  py-40 px-6 md:px-20 flex  flex-row items-center justify-between overflow-hidden shadow-xs rounded-xl shadow-cyan-300 m-4  bg-black"
      >
        {/* Gradient Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImgbg} // Replace with your image path
            alt="Background"
            className=" w-[98%] m:w-[98.6%] mt-10 object-cover  h-100%"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 100%)",
              opacity: 0.6,
              filter: "blur(0px)",
            }}
          />
        </div>


        {/* Left Side Text */}
        <div className=" w-1/2 space-y-6 z-10">
          <Fade cascade>
            <JackInTheBox>
              <div className="flex items-center flex-wrap">
                <h1 className="md:text-5xl text-sm font-bold text-white">Hi </h1>
                <h1 className="text-xl font-bold sm:text-5xl ml-2">👋 </h1>

                {!islock && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="focus:outline-1 h-7 border border-purple-700 rounded text-purple-600 p-2 sm:h-10 ml-2"
                  />
                )}
                <button
                  onClick={() => setIsLock(!islock)}
                  className="bg-purple-700 text-white p-2 rounded ml-2 h-10"
                >
                  {islock ? "Unlock" : "Lock"}
                </button>
              </div>
            </JackInTheBox>

            {name && <h1 className="sm:text-xl text-purple-600">{name}</h1>}

            <h2 className="text-4xl font-semibold text-pink-500">Welcome to JustCrea8</h2>
            <p className="text-lg text-gray-200">
               The Ultimate All-in-One Platform for Productivity, Creativity,progress tracker and Project Management
            </p>

            <button onClick={() => { setIsGetStarted(!isGetStarted) }} className={`mt-6 px-6 py-3 rounded-xl text-white bg-purple-600 hover:bg-purple-900 shadow-md transition ${isGetStarted ? "hidden" : "block"}`}>
              Get Started
            </button>


          </Fade>
          {isGetStarted && (
            <div className='flex '>
              <button onClick={() => { setIsLoginBtnClick(!isLoginBtnClick) }} className="mt-6 px-6 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-900 shadow-md transition">Login</button>
              <NavLink to='/register'
        
               className="mt-6 px-6 py-2 rounded-xl text-white border-2 ml-4 border-purple-500 hover:bg-purple-900 shadow-md transition">Register</NavLink>
            </div>

          )}

        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center z-10">
          <Slide direction="right">
            <Zoom>
              {/* <img
                src={heroImg}
                alt="Hero"
                className="w-[300px] md:w-[450px]   shadow-xl outline-amber-200"
              /> */}
            </Zoom>
          </Slide>
        </div>
      </section>


      {isLoginBtnClick && (
        <Login />
      )}
      {isRegisterBtnClick && (
        <Register />
         
      )}



      {/* FEATURES */}
      <section  ref={featureRef} >

        <FeatureCarousel />
      </section>




      {/* How JustCre8 Works */}

      <section className="w-full px-4 py-10 md:p-10 flex flex-col md:flex-row items-center gap-8 rounded-xl shadow-xs  shadow-cyan-400 mb-5">
        {/* Left - Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Slide direction="left" duration={1000} triggerOnce>
            <img src={hero2} alt="Hero" className="w-[250px] md:w-[450px]" />
          </Slide>
        </div>

        {/* Right - Text Content */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-center">
            <section className="py-8 px-4 md:px-10">
              <div className="max-w-5xl mx-auto text-center">
                <Zoom duration={2000}>
                  <div className="flex justify-center">
                  <Route size={40} className="text-purple-600 mr-4" />
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">How JustCre8 Works</h2>
                  </div>
                </Zoom>
                <p className="text-base md:text-lg text-gray-400 mb-10">
                  From idea to execution, JustCre8 keeps your life organized, creative, and on track.
                </p>

                <div className="grid gap-6 md:grid-cols-3 text-left">
                  <Fade duration={1000} cascade>
                    <div className="p-4 md:p-6 rounded-2xl shadow hover:shadow-md transition ">
                      <div className="text-xl md:text-2xl text-purple-500 font-semibold mb-2">🔯 Sign Up & Customize</div>
                      <p className="text-gray-600">
                        Create your account and personalize your dashboard to match your goals, habits, and style.
                      </p>
                    </div>

                    <div className="p-4 md:p-6 rounded-2xl shadow hover:shadow-md transition ">
                      <div className="text-xl md:text-2xl font-semibold text-purple-500 mb-2">🔯 Plan & Track</div>
                      <p className="text-gray-600">
                        Add tasks, set smart goals, and build daily routines. Stay on track with habit tracking and real-time updates.
                      </p>
                    </div>

                    <div className="p-4 md:p-6 rounded-2xl shadow hover:shadow-md transition ">
                      <div className="text-xl md:text-2xl font-semibold text-purple-500 mb-2">🔯  Create & Share</div>
                      <p className="text-gray-600">
                        Write blogs, track your travels, and share your productivity journey with family or friends.
                      </p>
                    </div>
                  </Fade>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>


      {/* USE CASES */}
      <section ref={useCaseRef} className={`w-full py-5 p-1 md:px-20 bg-gradient-to-br  from-[#1D1D30] to-[#2E2B3F] text-center shadow-2xs shadow-cyan-300 ${isDark ? 'text-white' : 'text-white'} `}>

        <div ref={sliderRef} className="keen-slider">

          <div className=""></div>
          <div className="keen-slider__slide flex justify-around ">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
              <Fade cascade>
               <div className="flex">
               {uses[0].icon}
               <h1 className='text-2xl md:text-4xl ml-4'> {uses[0].title}</h1>
               </div>
             
                <p className='text-gray-600'>{uses[0].desc}</p>

              </Fade>
              <h3 className='mt-5' >Scroll  ➡️</h3>
            </div>
            <div>
              <JackInTheBox duration={2000}>

                <img src={student} alt="Student" className="w-[200px] rounded-full md:w-[300px] mx-auto mb-4" />
              </JackInTheBox>
            </div>
          </div>

          <div className="keen-slider__slide flex justify-around ">

            <div>
              <JackInTheBox duration={2000}>

                <img src={presentation} alt="Student" className="w-[200px] rounded-full md:w-[300px] mx-auto mb-4" />
              </JackInTheBox>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
              <Fade cascade>
              <div className="flex">
               {uses[1].icon}
               <h1 className='text-2xl md:text-4xl ml-4'> {uses[1].title}</h1>
               </div>
                <p className='text-gray-600'>{uses[1].desc}</p>
              </Fade>
              <h3 className='mt-5' >Scroll ➡️</h3>
            </div>
          </div>

          <div className="keen-slider__slide flex justify-around ">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
              <Fade cascade>
              <div className="flex">
               {uses[2].icon}
               <h1 className='text-2xl md:text-4xl ml-4'> {uses[2].title}</h1>
               </div>
                <p className='text-gray-600'>{uses[2].desc}</p>
              </Fade> <h3 className='mt-5' >Scroll  ➡️</h3>
            </div>
            <div>
              <JackInTheBox duration={2000}>

                <img src={family} alt="Student" className="w-[200px] rounded-full md:w-[300px] mx-auto mb-4" />
              </JackInTheBox>
            </div>
          </div>

          <div className="keen-slider__slide flex justify-around ">

            <div>
              <JackInTheBox duration={2000}>

                <img src={workingProfessional} alt="Student" className="w-[200px] rounded-full md:w-[300px] mx-auto mb-4" />
              </JackInTheBox>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
              <Fade cascade>
              <div className="flex">
               {uses[3].icon}
               <h1 className='text-2xl md:text-4xl ml-4'> {uses[3].title}</h1>
               </div>
                <p className='text-gray-600'>{uses[3].desc}</p>

              </Fade>
              <h3 className='mt-5' >Scroll ➡️</h3>
            </div>
          </div>

        </div>
      </section>

     
     {/* latest blogs */}
     <LatestBlog/>






      {/* TESTIMONIALS */}
      < section className={`w-full py-20 px-6 md:px-20  `}>
        <Zoom>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              "“JustCre8 replaced 5 apps I used before. Game changer!”",
              "“I track my health, tasks, and journal here daily. Love it.”",
              "“The AI journaling feature is like talking to a real friend.”"
            ].map((quote, i) => (
              <div key={i} className="p-6 bg-white dark:bg-[#2D2B4C] rounded-xl shadow-lg">
                <p className="text-gray-700 dark:text-gray-300 italic">{quote}</p>
                <h4 className="mt-4 font-semibold text-purple-500">User {i + 1}</h4>
              </div>
            ))}
          </div>
        </Zoom>
      </section >



      {/* CALL TO ACTION */}
      < section className="w-full py-20 px-6 md:px-20 bg-gradient-to-tr from-[#5B247A] to-[#1B1B2F] text-center rounded-t-[3rem]" >
        <Fade direction="up">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">Ready to JustCre8 your life?</h2>
          <p className="text-lg mb-8 text-gray-800 dark:text-gray-200">
            Organize your mind. Empower your goals. Transform your day.
          </p>
          <button onClick={() => {
            homeRef.current.scrollIntoView({ behavior: 'smooth' });
          }} className="px-8 py-4 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition shadow-xl">
            Start Now 🚀
          </button>
        </Fade>
      </section >
    
    </main >
   
  );
}
