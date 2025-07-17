import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Trash2Icon, PlusIcon, TimerIcon, FlagIcon, CheckIcon, Edit, Delete, DeleteIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const priorities = {
  High: 'border-red-500',
  Medium: 'border-yellow-400',
  Low: 'border-green-500',
  None: 'border-cyan-400',
};

const teamMembers = ['Alice', 'Bob', 'Dev Team', 'QA Group'];

const initialTasks = [
  {
    id: 1,
    title: 'Create Project Brief',
    description: 'Outline scope and goals for client onboarding.',
    assignee: 'Alice',
    assignedBy: 'Bob',
    priority: 'High',
    start: '2025-06-10T08:00',
    end: '2025-06-14T18:00',
    completed: false,
    penalty: 0,
  },
];



const getProgress = (start, end) => {
  const now = new Date();
  const total = new Date(end) - new Date(start);
  const elapsed = now - new Date(start);
  const percent = Math.min((elapsed / total) * 100, 100);
  return isNaN(percent) ? 0 : percent;
};

const getCountdown = (end) => {
  const now = new Date();
  const deadline = new Date(end);
  const diff = deadline - now;
  if (diff <= 0) return '⏰ 0h 0m';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `⏳ ${hours}h ${minutes}m`;
};


export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    assignedBy: '',
    priority: 'None',
    start: '',
    end: '',
    penalty: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tick, setTick] = useState(Date.now());


  const initialRoadmap = [
  { id: 1, milestone: "Initial Planning", description: "Define scope and objectives", completed: true },
  { id: 2, milestone: "Design Phase", description: "UI/UX mockups and approval", completed: false },
  { id: 3, milestone: "Development", description: "Build core functionalities", completed: false },
  { id: 4, milestone: "Testing & QA", description: "Ensure quality and performance", completed: false },
  { id: 5, milestone: "Launch", description: "Go live with the product", completed: false },
];
  const [roadmap, setRoadmap] = useState(initialRoadmap);
 const [editGoalBtn,setEditGoalBtn]=useState(false)
 const [goal,setGoal]=useState('')
 const [desc,setDesc]=useState('')
 const [deadline,setdeadline]=useState('')


const handleGoalSubmit=()=>{

const newgoal={ id:6, milestone:goal, description:desc, completed: false }
initialRoadmap.push(newgoal)
setRoadmap(initialRoadmap)

}
const deleteGoal=(id)=>{
  const ir=initialRoadmap.filter((e)=>e.id!=id)
 setRoadmap(ir)
}

  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrSave = () => {
    if (!form.title || !form.assignee || !form.assignedBy || !form.start || !form.end) return;
    const updated = {
      ...form,
      id: editingId ?? Date.now(),
      completed: false,
    };
    setTasks((prev) =>
      editingId ? prev.map((t) => (t.id === editingId ? updated : t)) : [...prev, updated]
    );
    setEditingId(null);
    setForm({ title: '', description: '', assignee: '', assignedBy: '', priority: 'None', start: '', end: '', penalty: '' });
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({ ...task });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleMilestone = (id) => {
    setRoadmap((prev) => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const teamData = [
    {
      id: 1,
      name: "Asif Khan",
      role: "Backend Developer",
      credits: 120,
      penalties: 20,
      tasks: { completed: 10, pending: 2 },
      status: "Active"
    },
    {
      id: 2,
      name: "Fatima Noor",
      role: "UI Designer",
      credits: 150,
      penalties: 0,
      tasks: { completed: 15, pending: 0 },
      status: "Active"
    },
    {
      id: 3,
      name: "Zaid Ali",
      role: "QA Engineer",
      credits: 90,
      penalties: 10,
      tasks: { completed: 5, pending: 4 },
      status: "Pending"
    }
  ];

  return (
    <div className="min-h-screen px-4 py-8 md:px-10 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-cyan-600">📋 JustCrea8 Task Dashboard</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" /> {showForm ? 'Close Form' : 'Add Task'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>{editingId ? '✏️ Edit Task' : '➕ New Task'}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input name="title" placeholder="Task Title" value={form.title} onChange={handleInput} />
            <Textarea name="description" placeholder="Description" value={form.description} onChange={handleInput} />
            <select name="assignee" value={form.assignee} onChange={handleInput} className="p-2 rounded border bg-transparent text-black dark:text-cyan-400 ">
              <option value="">Assign To</option>
              {teamMembers.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select name="assignedBy" value={form.assignedBy} onChange={handleInput} className="p-2 rounded border bg-transparent text-black dark:text-cyan-400">
              <option value="">Assigned By</option>
              {teamMembers.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select name="priority" value={form.priority} onChange={handleInput} className="p-2 rounded border bg-transparent text-black dark:text-cyan-400">
              {Object.keys(priorities).map((p) => <option key={p}>{p}</option>)}
            </select>
            <Input type="datetime-local" name="start" value={form.start} onChange={handleInput} />
            <Input type="datetime-local" name="end" value={form.end} onChange={handleInput} />
            <Input type="number" name="penalty" placeholder="Penalty (if overdue)" value={form.penalty} onChange={handleInput} />
            <Button onClick={handleAddOrSave} className="col-span-full">
              {editingId ? '💾 Save Task' : '➕ Add Task'}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {tasks.map((task) => {
          const progress = getProgress(task.start, task.end);
          const overdue = new Date(task.end) < new Date();
          const countdown = getCountdown(task.end);

          return (
            <Card key={task.id} className={`shadow-lg border-l-4 ${priorities[task.priority]}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <div className="space-x-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(task)}>✏️</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(task.id)}><Trash2Icon className="w-4 h-4 text-red-500" /></Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                <p className="text-sm">👤 To: <span className="text-cyan-500">{task.assignee}</span></p>
                <p className="text-sm">🧑‍💼 By: <span className="text-pink-500">{task.assignedBy}</span></p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" /> {task.start} → {task.end}
                </p>
                <Progress value={progress} className="mt-3" />
                <p className="text-xs mt-2 flex items-center gap-1 text-amber-500">
                  <TimerIcon className="w-4 h-4" /> {countdown}
                </p>
                {overdue && (
                  <p className="text-xs text-red-500 mt-2">
                    ⚠️ Task overdue - Penalty applies {task.penalty && `(${task.penalty})`}
                  </p>
                )}
                <p className="text-sm mt-3">Priority: <span className="font-semibold">{task.priority}</span></p>
              </CardContent>
            </Card>
          );
        })}
      </div>

 <Card className="p-6 shadow-sm mb-8 rounded-xl bg-white dark:bg-zinc-900">
  <CardHeader>
    <div className="flex justify-between items-center">
      <CardTitle className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        🗺️ Project Goal
      </CardTitle>
      <button
        onClick={() => setEditGoalBtn(!editGoalBtn)}
        className="text-sm text-zinc-500 hover:text-cyan-600 transition"
      >
        {editGoalBtn ? '✖ Cancel' : <Edit className="h-4 w-4" />}
      </button>
    </div>
  </CardHeader>

  <CardContent className="mt-4 space-y-6">
    {editGoalBtn && (
      <section className='flex flex-col gap-2'>
  <div>
    <Label htmlFor="goalTitle" className="text-sm text-zinc-500 mb-1 block">
      Goal Title
    </Label>
    <Input
      id="goalTitle"
     onChange={(e)=>setGoal(e.target.value)}
      placeholder="Enter your project goal..."
      className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm"
    />
  </div>

  <div>
    <Label htmlFor="goalDesc" className="text-sm text-zinc-500 mb-1 block">
      Description
    </Label>
    <Textarea
      id="goalDesc"
      value={desc}
      onChange={(e)=>setDesc(e.target.value)}
      rows={3}
      placeholder="Brief description of the goal..."
      className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm"
    />
  </div>

  <div>
    <Label htmlFor="goalTime" className="text-sm text-zinc-500 mb-1 block">
      Deadline Time
    </Label>
    <Input
      id="goalTime"
      type="time"
      onChange={(e)=>setdeadline(e.target.value)}
      className="px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm"
    />
  </div>

  <div className="flex justify-end">
    <Button
      type="submit"
      onClick={handleGoalSubmit}
      className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2 text-sm rounded-md"
    >
      Save Goal
    </Button>
  </div>
  </section>


    )}

    <ul className="space-y-4">
      {roadmap.map((milestone) => (
        <li
          key={milestone.id}
          className="flex items-start justify-between p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
        >
          <div>
            <p className="font-medium text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <FlagIcon className="w-4 h-4 text-cyan-600" />
              {milestone.milestone}
            </p>
            <p className="text-sm text-zinc-500 mt-1">{milestone.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
            size="sm"
            variant="ghost"
            onClick={() => toggleMilestone(milestone.id)}
            className="text-xs text-zinc-600 hover:text-green-600"
          >
            {milestone.completed ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              'Mark Done'
            )}
          </Button>
            <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteGoal(milestone.id)}
            className="text-xs text-zinc-600 hover:text-green-600"
          >
            <DeleteIcon/>
           
          </Button>
          </div>

        </li>
      ))}
    </ul>
  </CardContent>
</Card>


    
    </div>
  );
}
