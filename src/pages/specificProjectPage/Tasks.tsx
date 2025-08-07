import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Calendar, User, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import TaskFilters from '@/components/tasks/TaskFilters';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { auth, db } from '@/Firebase/firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  provider: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  tags: string[];
  createdAt: string;
  penalty?: string;
}

const TaskManager = ({ projectDetails, setProjectDetails, projectMemberDetails }) => {
const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
  if (projectDetails?.tasks) {
    setTasks(projectDetails.tasks);
  }
}, [projectDetails?.tasks]);


  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    provider: 'All',
    assignee: 'All'
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  console.log(projectDetails,'sdf')

const handleCreateTask = async (taskData: any) => {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: new Date(taskData.dueDate).toISOString().split('T')[0], // Ensure string format
    provider: auth.currentUser?.displayName || 'Unknown',
    assignee: taskData.assignee || 'Unnamed'
  };

  try {
    const projectRef = doc(db, 'projects', projectDetails.projectId);

    // Append new task to the project's tasks array (assuming it exists)
    await updateDoc(projectRef, {
      tasks: arrayUnion(newTask)
    });

    setTasks(prev => [newTask, ...prev]);
     toast.success('Task create successfully..')
    setIsCreateDialogOpen(false);
  } catch (error) {
    console.error('Error adding task to Firestore:', error);
     toast.error('error  in creating')
    // You can show a toast here if needed
  }
};


const handleUpdateTask = async (taskId: string, updatedData: any) => {
  try {
    const projectRef = doc(db, 'projects', projectDetails.projectId);

    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            ...updatedData,
            provider: auth.currentUser?.displayName || 'Unknown',
            assignee: updatedData.assignee || task.assignee
          }
        : task
    );

    await updateDoc(projectRef, {
      tasks: updatedTasks
    });

    setTasks(updatedTasks);
     toast.success('Task update successfully..')
    setSelectedTask(null);
  } catch (error) {
    console.error('Error updating task:', error);
    toast.error('Error in updating')
    // Add toast or error handler if needed
  }
};


const handleDeleteTask = async (taskId: string) => {
  try {
    const projectRef = doc(db, 'projects', projectDetails.projectId);

    const updatedTasks = tasks.filter(task => task.id !== taskId);

    await updateDoc(projectRef, {
      tasks: updatedTasks
    });
   toast.success('Task delete successfully..')
    setTasks(updatedTasks);
  } catch (error) {
    console.error('Error deleting task:', error);
    toast.error('Error in deleting')
    // Add toast or error handler if needed
  }
};


  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'All' && task.status !== filters.status) return false;
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
    if (filters.provider !== 'All' && task.provider !== filters.provider) return false;
    if (filters.assignee !== 'All' && task.assignee !== filters.assignee) return false;
    return true;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Assign, track, and manage tasks across your team
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <TaskForm onSubmit={handleCreateTask} projectMemberDetails={projectMemberDetails} onCancel={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-background to-accent/10 border-accent/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold text-primary">{projectDetails?.tasks?.length}</p>
                </div>
                <Target className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background to-green-500/10 border-green-500/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background to-blue-500/10 border-blue-500/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{taskStats.inProgress}</p>
                </div>
                <User className="h-8 w-8 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-background to-red-500/10 border-red-500/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">{taskStats.overdue}</p>
                </div>
                <Filter className="h-8 w-8 text-red-600/60" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TaskFilters filters={filters} onFiltersChange={setFilters} tasks={tasks} />
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-background/60 backdrop-blur-sm border-accent/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold">Tasks ({filteredTasks.length})</CardTitle>
                <Badge variant="outline" className="text-sm">
                  {filters.status !== 'All' ? filters.status : 'All Status'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={filteredTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={setSelectedTask}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Task Dialog */}
        {selectedTask && (
          <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <TaskForm
                task={selectedTask}
                onSubmit={(taskData) => handleUpdateTask(selectedTask.id, taskData)}
                onCancel={() => setSelectedTask(null)}
                isEditing
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
