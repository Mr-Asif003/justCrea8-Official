import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { auth } from "@/Firebase/firebaseConfig";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import heroImgbg from "../../assets/images/heroImg4.jpg";
import {
  ChartNoAxesCombined,
  CirclePlus,
  Info,
  Headset,
  CircleUser,
  CreativeCommons,
  Plus,
  Cross,
  X,
  InfoIcon,
} from "lucide-react";
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
import TypeWriterEffect from "react-typewriter-effect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import StatCard from "@/components/ui/StatCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { arrayUnion, getDoc } from "firebase/firestore";
// dailog form
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { db } from "@/Firebase/firebaseConfig";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { set } from "date-fns";
import { toast } from "sonner";
import CreateTeam from "./teamWorkspace.tsx/CreateTeam";
import CreateTeamDialog from "./teamWorkspace.tsx/CreateTeamDailog";
import JoinDialog from "./teamWorkspace.tsx/JoinDailog";
export default function ProjectUserHome() {
  const { theme } = useTheme();
  const { userName } = useParams();
  const currentUser = auth?.currentUser;
  const currentUserUID = currentUser?.uid;
  const [eventDate, setEventDate] = useState(new Date());
  const [eventName, setEventName] = useState("");

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);

  const navItems = [
    { icon: CircleUser, path: "/account", label: "Account" },
    { icon: Info, path: "/project/info", label: "Info" },
    { icon: Info, path: "/notifications", label: "Notifications" },
    { icon: Headset, path: "/help", label: "Help" },
  ];

  const handleEvent = () => {
    if (!eventName) return alert("Provide an event name.");
    if (events.length >= 3) return alert("Max 3 events.");
    setEvents([...events, { name: eventName, date: eventDate }]);
    setEventName("");
    setEventDate(new Date());
  };

  const pieData = [
    { name: "Completed", value: 80 },
    { name: "Pending", value: 40 },
    { name: "In Review", value: 20 },
  ];
  const COLORS = ["#6EE7B7", "#FCD34D", "#F87171"];

  const myTeam = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    tName: [
      "Tech-rex",
      "Code Ninjas",
      "AlgoWarriors",
      "ByteForce",
      "Stack Hackers",
      "Dev Drillers",
      "ScriptSquad",
      "UI Avengers",
    ][i],
    admin: [
      "Asif",
      "Neha",
      "Raj",
      "Ishita",
      "Aman",
      "Nikita",
      "Aditya",
      "Sana",
    ][i],
    isCompleted: Math.random() > 0.5,
  }));

  return (
    <div className="w-full px-4 md:px-6 xl:px-12 2xl:px-25 mb-10 mt-4 space-y-8">
      {/* Hero */}
      <section className="relative py-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg rounded-xl bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImgbg}
            alt="Background"
            className="w-full h-full object-cover opacity-60"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 100%)",
            }}
          />
        </div>
        <div className="w-full md:w-1/2 z-10 text-white px-4 sm:px-6 md:px-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Hi {userName}!</h1>
          <TypeWriterEffect
            textStyle={{ fontFamily: "Red Hat Display" }}
            startDelay={100}
            cursorColor="black"
            text="Welcome to justCrea8 Project Management"
            typeSpeed={50}
          />
        </div>
      </section>

      {/* Nav & Create */}
      <section
        className={`flex flex-col sm:flex-row gap-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <div
          className={`w-full md:w-2/3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-black to-gray-800 border-white/30"
              : "bg-white/10"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2 text-cyan-500 font-mono">
            Your Dashboard
          </h3>
          <div className="flex justify-center gap-4">
            {navItems.map(({ icon: Icon, path, label }, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `group rounded-full p-2 ${
                    isActive ? "bg-purple-300" : "bg-slate-700"
                  } hover:bg-purple-700`
                }
              >
                <Icon
                  color="white"
                  size={20}
                  className="group-hover:animate-spin"
                />
                <span className="sr-only">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div
          className={`w-full md:w-1/3 p-4 flex items-center justify-between rounded-xl shadow-2xl border backdrop-blur-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-black to-gray-800 border-white/30"
              : "bg-white/10"
          }`}
        >
          <div>
            <h2 className="text-lg font-semibold text-cyan-500 font-mono">
              Create Team
            </h2>
            <p className="text-xs">Start building your ideas</p>
          </div>
          <button
            onClick={() => setOpenCreateDialog(!openCreateDialog)}
            className="bg-black rounded-full hover:animate-spin flex items-center justify-center p-3"
          >
            <CirclePlus size={24} color="white" />
          </button>
        </div>
      </section>

      {/* dialog Create Team */}
      <section className="z-10 mx-auto w-full">
        <CreateTeamDialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        />
      </section>

      {/* Overview & Join */}
      <section className="flex flex-col md:flex-row gap-4">
        <div
          className={`w-full md:w-2/3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white"
              : "bg-white/10 text-black"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4 text-cyan-500 font-mono">
            Project Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Tasks" count={120} theme={theme} />
            <StatCard label="Completed Tasks" count={80} theme={theme} />
            <StatCard label="Pending Tasks" count={40} theme={theme} />
          </div>
        </div>
        <div
          className={`w-full h-48 md:w-1/3 p-6 rounded-xl shadow-2xl border backdrop-blur-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white"
              : "bg-white/10 text-black"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className=" flex flex-col justify-center items-start">
              <h1 className="text-xl font-semibold text-cyan-500 font-mono">
                Join Team
              </h1>
              <p className="text-xs">Start contributing with existing teams</p>
            </div>
            <button
              onClick={() => setOpenJoinDialog(!openJoinDialog)}
              className="bg-black rounded-full hover:animate-spin spin- flex items-center justify-center p-3"
            >
              <CirclePlus size={24} color="white" />
            </button>
          </div>
        </div>
      </section>
      {/* dialog Join Team */}

      <section className="z-10 mx-auto w-full">
        <JoinDialog
          open={openJoinDialog}
          onClose={() => setOpenJoinDialog(false)}
        />
      </section>


      {/* Teams Carousel */}
      <section
        className={`p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
          theme === "dark"
            ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white"
            : "bg-white/10 text-black"
        }`}
      >
        <div className="flex justify-between items-center ">
          <h3 className="text-xl font-bold text-cyan-500 font-mono mb-4">
            Your Teams
          </h3>
          {/* <button onClick={()=>setCreateTeam(!createTeam)} className='flex justify-between items-center gap-4  text-cyan-500 font-serif text-xl'>
        Create Team
            {createTeam ? <X size={20} className="text-cyan-500" /> : <Cross size={20} className="text-cyan-500" />}
       </button> */}
        </div>

        <Carousel className="overflow-visible">
          <CarouselContent>
            {myTeam.map((e) => (
              <CarouselItem
                key={e.id}
                className="basis-1/2 m-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-semibold">{e.tName}</CardTitle>
                    <CardDescription>Admin: {e.admin}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Status:{" "}
                      <span
                        className={
                          e.isCompleted ? "text-green-600" : "text-yellow-600"
                        }
                      >
                        {e.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="link">View</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Charts */}
      <section
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 rounded-xl shadow-2xl border backdrop-blur-xl ${
          theme === "dark"
            ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white"
            : "bg-white/10 text-black"
        }`}
      >
        <div className="h-[300px]">
          <h3 className="text-center font-semibold mb-2">
            Project Progress (Area)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { name: "W1", progress: 20 },
                { name: "W2", progress: 40 },
                { name: "W3", progress: 60 },
                { name: "W4", progress: 80 },
              ]}
            >
              <defs>
                <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#8b5cf6"
                fill="url(#colorProg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-center font-semibold mb-2">
            Team Contributions (Bar)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: "Team A", tasks: 10 },
                { name: "Team B", tasks: 20 },
                { name: "Team C", tasks: 30 },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h3 className="text-center font-semibold mb-2">
            Task Distribution (Pie)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value" // ✅ add this
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* FAQ & Testimonials */}

      {/* Add your Events */}
      <section>
        <h3 className="text-xl font-semibold text-cyan-500 mb-2">
          Schedule Events
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Input
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Calendar
            mode="single"
            selected={eventDate}
            onSelect={setEventDate}
          />
          <Button onClick={handleEvent}>Add Event</Button>
        </div>
        {events.length > 0 && (
          <ul className="mt-4 space-y-2">
            {events.map((ev, i) => (
              <li key={i}>
                📅 {ev.name} on {ev.date.toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
