import React, { useEffect, useState } from 'react';
import { NavLink, redirect, useParams } from 'react-router-dom';
import { auth } from '@/Firebase/firebaseConfig';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import heroImgbg from '../../assets/images/heroImg4.jpg';
import { ChartNoAxesCombined, CirclePlus, Info, Headset, CircleUser, Section } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import TypeWriterEffect from 'react-typewriter-effect';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import StatCard from '@/components/ui/StatCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { LineChart } from 'recharts';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';



export default function ProjectUserHome() {
  const { theme } = useTheme();
  const { userName } = useParams();
  const currentUserUID = auth.currentUser?.uid;
  const [eventDate, setEventDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [joinProjectLink, setJoinProjectLink] = useState('');
  const [joinBtnClicked, setJoinBtnClicked] = useState(false);
  const [events, setEvents] = useState([]);

  const navItems = [
    { icon: CircleUser, path: '/account', label: 'Project Account' },
    { icon: Info, path: '/project/info', label: 'Project Info' },
    { icon: Info, path: '/not', label: 'Notifications' },
    { icon: Headset, path: '/help', label: 'Help & Support' },
  ];




  const handleEvent = () => {
    if (eventName && eventDate && events.length < 3) {
      const newEvent = {
        name: eventName,
        date: eventDate,
      };
      setEvents([...events, newEvent]);
      setEventName('');
      setEventDate(new Date());
    } else if (events.length >= 3) {
      alert('You can only add up to 3 events.');
    } else {
      alert('Please enter an event name and select a date.');
    }
  };

  const pieData = [
  { name: 'Completed', value: 80 },
  { name: 'Pending', value: 40 },
  { name: 'In Review', value: 20 },
];

const COLORS = ['#6EE7B7', '#FCD34D', '#F87171'];

const myTeam = [
  {
    id: 1,
    tName: 'Tech-rex',
    admin: 'Asif',
    isCompleted: false
  },
  {
    id: 2,
    tName: 'Code Ninjas',
    admin: 'Neha',
    isCompleted: true
  },
  {
    id: 3,
    tName: 'AlgoWarriors',
    admin: 'Raj',
    isCompleted: false
  },
  {
    id: 4,
    tName: 'ByteForce',
    admin: 'Ishita',
    isCompleted: true
  },
  {
    id: 5,
    tName: 'Stack Hackers',
    admin: 'Aman',
    isCompleted: false
  },
  {
    id: 6,
    tName: 'Dev Drillers',
    admin: 'Nikita',
    isCompleted: true
  },
  {
    id: 7,
    tName: 'ScriptSquad',
    admin: 'Aditya',
    isCompleted: false
  },
  {
    id: 8,
    tName: 'UI Avengers',
    admin: 'Sana',
    isCompleted: true
  },
]


  return (
    <div className="w-full px-4 md:px-6 xl:px-12 2xl:px-25 mb-10 mt-4 space-y-8">
      {/* Hero Section */}
      <section className="relative py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg rounded-xl bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImgbg}
            alt="Background"
            className="w-full h-full object-cover opacity-60"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
            }}
          />
        </div>
        <div className="w-full md:w-1/2 z-10 text-white px-4 sm:px-6 md:px-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Hi {userName}!</h1>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={100}
            cursorColor="black"
            text="Welcome to justCrea8 Project Management"
            typeSpeed={50}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className={`flex flex-col sm:flex-row gap-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div className={`w-full md:w-2/3 xl:w-3/4 p-4 flex flex-col sm:flex-row items-center justify-between rounded-xl shadow-2xl border backdrop-blur-xl ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30' : 'bg-white/10'}`}>
          <div className="w-full sm:1/2">
            <h3 className="text-lg font-semibold mb-1 text-cyan-500 font-mono">Your Dashboard</h3>
            <p className="font-light text-sm">Track your projects and progress</p>
          </div>
          <div className="w-1/2 sm:w-1/2 md:w-1/3 mt-3 sm:mt-0 flex justify-between gap-4 md:gap-6 flex-wrap">
            {navItems.map(({ icon: Icon, path, label }, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `relative group rounded-full p-2 flex items-center justify-center sm:w-auto ${isActive ? 'bg-purple-300' : 'bg-slate-700'} hover:bg-purple-700`
                }
              >
                <Icon color="white" size={20} className="hover:animate-spin" />
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Create Project Card */}
        <div className={`w-full sm:w-1/3 xl:w-1/4 p-4 flex items-center justify-between rounded-xl shadow-2xl border backdrop-blur-xl ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30' : 'bg-white/10'}`}>
          <div>
            <h2 className="text-lg font-semibold text-cyan-500 font-mono">Create Project</h2>
            <p className="text-xs">Start building your ideas</p>
          </div>
          <button className="size-14 bg-black rounded-full hover:animate-spin flex items-center justify-center">
            <CirclePlus size={20} color="white" />
          </button>
        </div>
      </section>

      {/* Dashboard & Join Project */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className={`w-full md:w-2/3 xl:w-3/4 p-4 rounded-xl shadow-2xl border backdrop-blur-xl text-white ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30' : 'bg-white/10'}`}>
          <div className="flex w-full justify-center items-center">
            <h1 className="text-xl font-semibold mb-4 text-cyan-500 font-mono">Project Overview</h1>
           <NavLink to='./projects' className='ml-auto bg-gray-700 hover:bg-purple-900  p-3 text-sm rounded-lg'> Go to Your Projects</NavLink>
          </div>
          <div className="grid m-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Tasks" count={120} theme={theme} />
            <StatCard label="Completed Tasks" count={80} theme={theme} />
            <StatCard label="Pending Tasks" count={40} theme={theme} />
          </div>
          {joinBtnClicked && (
            <div className="mt-6 px-4">
              <TypeWriterEffect
                textStyle={{ fontFamily: 'Red Hat Display', fontSize: '16px' }}
                startDelay={100}
                cursorColor="cyan"
                text="You're joining as a team member. You won’t have admin rights initially."
                typeSpeed={50}
              />
            </div>
          )}
        </div>

        {/* Join Project */}
        <div className={`w-full md:w-1/3 xl:w-1/4 p-6 rounded-xl shadow-2xl border backdrop-blur-xl text-white ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30' : 'bg-white/10'}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-cyan-500 font-mono">Join Project</h1>
              <p className="text-sm">via Link</p>
            </div>
            <Button
              onClick={() => setJoinBtnClicked(!joinBtnClicked)}
              className="bg-purple-700 hover:bg-purple-900 h-10 px-4"
            >
              {joinBtnClicked ? 'Close' : 'Join'}
            </Button>
          </div>
          {joinBtnClicked && (
            <div className="mt-4 space-y-3">
              <Input
              autoComplete='false'
              
                placeholder="Enter Joining Link"
                value={joinProjectLink}
                onChange={(e) => setJoinProjectLink(e.target.value)}
              />
              <Input placeholder="Enter Project Password" type="password" />
              <Input placeholder="Enter Master Key" type="number" />
              <Button className="w-full mt-2 bg-purple-600 hover:bg-purple-800">
                Submit
              </Button>
            </div>
          )}
        </div>
      </section>

  <section
      className={`w-full flex flex-col gap-6 p-4 rounded-xl shadow-2xl border backdrop-blur-xl 
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-black to-gray-800 border-white/30 text-white' 
          : 'bg-white/10 text-black'}`}
    >
      <div>
        <h1 className="font-bold text-xl text-cyan-500 font-mono">Your Teams</h1>
      </div>

      <div className="w-full relative overflow-hidden px-12">
        <Carousel className="w-full">
          <CarouselContent>
            {myTeam.map((e) => (
              <CarouselItem
                key={e.id}
                className="basis-1/2 m-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Card className="w-60 ">
      <CardHeader>
        <CardTitle>{e.tName}</CardTitle>
        <CardDescription>Admin: {e.admin}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* you could put stats, avatars, etc. here */}
        <p>
          Status:{" "}
          <span
            className={
              e.isCompleted
                ? "text-green-600 font-semibold"
                : "text-yellow-600 font-semibold"
            }
          >
            {e.isCompleted ? "Completed" : "In Progress"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <button className="text-sm underline hover:no-underline">
          View
        </button>
      </CardFooter>
    </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>







{/* Charts Section */}
<section className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 rounded-xl shadow-2xl border backdrop-blur-xl ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30 text-white' : 'bg-white/10 text-black'}`}>
  {/* Area Chart */}
  <div className="w-full h-[300px]">
    <h3 className="text-lg font-semibold text-center mb-2">Project Progress (Area)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={[
        { name: 'Week 1', progress: 20 },
        { name: 'Week 2', progress: 40 },
        { name: 'Week 3', progress: 60 },
        { name: 'Week 4', progress: 80 },]}>
        <defs>
          <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="progress" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorProgress)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>

  {/* Bar Chart */}
  <div className="w-full h-[300px]">
    <h3 className="text-lg font-semibold text-center mb-2">Team Contributions (Bar)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={[{ name: 'Team A', tasks: 10 }, { name: 'Team B', tasks: 20 }, { name: 'Team C', tasks: 30 }]}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="tasks" fill="#60a5fa" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Pie Chart */}
  <div className="w-full h-[300px]">
    <h3 className="text-lg font-semibold text-center mb-2">Task Distribution (Pie)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</section>

<section className={`w-full  gap-6 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${theme === 'dark' ? 'bg-gradient-to-r from-black to-gray-800 border-white/30 text-white' : 'bg-white/10 text-black'}`}>
<div className="w-full items-center flex justify-between">
  <div className="">Wanna Learn More ? </div>
  <div className="">
   <NavLink to='/help'><Button>Go to help</Button></NavLink> 
  </div>
</div>
</section>


      {/* Add more UI sections like Testimonials, Events, FAQ, Charts, etc. here */}
    </div>
  );
}
