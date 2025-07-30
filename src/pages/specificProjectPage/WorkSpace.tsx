import React, { useEffect, useState } from 'react';
import { 
  Settings, 
  GitBranch, 
  Code2, 
  Shield, 
  Users, 
  FileText, 
  Calendar,
  Target,
  Zap,
  CheckCircle,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import TimelineScreen from './TimelineScreen';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/Firebase/firebaseConfig';
import { ButtonGroup } from '@mui/material';
interface SDLCPhase {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  progress: number;
  tasks: string[];
  deliverables: string[];
  estimatedDays: number;
  actualDays?: number;
}

interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
  category: 'coding' | 'design' | 'testing' | 'deployment' | 'security';
  implemented: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const Workspace = ({projectDetails}) => {
  const [sdlcPhases, setSDLCPhases] = useState<SDLCPhase[]>([
    {
      id: '1',
      name: 'Requirements Analysis',
      description: 'Gather and document project requirements',
      status: 'completed',
      progress: 100,
      tasks: ['Stakeholder interviews', 'Requirements documentation', 'Acceptance criteria'],
      deliverables: ['Requirements Document', 'User Stories', 'Acceptance Criteria'],
      estimatedDays: 10,
      actualDays: 8
    },
    {
      id: '2',
      name: 'System Design',
      description: 'Design system architecture and components',
      status: 'in-progress',
      progress: 75,
      tasks: ['Architecture design', 'Database design', 'API specification'],
      deliverables: ['System Architecture', 'Database Schema', 'API Documentation'],
      estimatedDays: 15,
      actualDays: 12
    },
    {
      id: '3',
      name: 'Implementation',
      description: 'Code development and feature implementation',
      status: 'in-progress',
      progress: 45,
      tasks: ['Frontend development', 'Backend development', 'Integration'],
      deliverables: ['Source Code', 'Unit Tests', 'Integration Tests'],
      estimatedDays: 30
    },
    {
      id: '4',
      name: 'Testing',
      description: 'Comprehensive testing and quality assurance',
      status: 'not-started',
      progress: 0,
      tasks: ['Unit testing', 'Integration testing', 'User acceptance testing'],
      deliverables: ['Test Plans', 'Test Reports', 'Bug Reports'],
      estimatedDays: 12
    },
    {
      id: '5',
      name: 'Deployment',
      description: 'Deploy to production environment',
      status: 'not-started',
      progress: 0,
      tasks: ['Environment setup', 'Deployment scripts', 'Go-live'],
      deliverables: ['Deployment Guide', 'Production Environment', 'Monitoring Setup'],
      estimatedDays: 5
    }
  ]);

  const [engineeringPrinciples, setEngineeringPrinciples] = useState<EngineeringPrinciple[]>([
    {
      id: '1',
      title: 'Code Review Process',
      description: 'All code changes must be reviewed by at least one other developer',
      category: 'coding',
      implemented: true,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Test-Driven Development',
      description: 'Write tests before implementing features',
      category: 'testing',
      implemented: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Continuous Integration',
      description: 'Automated build and test pipeline for all commits',
      category: 'deployment',
      implemented: true,
      priority: 'high'
    },
    {
      id: '4',
      title: 'Security First Approach',
      description: 'Security considerations in every design decision',
      category: 'security',
      implemented: false,
      priority: 'critical'
    },
    {
      id: '5',
      title: 'Clean Code Standards',
      description: 'Follow consistent coding standards and best practices',
      category: 'coding',
      implemented: true,
      priority: 'medium'
    }
  ]);

  const [showCreatePhase, setShowCreatePhase] = useState(false);
  const [showCreatePrinciple, setShowCreatePrinciple] = useState(false);
  const [newPhase, setNewPhase] = useState({
    name: '',
    description: '',
    estimatedDays: 0,
    tasks: '',
    deliverables: ''
  });
  const [newPrinciple, setNewPrinciple] = useState({
    title: '',
    description: '',
    category: 'coding' as EngineeringPrinciple['category'],
    priority: 'medium' as EngineeringPrinciple['priority']
  });

  const statusColors = {
    'not-started': 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    'completed': 'bg-green-500',
    'blocked': 'bg-red-500'
  };

  const categoryColors = {
    coding: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    testing: 'bg-green-100 text-green-800',
    deployment: 'bg-orange-100 text-orange-800',
    security: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    low: 'border-gray-300',
    medium: 'border-blue-300',
    high: 'border-orange-300',
    critical: 'border-red-300'
  };


useEffect(() => {
  const fetchData = async () => {
    try {
      const projectRef = doc(db, 'projects', projectDetails.projectId);
      const docSnap = await getDoc(projectRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.sdlcPhases) setSDLCPhases(data.sdlcPhases);
        if (data.engineeringPrinciples) setEngineeringPrinciples(data.engineeringPrinciples);
      }
    } catch (err) {
      console.error('Error fetching Firestore data:', err);
    }
  };

  if (projectDetails?.projectId) fetchData();
}, [projectDetails?.projectId]);

const createSDLCPhase = async () => {
  const projectRef = doc(db, 'projects', projectDetails.projectId);
  const phase: SDLCPhase = {
    id: Date.now().toString(),
    name: newPhase.name,
    description: newPhase.description,
    status: 'not-started',
    progress: 0,
    tasks: newPhase.tasks.split(',').map(t => t.trim()).filter(Boolean),
    deliverables: newPhase.deliverables.split(',').map(d => d.trim()).filter(Boolean),
    estimatedDays: newPhase.estimatedDays
  };

  const updated = [...sdlcPhases, phase];
  setSDLCPhases(updated);
  setShowCreatePhase(false);
  setNewPhase({ name: '', description: '', estimatedDays: 0, tasks: '', deliverables: '' });
  await updateDoc(projectRef, { sdlcPhases: updated });
};

const createEngineeringPrinciple = async () => {
  const projectRef = doc(db, 'projects', projectDetails.projectId);
  const principle: EngineeringPrinciple = {
    id: Date.now().toString(),
    title: newPrinciple.title,
    description: newPrinciple.description,
    category: newPrinciple.category,
    implemented: false,
    priority: newPrinciple.priority
  };

  const updated = [...engineeringPrinciples, principle];
  setEngineeringPrinciples(updated);
  setShowCreatePrinciple(false);
  setNewPrinciple({ title: '', description: '', category: 'coding', priority: 'medium' });
  await updateDoc(projectRef, { engineeringPrinciples: updated });
};

const updatePhaseProgress = async (phaseId: string, progress: number) => {
  const projectRef = doc(db, 'projects', projectDetails.projectId);
  const updatedPhases = sdlcPhases.map(phase => {
    if (phase.id === phaseId) {
      let status: SDLCPhase['status'] = 'not-started';
      if (progress === 100) status = 'completed';
      else if (progress > 0) status = 'in-progress';

      return { ...phase, progress, status };
    }
    return phase;
  });

  setSDLCPhases(updatedPhases);
  await updateDoc(projectRef, { sdlcPhases: updatedPhases });
};

const togglePrincipleImplementation = async (principleId: string) => {
  const projectRef = doc(db, 'projects', projectDetails.projectId);
  const updated = engineeringPrinciples.map(principle =>
    principle.id === principleId
      ? { ...principle, implemented: !principle.implemented }
      : principle
  );

  setEngineeringPrinciples(updated);
  await updateDoc(projectRef, { engineeringPrinciples: updated });
};

const handleDeletePhase = async (id) => {
  try {
    // 1. Remove the phase from local state
    const projectRef = doc(db, 'projects', projectDetails.projectId);
    const updatedPhases = sdlcPhases.filter(phase => phase.id !== id);
    setSDLCPhases(updatedPhases);

    // 2. Update Firestore
    await updateDoc(projectRef, {
      sdlcPhases: updatedPhases
    });
  } catch (error) {
    console.error("Error deleting phase:", error);
  }
};
const handleDeleteEng = async (id) => {
  try {
    // 1. Filter out the principle to delete
    const projectRef = doc(db, 'projects', projectDetails.projectId);
    const updatedPrinciples = engineeringPrinciples.filter(item => item.id !== id);
    setEngineeringPrinciples(updatedPrinciples);

    // 2. Update Firestore
    await updateDoc(projectRef, {
      engineeringPrinciples: updatedPrinciples,
    });
  } catch (error) {
    console.error("Error deleting engineering principle:", error);
  }
};



  const overallProgress = sdlcPhases.reduce((acc, phase) => acc + phase.progress, 0) / sdlcPhases.length;


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Project Workspace
            </h1>
            <p className="text-muted-foreground">Manage SDLC processes and engineering principles</p>
          </div>
          <div className="flex gap-2 text-sm border rounded-md p-2">
           Overall Progress: {overallProgress}%
          </div>
        </div>

        <Tabs defaultValue="sdlc" className="w-full">
          <TabsList className="w-full flex justify-around">
            <TabsTrigger value="sdlc">SDLC Management</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="principles">Engineering Principles</TabsTrigger>
            <TabsTrigger value="overview">Project Overview</TabsTrigger>

          </TabsList>

          <TabsContent value="sdlc" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Software Development Life Cycle</h2>
              <Dialog open={showCreatePhase} onOpenChange={setShowCreatePhase}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Phase
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New SDLC Phase</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Phase Name</Label>
                      <Input
                        id="name"
                        value={newPhase.name}
                        onChange={(e) => setNewPhase(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Phase name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newPhase.description}
                        onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Phase description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedDays">Estimated Days</Label>
                      <Input
                        id="estimatedDays"
                        type="number"
                        value={newPhase.estimatedDays}
                        onChange={(e) => setNewPhase(prev => ({ ...prev, estimatedDays: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tasks">Tasks (comma separated)</Label>
                      <Textarea
                        id="tasks"
                        value={newPhase.tasks}
                        onChange={(e) => setNewPhase(prev => ({ ...prev, tasks: e.target.value }))}
                        placeholder="Task 1, Task 2, Task 3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliverables">Deliverables (comma separated)</Label>
                      <Textarea
                        id="deliverables"
                        value={newPhase.deliverables}
                        onChange={(e) => setNewPhase(prev => ({ ...prev, deliverables: e.target.value }))}
                        placeholder="Deliverable 1, Deliverable 2"
                      />
                    </div>
                    <Button onClick={createSDLCPhase} className="w-full">
                      Create Phase
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {sdlcPhases.map((phase) => (
                <Card key={phase.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <GitBranch className="h-5 w-5" />
                          {phase.name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{phase.description}</p>
                      </div>
                      <Badge className={`${statusColors[phase.status]} text-white`}>
                        {phase.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePhaseProgress(phase.id, Math.min(100, phase.progress + 25))}
                        >
                          +25%
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePhaseProgress(phase.id, Math.max(0, phase.progress - 25))}
                        >
                          -25%
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Tasks</h4>
                        <ul className="space-y-1">
                          {phase.tasks.map((task, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-3 w-3" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Deliverables</h4>
                        <ul className="space-y-1">
                          {phase.deliverables.map((deliverable, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <FileText className="h-3 w-3" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Estimated: {phase.estimatedDays} days</span>
                      {phase.actualDays && <span>Actual: {phase.actualDays} days</span>}
                    </div>
                    <div className="">
                      <button className='p-2 bg-red-600 text-white text-sm rounded-md' onClick={()=>handleDeletePhase(phase.id)}>Delete</button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="roadmap" className="space-y-6">
           <TimelineScreen projectDetails={projectDetails} />
          </TabsContent>
          <TabsContent value="principles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Engineering Principles</h2>
              <Dialog open={showCreatePrinciple} onOpenChange={setShowCreatePrinciple}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Principle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Engineering Principle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPrinciple.title}
                        onChange={(e) => setNewPrinciple(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Principle title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newPrinciple.description}
                        onChange={(e) => setNewPrinciple(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Principle description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newPrinciple.category}
                          onValueChange={(value: EngineeringPrinciple['category']) => 
                            setNewPrinciple(prev => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coding">Coding</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="testing">Testing</SelectItem>
                            <SelectItem value="deployment">Deployment</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newPrinciple.priority}
                          onValueChange={(value: EngineeringPrinciple['priority']) => 
                            setNewPrinciple(prev => ({ ...prev, priority: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={createEngineeringPrinciple} className="w-full">
                      Create Principle
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {engineeringPrinciples.map((principle) => (
                <Card key={principle.id} className={`border-l-4 ${priorityColors[principle.priority]}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          {principle.title}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{principle.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={categoryColors[principle.category]}>
                          {principle.category}
                        </Badge>
                        <Badge variant={principle.priority === 'critical' ? 'destructive' : 'outline'}>
                          {principle.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={principle.implemented}
                          onCheckedChange={() => togglePrincipleImplementation(principle.id)}
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {principle.implemented ? 'Implemented' : 'Not Implemented'}
                        </label>
                      </div>
                      {principle.implemented && (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="">
                      <button className='p-2 bg-red-600 mt-4 text-white text-sm rounded-md' onClick={()=>handleDeleteEng(principle.id)}>Delete</button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Phases</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sdlcPhases.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {sdlcPhases.filter(p => p.status === 'completed').length} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <Progress value={overallProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Principles</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{engineeringPrinciples.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {engineeringPrinciples.filter(p => p.implemented).length} implemented
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Estimated Days</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sdlcPhases.reduce((acc, phase) => acc + phase.estimatedDays, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total project duration
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Health Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-3">SDLC Phase Status</h4>
                      <div className="space-y-2">
                        {Object.entries(
                          sdlcPhases.reduce((acc, phase) => {
                            acc[phase.status] = (acc[phase.status] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([status, count]) => (
                          <div key={status} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Engineering Principles by Category</h4>
                      <div className="space-y-2">
                        {Object.entries(
                          engineeringPrinciples.reduce((acc, principle) => {
                            acc[principle.category] = (acc[principle.category] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                          <div key={category} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{category}</span>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workspace;