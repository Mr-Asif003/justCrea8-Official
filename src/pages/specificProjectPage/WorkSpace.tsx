import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, Users, Folder, CheckCircle, Settings, MessageCircle, LineChart, Timer, NotebookText } from "lucide-react";

export default function FuturisticWorkspaceScreen() {
  const tasks = [
    { title: "Design homepage", progress: 80 },
    { title: "Setup CI/CD", progress: 40 },
    { title: "Fix login bug", progress: 100 },
  ];

  const documents = ["Roadmap.pdf", "UI_Design.fig", "api_specs.json"];
  const team = ["Alice", "Bob", "Charlie"];

  const goals = [
    "Launch MVP by Friday",
    "Write unit tests",
    "Set up database backups",
    "Improve loading speed",
  ];

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Futuristic Workspace</h1>
        <Button variant="outline" className="border-cyan-400 text-cyan-400">
          <Settings size={16} className="mr-2" /> Settings
        </Button>
      </header>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <CalendarDays size={20} /> Today
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white">
                <p>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={20} /> Project Status
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white">
                <p>Status: <span className="text-yellow-400">Ongoing</span></p>
                <p>Completion: 65%</p>
                <Progress value={65} className="h-2 bg-gray-700 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Users size={20} /> Team
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white">
                <p>Members: {team.length}</p>
                <ul className="list-disc pl-4 mt-2">
                  {team.map((member, i) => <li key={i}>{member}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="space-y-4">
            {tasks.map((task, i) => (
              <Card key={i} className="bg-white/10 border border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-cyan-300">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={task.progress} className="h-2 bg-gray-700" />
                </CardContent>
              </Card>
            ))}
            <Button className="w-full mt-4">
              <Plus className="mr-2" /> Add New Task
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between bg-white/10 text-white p-3 rounded shadow">
                <span>{doc}</span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            ))}
            <Input placeholder="Upload new document" className="mt-4" />
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-2 text-white">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <ul className="list-disc pl-6">
              {team.map((member, i) => <li key={i}>{member}</li>)}
            </ul>
            <Input placeholder="Add new member" className="mt-4" />
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="bg-white/10 border border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <MessageCircle size={20} /> Team Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white h-32 overflow-y-auto">
              <p><strong>Alice:</strong> We're pushing to staging today.</p>
              <p><strong>Bob:</strong> Noted, testing in progress.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="bg-white/10 border border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-400">
                <NotebookText size={20} /> Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white space-y-1">
              {goals.map((goal, index) => <p key={index}>- {goal}</p>)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
