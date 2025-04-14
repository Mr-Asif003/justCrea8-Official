
import { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Plus,
  FileEdit,
  StickyNote,
  CheckSquare,
  Layers,
  Grip,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
} from "lucide-react";

export default function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState({
    blogs: true,
    notes: true,
    todos: true,
    activity: true,
  });

  const toggleWidgetVisibility = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  // Sample data for charts
  const blogData = [
    { name: "Jan", value: 5 },
    { name: "Feb", value: 8 },
    { name: "Mar", value: 15 },
    { name: "Apr", value: 12 },
    { name: "May", value: 18 },
    { name: "Jun", value: 23 },
  ];

  const noteData = [
    { name: "Personal", value: 15 },
    { name: "Work", value: 22 },
    { name: "Ideas", value: 8 },
    { name: "Other", value: 5 },
  ];

  const todoData = [
    { name: "Today", completed: 5, pending: 3 },
    { name: "Tomorrow", completed: 2, pending: 8 },
    { name: "This Week", completed: 10, pending: 12 },
  ];

  const CHART_COLORS = ["#7e5bef", "#6c4dd1", "#00c6ff", "#94e2ff"];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <PageTitle
          title="Dashboard"
          description="Your personal productivity overview."
          className="mb-0"
        />
        <div className="flex items-center gap-2">
          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="gap-2"
          >
            {editMode ? (
              <>
                <Eye className="h-4 w-4" /> Done
              </>
            ) : (
              <>
                <Grip className="h-4 w-4" /> Customize
              </>
            )}
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Widget
          </Button>
        </div>
      </div>

      {editMode && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <p className="mb-2 text-sm font-medium">Customize Dashboard</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start"
                onClick={() => toggleWidgetVisibility("blogs")}
              >
                {visibleWidgets.blogs ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Blog Stats
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start"
                onClick={() => toggleWidgetVisibility("notes")}
              >
                {visibleWidgets.notes ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Note Stats
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start"
                onClick={() => toggleWidgetVisibility("todos")}
              >
                {visibleWidgets.todos ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Todo Stats
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 justify-start"
                onClick={() => toggleWidgetVisibility("activity")}
              >
                {visibleWidgets.activity ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blog Stats Widget */}
        {visibleWidgets.blogs && (
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <FileEdit className="h-5 w-5" />
                Blog Stats
              </CardTitle>
              {editMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Grip className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">23</div>
                  <Badge variant="outline" className="text-primary">
                    4 new this month
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total blog posts
                </p>
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={blogData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      fill="url(#blogGradient)"
                      stroke="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                    <defs>
                      <linearGradient
                        id="blogGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Note Stats Widget */}
        {visibleWidgets.notes && (
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                Note Stats
              </CardTitle>
              {editMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Grip className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">50</div>
                  <Badge variant="outline" className="text-primary">
                    12 new this month
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total notes created
                </p>
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={noteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {noteData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Todo Stats Widget */}
        {visibleWidgets.todos && (
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Todo Stats
              </CardTitle>
              {editMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Grip className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">28/40</div>
                  <Badge variant="outline" className="text-primary">
                    70% completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Task completion rate
                </p>
                <Progress className="mt-2" value={70} />
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={todoData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="completed"
                      fill="#00b894"
                      name="Completed"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="pending"
                      fill="#fab005"
                      name="Pending"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Activity & Reminders Section */}
      {visibleWidgets.activity && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Activity & Reminders
            </CardTitle>
            {editMode && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <Grip className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reminders">
              <TabsList className="mb-4">
                <TabsTrigger value="reminders">Reminders</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="reminders" className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Team meeting</h4>
                      <p className="text-sm text-muted-foreground">
                        Today at 2:00 PM
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <FileEdit className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Finish blog draft</h4>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow at 12:00 PM
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> Add New Reminder
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="upcoming">
                <div className="text-center py-8 text-muted-foreground">
                  <p>No upcoming events</p>
                  <Button variant="outline" size="sm" className="mt-2 gap-1">
                    <Plus className="h-4 w-4" /> Add Event
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="recent">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 p-2 rounded-full">
                      <CheckSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Completed task: Project proposal</div>
                      <div className="text-xs text-muted-foreground">Today at 10:34 AM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 p-2 rounded-full">
                      <StickyNote className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Created note: Meeting notes</div>
                      <div className="text-xs text-muted-foreground">Yesterday at 4:12 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 p-2 rounded-full">
                      <FileEdit className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Published blog: Productivity tips</div>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
