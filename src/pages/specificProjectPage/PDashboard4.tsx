// ProjectDashboard.tsx

import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CheckCircle, Edit, Plus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import { toast } from "sonner";

const COLORS = ["#06b6d4", "#f59e0b", "#10b981", "#ef4444"];

export default function ProjectDashboard({ projectDetails, projectId }) {
  const [projectData, setProjectData] = useState(projectDetails || {});
  const [editing, setEditing] = useState(false);
  const [editToday, setEditToday] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editWorkload, setEditWorkload] = useState(false);
  const [editPhase, setEditPhase] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [newWorkload, setNewWorkload] = useState({ name: "", tasks: "" });
  const [newPhase, setNewPhase] = useState({ name: "", value: "" });

  useEffect(() => {
    if (projectDetails) {
      setProjectData(projectDetails);
    }
  }, [projectDetails]);

  const updateArrayField = (type, index, field, value) => {
    const updated = [...(projectData?.[type] || [])];
    updated[index][field] = value;
    setProjectData((prev) => ({ ...prev, [type]: updated }));
  };

  const addToArrayField = (type, newItem) => {
    const updated = [...(projectData?.[type] || []), newItem];
    setProjectData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "projects", projectId), projectData);
      toast.success("✅ Project updated");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update project");
    }
  };

  if (!projectData || Object.keys(projectData).length === 0) return <div className="p-6">Loading project...</div>;

  const today = new Date();
  const endDate = new Date(projectData.endAt);
  const startDate = new Date(projectData.startAt);
  const totalDays = Math.max(1, (endDate - startDate) / (1000 * 60 * 60 * 24));
  const leftDays = Math.max(0, (endDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-500">🚀 Project Dashboard</h1>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          <Edit className="w-4 h-4 mr-2" />
          {editing ? "Done" : "Edit"}
        </Button>
      </header>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predict">Predict</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-6">
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
                  <>
                    <p>{today.toDateString()}</p>
                    <p className="text-sm text-gray-400">End Date: {endDate.toDateString()}</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <BarChart data={[
                        { name: "Time Left", value: leftDays },
                        { name: "Total Time", value: totalDays },
                      ]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-sm mt-2">{Math.ceil(leftDays)} days left</p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle size={20} /> Status
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditStatus(!editStatus)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editStatus ? (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={projectData.phaseProgress}
                      onChange={(e) =>
                        setProjectData((prev) => ({
                          ...prev,
                          phaseProgress: Number(e.target.value),
                        }))
                      }
                    />
                    <Select
                      value={projectData.status}
                      onValueChange={(val) =>
                        setProjectData((prev) => ({ ...prev, status: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <p>Status: <span className="text-yellow-500">{projectData.status}</span></p>
                    <p>Progress: {projectData.phaseProgress}%</p>
                    <Progress value={projectData.phaseProgress} className="mt-2" />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Workload */}
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle>👥 Team Workload</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditWorkload(!editWorkload)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editWorkload ? (
                  <>
                    {(projectData.workloadData || []).map((m, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <Input
                          value={m.name}
                          onChange={(e) => updateArrayField("workloadData", i, "name", e.target.value)}
                          className="w-1/2"
                        />
                        <Input
                          type="number"
                          value={m.tasks}
                          onChange={(e) => updateArrayField("workloadData", i, "tasks", +e.target.value)}
                          className="w-1/2"
                        />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input placeholder="Name" value={newWorkload.name} onChange={(e) => setNewWorkload({ ...newWorkload, name: e.target.value })} />
                      <Input placeholder="Tasks" type="number" value={newWorkload.tasks} onChange={(e) => setNewWorkload({ ...newWorkload, tasks: e.target.value })} />
                      <Button variant="ghost" onClick={() => addToArrayField("workloadData", { ...newWorkload, tasks: +newWorkload.tasks })}><Plus size={16} /></Button>
                    </div>
                  </>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={projectData.workloadData}>
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

          {/* Phase */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
            <Card>
              <CardHeader className="flex justify-between">
                <CardTitle>📊 Phase Distribution</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setEditPhase(!editPhase)}>
                  <Edit size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {editPhase ? (
                  <>
                    {(projectData.phaseData || []).map((p, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <Input value={p.name} onChange={(e) => updateArrayField("phaseData", i, "name", e.target.value)} className="w-1/2" />
                        <Input type="number" value={p.value} onChange={(e) => updateArrayField("phaseData", i, "value", +e.target.value)} className="w-1/2" />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input placeholder="Phase" value={newPhase.name} onChange={(e) => setNewPhase({ ...newPhase, name: e.target.value })} />
                      <Input placeholder="%" type="number" value={newPhase.value} onChange={(e) => setNewPhase({ ...newPhase, value: e.target.value })} />
                      <Button variant="ghost" onClick={() => addToArrayField("phaseData", { ...newPhase, value: +newPhase.value })}><Plus size={16} /></Button>
                    </div>
                  </>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={projectData.phaseData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                        {projectData.phaseData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {editing && (
            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} className="rounded-xl px-6">
                💾 Save Changes
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="predict">
          <p className="text-muted-foreground">Cost Estimator or AI module goes here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
