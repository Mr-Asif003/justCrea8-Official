
import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  SelectLabel,
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
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Plus,
  Calendar,
  Trash2,
  Check,
  Clock,
  ChevronDown,
  Filter,
  Flag,
  CheckSquare,
  Tag,
  AlertCircle,
} from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string | null;
}

export default function TodoMaker() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      priority: "high",
      category: "Work",
      dueDate: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Buy groceries",
      completed: false,
      priority: "medium",
      category: "Personal",
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    },
    {
      id: "3",
      title: "Schedule doctor appointment",
      completed: false,
      priority: "high",
      category: "Health",
      dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
    },
    {
      id: "4",
      title: "Finish reading book",
      completed: true,
      priority: "low",
      category: "Personal",
      dueDate: null,
    },
  ]);
  
  const [newTodo, setNewTodo] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const [selectedDueDate, setSelectedDueDate] = useState<string>("");
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState([
    "Personal", "Work", "Health", "Shopping", "Learning"
  ]);
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const priorityStyles = {
    low: { badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: "text-green-500" },
    medium: { badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: "text-yellow-500" },
    high: { badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: "text-red-500" },
  };

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task description.",
        variant: "destructive",
      });
      return;
    }

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo,
      completed: false,
      priority: selectedPriority,
      category: selectedCategory,
      dueDate: selectedDueDate || null,
    };

    setTodos([todo, ...todos]);
    setNewTodo("");
    toast({
      title: "Task Added",
      description: "Your task has been added successfully.",
    });
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          if (updatedTodo.completed) {
            toast({
              title: "Task Completed",
              description: "Great job! Task marked as complete.",
            });
          }
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setTodoToDelete(null);
    toast({
      title: "Task Deleted",
      description: "Your task has been deleted.",
    });
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
      setNewCategoryDialog(false);
      toast({
        title: "Category Added",
        description: `New category "${newCategory}" has been added.`,
      });
    } else {
      toast({
        title: "Invalid Category",
        description: "This category already exists or is invalid.",
        variant: "destructive",
      });
    }
  };

  let filteredTodos = todos;
  
  switch(activeTab) {
    case "today":
      const today = new Date().toISOString().split("T")[0];
      filteredTodos = todos.filter(todo => todo.dueDate === today);
      break;
    case "upcoming":
      const todayTimestamp = new Date().setHours(0, 0, 0, 0);
      filteredTodos = todos.filter(todo => {
        if (!todo.dueDate) return false;
        const dueDate = new Date(todo.dueDate).setHours(0, 0, 0, 0);
        return dueDate > todayTimestamp && !todo.completed;
      });
      break;
    case "completed":
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    case "all":
    default:
      // All todos, already set
      break;
  }
  
  // Group by category
  const todosByCategory: Record<string, Todo[]> = {};
  filteredTodos.forEach(todo => {
    if (!todosByCategory[todo.category]) {
      todosByCategory[todo.category] = [];
    }
    todosByCategory[todo.category].push(todo);
  });

  return (
    <div className="animate-fade-in">
      <PageTitle
        title="Todo List"
        description="Organize your tasks and stay productive."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Todo */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>
              Create a new task with details and priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="What needs to be done?"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1.5">Priority</p>
                  <Select
                    value={selectedPriority}
                    onValueChange={(value) =>
                      setSelectedPriority(value as "low" | "medium" | "high")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low" className="flex items-center">
                          <div className="flex items-center">
                            <Flag className="h-3.5 w-3.5 text-green-500 mr-2" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center">
                            <Flag className="h-3.5 w-3.5 text-yellow-500 mr-2" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center">
                            <Flag className="h-3.5 w-3.5 text-red-500 mr-2" />
                            High
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">Category</p>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                        <SelectItem value="_new" className="text-primary">
                          + Add New Category
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1.5">Due Date (Optional)</p>
                <Input
                  type="date"
                  value={selectedDueDate}
                  onChange={(e) => setSelectedDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <Button onClick={addTodo} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Todo List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Your Tasks</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredTodos.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(todosByCategory).map(([category, todos]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                      <Tag className="h-3.5 w-3.5 mr-2" /> {category}
                    </h3>
                    <div className="space-y-2">
                      {todos.map((todo) => (
                        <div
                          key={todo.id}
                          className={cn(
                            "flex items-center gap-3 border rounded-lg p-3 transition-all",
                            todo.completed
                              ? "bg-muted/50 text-muted-foreground"
                              : ""
                          )}
                        >
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleComplete(todo.id)}
                            className={todo.completed ? "opacity-50" : ""}
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                "text-sm font-medium",
                                todo.completed && "line-through"
                              )}
                            >
                              {todo.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "px-1 py-0 text-xs font-normal",
                                  priorityStyles[todo.priority].badge
                                )}
                              >
                                <Flag className={cn("h-3 w-3 mr-1", priorityStyles[todo.priority].icon)} />
                                {todo.priority}
                              </Badge>
                              
                              {todo.dueDate && (
                                <Badge variant="outline" className="px-1 py-0 text-xs font-normal">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive rounded-full hover:bg-destructive/10"
                            onClick={() => setTodoToDelete(todo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Tasks Found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "today"
                    ? "You don't have any tasks due today."
                    : activeTab === "upcoming"
                    ? "You don't have any upcoming tasks."
                    : activeTab === "completed"
                    ? "You haven't completed any tasks yet."
                    : "Add your first task to get started!"}
                </p>
                {activeTab === "all" && (
                  <Button onClick={() => document.querySelector('input')?.focus()}>
                    Add Your First Task
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Todo Dialog */}
      <Dialog
        open={todoToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setTodoToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTodoToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => todoToDelete && deleteTodo(todoToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      <Dialog open={newCategoryDialog} onOpenChange={setNewCategoryDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category to organize your tasks.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCategoryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
