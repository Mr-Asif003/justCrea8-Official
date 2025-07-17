import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CheckCircle,
  MessageCircle,
  Edit,
  NotebookText,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import TimelineScreen from "./TimelineScreen";
import CostEstimator from "./PredictCost";

const COLORS = ["#06b6d4", "#f59e0b", "#10b981", "#ef4444"];

export default function ProjectDashboard() {
  const [editing, setEditing] = useState(false);
  const [editToday, setEditToday] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("Ongoing");
  const [phaseProgress, setPhaseProgress] = useState(65);
  const [showProjectStatus, setShowProjectStatus] = useState(false);
  const [editPhaseDist, setEditPhaseDist] = useState(false);
  const [editTaskProgress, setEditTaskProgress] = useState(false);
  const [editWorkload, setEditWorkload] = useState(false);
  const [milestones, setMilestones] = useState([
    "Initial Brief",
    "Prototype Release",
    "Client Review",
  ]);
  const [newMilestone, setNewMilestone] = useState("");
  const [documents] = useState(["Roadmap.pdf", "UI_Design.fig", "api_specs.json"]);
  const [team] = useState(["Alice", "Bob", "Charlie"]);
  const [goals] = useState([
    "Launch MVP by Friday",
    "Write unit tests",
    "Set up database backups",
    "Improve loading speed",
  ]);
  const [phaseData, setPhaseData] = useState([
    { name: "Planning", value: 20 },
    { name: "Development", value: 40 },
    { name: "Testing", value: 25 },
    { name: "Launch", value: 15 },
  ]);
  const [performanceData, setPerformanceData] = useState([
    { name: "Dev Team", completed: 10 },
    { name: "QA Team", completed: 7 },
    { name: "Design", completed: 12 },
    { name: "PM", completed: 4 },
  ]);
  const [workloadData, setWorkloadData] = useState([
    { name: "Alice", tasks: 8 },
    { name: "Bob", tasks: 12 },
    { name: "Charlie", tasks: 5 },
  ]);

  const handlePhaseDataChange = (index, field, value) => {
    const updated = [...phaseData];
    updated[index][field] = value;
    setPhaseData(updated);
  };

  const handlePerformanceChange = (index, field, value) => {
    const updated = [...performanceData];
    updated[index][field] = value;
    setPerformanceData(updated);
  };

  const handleWorkloadChange = (index, field, value) => {
    const updated = [...workloadData];
    updated[index][field] = value;
    setWorkloadData(updated);
  };

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, newMilestone]);
      setNewMilestone("");
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-background text-foreground">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-500">🚀 Project Dashboard</h1>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          <Settings className="w-4 h-4 mr-2" />
          {editing ? "Done" : "Edit"}
        </Button>
      </header>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          
          <TabsTrigger value="predict">Predict</TabsTrigger>
          
         <TabsTrigger value="subteams">Subteams</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-500">
                  <CalendarDays size={20} /> Today
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditToday(!editToday)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editToday ? (
                  <Input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
                ) : (
                  <p>
                    {customDate
                      ? new Date(customDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Project Status */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle size={20} /> Project Status
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setShowProjectStatus(!showProjectStatus)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {showProjectStatus && (
                  <div className="space-y-2 mb-3">
                    <Input
                      type="number"
                      value={phaseProgress}
                      onChange={(e) => setPhaseProgress(Number(e.target.value))}
                    />
                    <Select onValueChange={(val) => setProjectStatus(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <p>Status: <span className="text-yellow-500">{projectStatus}</span></p>
                <p>Completion: {phaseProgress}%</p>
                <Progress value={phaseProgress} className="mt-2" />
              </CardContent>
            </Card>

            {/* Team Workload */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle>👥 Team Workload</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditWorkload(!editWorkload)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editWorkload ? (
                  workloadData.map((member, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <Input
                        className="w-1/2"
                        value={member.name}
                        onChange={(e) => handleWorkloadChange(i, "name", e.target.value)}
                      />
                      <Input
                        className="w-1/2"
                        type="number"
                        value={member.tasks}
                        onChange={(e) => handleWorkloadChange(i, "tasks", +e.target.value)}
                      />
                    </div>
                  ))
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={workloadData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="tasks" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Phase Distribution */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle>📊 Phase Distribution</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditPhaseDist(!editPhaseDist)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editPhaseDist ? (
                  phaseData.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input
                        className="w-1/2"
                        value={item.name}
                        onChange={(e) => handlePhaseDataChange(i, "name", e.target.value)}
                      />
                      <Input
                        className="w-1/2"
                        type="number"
                        value={item.value}
                        onChange={(e) => handlePhaseDataChange(i, "value", +e.target.value)}
                      />
                    </div>
                  ))
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={phaseData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                        {phaseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

      
         
          </div>
        </TabsContent>

        {/* Cost Estimator...*/}
        <TabsContent value="predict">
          <CostEstimator />
        </TabsContent>



    
        {/* Subteams */}
        <TabsContent value="subteams">
          <div className="space-y-2">
            <h1>Coming soon ....</h1>
          </div>
        </TabsContent>
      
      </Tabs>
    </div>
  );
}
