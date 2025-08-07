import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { auth } from "@/Firebase/firebaseConfig";
import { useTheme } from "@/contexts/ThemeContext";

// ShadCN UI
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom UI Components
import StatCard from "@/components/ui/StatCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQAccordion from "@/components/ui/FAQAccordion";

// Firebase
import { db } from "@/Firebase/firebaseConfig";
import { collection, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";

// Assets
import heroImgbg from "../../assets/images/heroImg4.jpg";

// Icons
import {
  CircleUser,
  Info,
  Headset,
  CirclePlus,
} from "lucide-react";

// Typewriter Effect
import TypeWriterEffect from "react-typewriter-effect";

// Dialogs
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
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const navigate = useNavigate();

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
              maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
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

      {/* Navigation & Create Team */}
      <section className={`flex flex-col sm:flex-row gap-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
        <div className={`w-full md:w-2/3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-800 border-white/30" : "bg-white/10"}`}>
          <h3 className="text-lg font-semibold mb-2 text-cyan-500 font-mono">Your Dashboard</h3>
          <div className="flex justify-center gap-4">
            {navItems.map(({ icon: Icon, path, label }, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) => `group rounded-full p-2 ${isActive ? "bg-purple-300" : "bg-slate-700"} hover:bg-purple-700`}
              >
                <Icon color="white" size={20} className="group-hover:animate-spin" />
                <span className="sr-only">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className={`w-full md:w-1/3 p-4 flex items-center justify-between rounded-xl shadow-2xl border backdrop-blur-xl ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-800 border-white/30" : "bg-white/10"}`}>
          <div>
            <h2 className="text-lg font-semibold text-cyan-500 font-mono">Create Team</h2>
            <p className="text-xs">Start building your ideas</p>
          </div>
          <button onClick={() => setOpenCreateDialog(true)} className="bg-black rounded-full hover:animate-spin flex items-center justify-center p-3">
            <CirclePlus size={24} color="white" />
          </button>
        </div>
      </section>

      {/* Create Team Dialog */}
      <CreateTeamDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />

      {/* Project Overview & Join Team */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className={`w-full md:w-2/3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white" : "bg-white/10 text-black"}`}>
          <h3 className="text-xl font-semibold mb-4 text-cyan-500 font-mono">Project Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Tasks" count={120} theme={theme} />
            <StatCard label="Completed Tasks" count={80} theme={theme} />
            <StatCard label="Pending Tasks" count={40} theme={theme} />
          </div>
        </div>

        <div className={`w-full h-48 md:w-1/3 p-6 rounded-xl shadow-2xl border backdrop-blur-xl ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-800 border-white/30 text-white" : "bg-white/10 text-black"}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl font-semibold text-cyan-500 font-mono">Join Team</h1>
              <p className="text-xs">Start contributing with existing teams</p>
            </div>
            <button onClick={() => setOpenJoinDialog(true)} className="bg-black rounded-full hover:animate-spin flex items-center justify-center p-3">
              <CirclePlus size={24} color="white" />
            </button>
          </div>
        </div>
      </section>

      {/* Join Team Dialog */}
      <JoinDialog open={openJoinDialog} onClose={() => setOpenJoinDialog(false)} />

      {/* Event Scheduler */}
      <section>
        <h3 className="text-xl font-semibold text-cyan-500 mb-2">Schedule Events</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <Calendar mode="single" selected={eventDate} onSelect={setEventDate} />
          <Button onClick={handleEvent}>Add Event</Button>
        </div>
        {events.length > 0 && (
          <ul className="mt-4 space-y-2">
            {events.map((ev, i) => (
              <li key={i}>📅 {ev.name} on {ev.date.toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Add more sections like Testimonials, FAQAccordion etc. */}
    </div>
  );
}
