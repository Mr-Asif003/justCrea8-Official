import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import TypeWriterEffect from 'react-typewriter-effect';
import {
  Layers,
  CheckCircle,
  Users,
  Sparkles,
  Zap,
  Trophy
} from 'lucide-react';

import EraLogoComponent from '../projectPages/EraLogoComponent';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Countdown from '../../components/projectSpecificComponents/Countdown';
import ProjectTabs from '@/components/projectSpecificComponents/ProjectTabs';
import { motion } from 'framer-motion';
import { ProjectTimeline } from '@/components/project/ProjectTimeline';
import { ProjectTasks } from '@/components/project/ProjectTasks';
import { ProjectInfo } from '@/components/project/ProjectInfo';
import { auth } from '@/Firebase/firebaseConfig';

export default function Project({projectDetails}) {

  const location = useLocation();
  const { theme } = useTheme();
  const { projectId } = location.state || {};
  console.log(projectDetails,'sflksjf')
  const user=auth.currentUser.uid

  const metrics = [
    { label: "Tasks", value: 124, icon: <Layers className="text-cyan-400" /> },
    { label: "Completed", value: 89, icon: <CheckCircle className="text-green-400" /> },
    { label: "Team Members", value: 6, icon: <Users className="text-yellow-400" /> },
  ];

  const team = [
    { name: "Alice", img: "https://i.pravatar.cc/100?u=1" },
    { name: "Bob", img: "https://i.pravatar.cc/100?u=2" },
    { name: "Carol", img: "https://i.pravatar.cc/100?u=3" },
  ];

  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: 20, y: 30 },
    { icon: Zap, delay: 1, x: 80, y: 60 },
    { icon: Users, delay: 2, x: 15, y: 80 },
    { icon: Trophy, delay: 3, x: 85, y: 20 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 min-h-screen bg-background text-foreground">
      {/* Welcome Header */}
      <section className="relative overflow-hidden rounded-xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-br border border-sky-400 shadow-md shadow-purple-500">

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none z-0"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <item.icon className="h-8 w-8 text-cyan-400/40" />
          </motion.div>
        ))}

        {/* Foreground Content */}
        <div className="relative z-10 flex-1">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">🚀 {projectDetails.projectName}</h1>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display', fontSize: '16px' }}
            startDelay={200}
            cursorColor="white"
            text={projectDetails.description}
            typeSpeed={90}
          />
          <div className="mt-6 text-gray-400 text-sm flex flex-col sm:flex-row gap-4">
            <p>🕓 Created:{projectDetails.startAt}</p>
            <p>📅 Ends: {projectDetails.endAt}</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="bg-cyan-800 text-white w-28 h-16 flex items-center justify-center text-lg rounded-lg">
            LOGO
          </div>
          <div className="text-sm text-cyan-300 text-center">
            <p>👤 Admin: <strong>{projectDetails.teamAdmin.name}</strong></p>
            <p>🧑‍💼 Project Manager: <strong>{projectDetails.projectManager.name}</strong></p>
          </div>
        </div>
      </section>
          <div className="text-xs text-gray-400 mt-2 text-center px-[30%]">
            <p className='text-xl bg-transparent border-b-2 border-orange-500 p-4'>🔗 Project Link: {projectDetails.projectId}</p>
            {user==projectDetails.teamAdmin.uid||user==projectDetails.projectManager.uid&&(
            <p>🔒 Master Key: {projectDetails.password}</p>

            )}
          </div>

      {/* AI Tips & Controls */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-indigo-700 bg-indigo-950 rounded-lg p-4 flex flex-col justify-between shadow-md text-white">
          <div className="mb-2 text-indigo-400 font-semibold text-sm">💡 Daily Tip</div>
          <p className="text-sm">
            {[ "Break your project into weekly milestones.",
              "Use labels to organize tasks better.",
              "Schedule team reviews every Friday.",
              "Update status before standups.",
              "Use clear commit messages!"
            ][new Date().getDate() % 5]}
          </p>
          <div className="text-xs text-right text-indigo-300 mt-2">auto-rotates daily</div>
        </div>

        <div className="border border-yellow-600 rounded-lg p-4 flex justify-between items-center shadow-md">
          <TypeWriterEffect
            textStyle={{ fontSize: '14px', color: 'yellow' }}
            startDelay={200}
            cursorColor="white"
            text="AI Copilot is standing by..."
            typeSpeed={85}
          />
          <EraLogoComponent size={36} />
        </div>

        <div className="border border-red-700 text-red-700 rounded-lg p-4 flex justify-between items-center shadow-md">
          <TypeWriterEffect
            textStyle={{ fontSize: '14px', color: 'red' }}
            startDelay={200}
            cursorColor="white"
            text="Project End Trigger"
            typeSpeed={85}
          />
          <Button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
            End Project
          </Button>
        </div>
      </section>

      {/* Project Tabs */}
      <section className="bg-slate-900 rounded-xl p-6 shadow-md">
        <ProjectTabs />
      </section>

      {/* Timeline */}
      <section>
        <ProjectTimeline timelines={projectDetails?.timelines||[]} />
      </section>

      {/* Tasks and Info - Responsive */}
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-2/3">
          <ProjectTasks tasks={projectDetails.tasks} />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <ProjectInfo  pd={projectDetails}/>
          <Countdown />
        </div>
      </section>

      {/* Team Members & Stats */}
      <section className="bg-gradient-to-br border border-cyan-500/30 rounded-xl p-6 text-white space-y-6">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-cyan-400">Team Members</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {team.map((member) => (
              <Avatar key={member.name} className="border-2 border-cyan-500">
                <AvatarImage src={member.img} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-3 bg-slate-700/30 p-4 rounded-lg border border-white/20"
            >
              {metric.icon}
              <div>
                <p className="text-sm text-gray-300">{metric.label}</p>
                <p className="text-lg font-semibold text-white">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
