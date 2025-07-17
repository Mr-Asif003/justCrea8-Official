import React from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext';
import TypeWriterEffect from 'react-typewriter-effect';
import {
  AlignEndVertical,
  BarChart,
  Users,
  CheckCircle,
  Layers,
  Plus,
  Share,
  MessageCircle,
} from 'lucide-react';
import EraLogoComponent from '../projectPages/EraLogoComponent';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Countdown from '../../components/projectSpecificComponents/Countdown';
import ProjectTabs from '@/components/projectSpecificComponents/ProjectTabs';

export default function Project() {
  const { userName } = useParams();
  const location = useLocation();
  const { theme } = useTheme();
  const { projectId } = location.state || {};
 
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
 

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background text-foreground">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-cyan-900 to-gray-900 rounded-xl shadow-md p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">🚀 Project Name</h1>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display', fontSize: '16px' }}
            startDelay={200}
            cursorColor="white"
            text="Welcome to justCrea8 Project Management"
            typeSpeed={90}
          />
          <div className="mt-6 text-gray-400 text-sm flex gap-6">
            <p>🕓 Created: 2024-06-01</p>
            <p>📅 Ends: 2025-06-30</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-cyan-800 text-white w-32 h-16 flex items-center justify-center text-lg rounded-lg">
            LOGO
          </div>
          <div className="text-sm text-cyan-300">
            <p>👤 Admin: <strong>Alice</strong></p>
            <p>🧑‍💼 Project Manager: <strong>Bob</strong></p>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            <p>🔗 Project Link: /projects/{projectId}</p>
            <p>🔒 Master Key: only admin & PM</p>
          </div>
        </div>
      </section>

      {/* AI & Project Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="border border-indigo-700 bg-indigo-950 rounded-lg p-4 flex flex-col justify-between shadow-md text-white">
    <div className="mb-2 text-indigo-400 font-semibold text-sm">💡 Daily Tip</div>
    <p className="text-sm">
      {[
        "Break your project into weekly milestones.",
        "Use labels to organize tasks better.",
        "Schedule team reviews every Friday.",
        "Update status before standups.",
        "Use clear commit messages!"
      ][new Date().getDate() % 5]}
    </p>
    <div className="text-xs text-right text-indigo-300 mt-2">auto-rotates daily</div>
  </div>

        <div className="border border-yellow-600  rounded-lg p-4 flex justify-between items-center shadow-md">
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

      {/* Team Avatars & Metrics */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white space-y-6">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-cyan-400">Team Members</h3>
          <div className="flex gap-3">
            {team.map((member) => (
              <Avatar key={member.name} className="border-2 border-cyan-500">
                <AvatarImage src={member.img} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* Project Progress and Countdown */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-5 rounded-lg shadow-md text-white">
          <h3 className="text-lg font-semibold mb-2">📈 Project Progress</h3>
          <Progress value={72} className="h-4" />
          <p className="text-sm text-gray-400 mt-2">72% Completed</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg shadow-md text-white">
          <h3 className="text-lg font-semibold mb-2">⏳ Countdown to Deadline</h3>
          <Countdown deadline="2025-06-30T23:59:59" />
        </div>
      </section>

      {/* Project Tabs (Overview, Timeline, Team, etc.) */}
      <section className="bg-slate-900 rounded-xl p-6 shadow-md">
        <ProjectTabs />
      </section>
    </div>
  );
}
