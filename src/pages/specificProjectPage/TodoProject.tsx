import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "@/Firebase/firebaseConfig";
import {
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Calendar,
  Trash2,
  Check,
  Clock,
  Filter,
  Flag,
  CheckSquare,
  Tag,
} from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  startDate: string | null;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  startTimeMeridian: string;
  endTimeMeridian: string;
  createdMonth: number;
  createdDate: number;
}

export default function TodoProject({ projectDetails }: { projectDetails: any }) {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState(projectDetails);
  const [todos, setTodos] = useState<Todo[]>(projectDetails?.todo || []);
  const [newTodo, setNewTodo] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [activeTab, setActiveTab] = useState("all");
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  // Timer input state
  const [timerForm, setTimerForm] = useState(false);
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState('');
  const [taskEndTime, setTaskEndTime] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [taskEndTimeMeridian, setTaskEndTimeMeridian] = useState('');
  const [taskStartTimeMeridian, setTaskStartTimeMeridian] = useState('');

  const now = new Date();
  const categories = ["Personal", "Work", "Health", "Shopping", "Learning"];

  const priorityStyles = {
    low: { badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: "text-green-500" },
    medium: { badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: "text-yellow-500" },
    high: { badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: "text-red-500" },
  };

  useEffect(() => {
    setProjectDetail(projectDetails);
    setTodos(projectDetails?.todo || []);
  }, [projectDetails]);

  const addTodo = async () => {
    if (!newTodo.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task title.",
        variant: "destructive",
      });
      return;
    }

    const date = new Date();
    const todo: Todo = {
      id: `${Date.now()}`,
      title: newTodo.trim(),
      completed: false,
      priority: selectedPriority,
      category: selectedCategory,
      startDate: taskStartDate,
      endDate: taskEndDate,
      startTime: taskStartTime,
      endTime: taskEndTime,
      startTimeMeridian: taskStartTimeMeridian,
      endTimeMeridian: taskEndTimeMeridian,
      createdMonth: date.getMonth(),
      createdDate: date.getDate(),
    };

    try {
      const projectRef = doc(db, "projects", projectId as string);
      await updateDoc(projectRef, {
        todo: arrayUnion(todo),
      });

      setTodos((prev) => [todo, ...prev]);
      setNewTodo("");
      toast({ title: "Task Added", description: "Todo added to project." });
    } catch (error) {
      console.error("Error adding todo:", error);
      toast({
        title: "Error",
        description: "Failed to add task.",
        variant: "destructive",
      });
    }
  };

  const toggleComplete = async (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const projectRef = doc(db, "projects", projectId as string);
      await updateDoc(projectRef, { todo: updatedTodos });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setTodoToDelete(null);

    try {
      const projectRef = doc(db, "projects", projectId as string);
      await updateDoc(projectRef, { todo: updatedTodos });

      toast({
        title: "Deleted",
        description: "Task removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Invalid",
        description: "Category cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    if (categories.includes(newCategory.trim())) {
      toast({
        title: "Duplicate",
        description: "Category already exists.",
        variant: "destructive",
      });
      return;
    }
    categories.push(newCategory.trim());
    setSelectedCategory(newCategory.trim());
    setNewCategory("");
    setNewCategoryDialog(false);
  };

  const filteredTodos = todos.filter((todo) => {
    const todayDate = new Date().toISOString().split("T")[0];
    switch (activeTab) {
      case "today":
        return todo.endDate === todayDate;
      case "upcoming":
        return todo.endDate && new Date(todo.endDate) > new Date() && !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const todosByCategory: Record<string, Todo[]> = {};
  filteredTodos.forEach((todo) => {
    if (!todosByCategory[todo.category]) todosByCategory[todo.category] = [];
    todosByCategory[todo.category].push(todo);
  });

  return (
    <div className="mt-4 flex flex-col gap-4 md:flex-row">
      <div className="w-full mb-4 md:w-1/3">
      <PageTitle
        title="Project Todo List"
        description="Organize your tasks and stay productive."
      />

      {/* Add Todo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>With priority and schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          {/* Selects */}
          <div className="grid grid-cols-2 gap-4">
            <Select value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)}>
              <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                if (value === "_new") setNewCategoryDialog(true);
                else setSelectedCategory(value);
              }}
            >
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
                <SelectItem value="_new" className="text-blue-500">+ Add Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timer Toggle */}
          {!timerForm ? (
            <Button onClick={() => setTimerForm(true)} variant="outline">
              <Clock className="w-4 h-4 mr-2" /> Set Schedule
            </Button>
          ) : (
            <div className="space-y-2">
              <Input type="date" value={taskStartDate} onChange={(e) => setTaskStartDate(e.target.value)} placeholder="Start Date" />
              <Input type="time" value={taskStartTime} onChange={(e) => setTaskStartTime(e.target.value)} placeholder="Start Time" />
              <Input type="date" value={taskEndDate} onChange={(e) => setTaskEndDate(e.target.value)} placeholder="End Date" />
              <Input type="time" value={taskEndTime} onChange={(e) => setTaskEndTime(e.target.value)} placeholder="End Time" />
              <Button onClick={() => setTimerForm(false)}>Close</Button>
            </div>
          )}

          <Button onClick={addTodo} className="w-full bg-cyan-500 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </CardContent>
      </Card>
      </div>

      {/* Tabs & Tasks */}
      <div className="w-full md:w-2/3 gap-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {Object.entries(todosByCategory).map(([category, todos]) => (
        <div key={category} className="mb-6">
          <h4 className="text-lg font-semibold mb-2 flex items-center">
            <Tag className="w-4 h-4 mr-2" /> {category}
          </h4>
          {todos.map((todo) => {
            const due = todo.endDate && todo.endTime ? new Date(`${todo.endDate}T${todo.endTime}`) : null;
            const remaining = due ? Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60)) : null;

            return (
              <div key={todo.id} className={cn("flex items-center gap-4 p-3 rounded border ", todo.completed && "bg-muted/40")}>
                <Checkbox checked={todo.completed} onCheckedChange={() => toggleComplete(todo.id)} />
                <div className="flex-1">
                  <p className={cn("font-medium", todo.completed && "line-through")}>{todo.title}</p>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                    <Badge className={priorityStyles[todo.priority]?.badge}>
                      <Flag className="w-3 h-3 mr-1" /> {todo.priority}
                    </Badge>
                    {todo.endDate && (
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" /> Due: {todo.endDate}
                      </Badge>
                    )}
                    {remaining != null && (
                      <span className={cn("text-sm", remaining < 0 ? "text-red-500" : "text-green-500")}>
                        {remaining < 0 ? `Overdue ${-remaining}h` : `${remaining}h left`}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTodoToDelete(todo.id)}
                  className="text-red-500 hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      ))}

      {/* No Tasks UI */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No tasks found in this category.</p>
        </div>
      )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!todoToDelete} onOpenChange={() => setTodoToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTodoToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => todoToDelete && deleteTodo(todoToDelete)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      <Dialog open={newCategoryDialog} onOpenChange={setNewCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Name your new task category.</DialogDescription>
          </DialogHeader>
          <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category name" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCategoryDialog(false)}>Cancel</Button>
            <Button onClick={addCategory}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
