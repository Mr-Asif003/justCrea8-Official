import React, { useState } from 'react';
import { Plus, MoreHorizontal, User, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar?: string;
    initials: string;
  };
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: Date;
  tags: string[];
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-100 dark:bg-gray-800',
      tasks: [
        {
          id: '1',
          title: 'Design user authentication flow',
          description: 'Create wireframes and mockups for login/signup process',
          assignee: { name: 'Alice Johnson', initials: 'AJ' },
          priority: 'High',
          dueDate: new Date('2024-07-25'),
          tags: ['Design', 'UX'],
          status: 'todo'
        },
        {
          id: '2',
          title: 'Set up database schema',
          description: 'Design and implement the initial database structure',
          assignee: { name: 'Bob Smith', initials: 'BS' },
          priority: 'Critical',
          dueDate: new Date('2024-07-22'),
          tags: ['Backend', 'Database'],
          status: 'todo'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-100 dark:bg-blue-900',
      tasks: [
        {
          id: '3',
          title: 'Implement API endpoints',
          description: 'Create REST API for user management',
          assignee: { name: 'Charlie Brown', initials: 'CB' },
          priority: 'High',
          dueDate: new Date('2024-07-28'),
          tags: ['Backend', 'API'],
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'bg-yellow-100 dark:bg-yellow-900',
      tasks: [
        {
          id: '4',
          title: 'Frontend component library',
          description: 'Build reusable UI components',
          assignee: { name: 'Diana Prince', initials: 'DP' },
          priority: 'Medium',
          dueDate: new Date('2024-07-26'),
          tags: ['Frontend', 'Components'],
          status: 'review'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100 dark:bg-green-900',
      tasks: [
        {
          id: '5',
          title: 'Project setup and configuration',
          description: 'Initialize project with all necessary tools',
          assignee: { name: 'Eve Wilson', initials: 'EW' },
          priority: 'Medium',
          dueDate: new Date('2024-07-20'),
          tags: ['Setup', 'Config'],
          status: 'done'
        }
      ]
    }
  ]);

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('todo');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical',
    dueDate: new Date(),
    tags: ''
  });

  const priorityColors = {
    Low: 'bg-gray-500',
    Medium: 'bg-blue-500',
    High: 'bg-orange-500',
    Critical: 'bg-red-500'
  };

  const teamMembers = [
    { name: 'Alice Johnson', initials: 'AJ' },
    { name: 'Bob Smith', initials: 'BS' },
    { name: 'Charlie Brown', initials: 'CB' },
    { name: 'Diana Prince', initials: 'DP' },
    { name: 'Eve Wilson', initials: 'EW' }
  ];

  const createTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: teamMembers.find(member => member.name === newTask.assignee) || teamMembers[0],
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      status: selectedColumn as Task['status']
    };

    setColumns(prev => prev.map(column => {
      if (column.id === selectedColumn) {
        return { ...column, tasks: [...column.tasks, task] };
      }
      return column;
    }));

    setShowCreateTask(false);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      dueDate: new Date(),
      tags: ''
    });
  };

  const moveTask = (taskId: string, fromColumn: string, toColumn: string) => {
    let taskToMove: Task | null = null;

    setColumns(prev => prev.map(column => {
      if (column.id === fromColumn) {
        taskToMove = column.tasks.find(task => task.id === taskId) || null;
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));

    if (taskToMove) {
      taskToMove.status = toColumn as Task['status'];
      setColumns(prev => prev.map(column => {
        if (column.id === toColumn) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove!]
          };
        }
        return column;
      }));
    }
  };

  const deleteTask = (taskId: string, columnId: string) => {
    setColumns(prev => prev.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Kanban Board</h1>
            <p className="text-muted-foreground">Manage project tasks and workflow</p>
          </div>
          <Dialog open={showCreateTask} onOpenChange={setShowCreateTask}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Task description"
                  />
                </div>

                <div>
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={newTask.assignee}
                    onValueChange={(value) => setNewTask(prev => ({ ...prev, assignee: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member.name} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Critical') => 
                        setNewTask(prev => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="column">Column</Label>
                    <Select
                      value={selectedColumn}
                      onValueChange={setSelectedColumn}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map(column => (
                          <SelectItem key={column.id} value={column.id}>
                            {column.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newTask.tags}
                    onChange={(e) => setNewTask(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <Button onClick={createTask} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className={`${column.color} rounded-lg p-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{column.title}</h3>
                  <Badge variant="secondary">{column.tasks.length}</Badge>
                </div>
              </div>

              <div className="space-y-3 min-h-96">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {task.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {columns.filter(col => col.id !== column.id).map(col => (
                              <DropdownMenuItem
                                key={col.id}
                                onClick={() => moveTask(task.id, column.id, col.id)}
                              >
                                Move to {col.title}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                              onClick={() => deleteTask(task.id, column.id)}
                              className="text-destructive"
                            >
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>
                        <Badge 
                          className={`${priorityColors[task.priority]} text-white text-xs`}
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className={isOverdue(task.dueDate) ? 'text-red-500' : ''}>
                          {format(task.dueDate, 'MMM dd')}
                        </span>
                        {isOverdue(task.dueDate) && (
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        )}
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;