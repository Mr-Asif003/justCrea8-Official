
import { useEffect, useState } from "react";
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
import { collection, getDocs, addDoc, onSnapshot, deleteDoc ,doc} from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState({
    blogs: true,
    notes: true,
    todos: true,
    activity: true,
  });
  const [blogData, setBlogData] = useState([])
  const [noteData, setNoteData] = useState([])
  const [todoData, setTodoData] = useState([])
  const [todoCompletedNum, setTodoCompletedNum] = useState(0);
  const [showActivityform, setShowActivityForm] = useState(false)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [activityDay, setActivityDay] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return; // handle if user is not logged in

      const blogRef = collection(db, "blogs", user.uid, "userblogs");
      const querySnapshot = await getDocs(blogRef);
      const blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const todosRef = collection(db, 'todos', user.uid, 'userTodos');
      const w = await getDocs(todosRef)
      const todos = w.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      const notesRef = collection(db, "notes", user.uid, "userNotes");
      const no = await getDocs(notesRef)
      const notes = no.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))


      setBlogData(blogs);
      setNoteData(notes);
      setTodoData(todos);


    };

    fetchData();
  }, []);





  const toggleWidgetVisibility = (widget: keyof typeof visibleWidgets) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  const months = [
    { name: 'Jan', index: 0 },
    { name: 'Feb', index: 1 },
    { name: 'Mar', index: 2 },
    { name: 'Apr', index: 3 },
    { name: 'May', index: 4 },
    { name: 'Jun', index: 5 },
    { name: 'Jul', index: 6 },
    { name: 'Aug', index: 7 },
    { name: 'Sep', index: 8 },
    { name: 'Oct', index: 9 },
    { name: 'Nov', index: 10 },
    { name: 'Dec', index: 11 }
  ];


  const [bData, setBData] = useState([]);
  const [nData, setNData] = useState([]);
  const [tData, setTData] = useState([]);

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth();

    // Initialize bData, nData, and tData with 0 values for each month
    let updatedBData = months.map((month) => ({
      name: month.name,
      value: 0
    }));
    let updatedNData = months.map((month) => ({
      name: month.name,
      value: 0
    }));
    let updatedTData = months.map((month) => ({
      name: month.name,
      value: 0
    }));

    // Count blogs, notes, and todos for each month
    blogData.forEach((e) => {
      const monthIndex = parseInt(e.createdMonth);
      if (monthIndex >= 0 && monthIndex <= 11) {
        updatedBData[monthIndex].value++;
      }
    });

    noteData.forEach((e) => {
      const monthIndex = parseInt(e.createdMonth);
      if (monthIndex >= 0 && monthIndex <= 11) {
        updatedNData[monthIndex].value++;
      }
    });

    let tc = []
    tc = todoData.filter((e) => e.completed === true);
    setTodoCompletedNum(tc.length);
    todoData.forEach((e) => {
      const monthIndex = parseInt(e.createdMonth);
      if (monthIndex >= 0 && monthIndex <= 11) {
        updatedTData[monthIndex].value++;
      }
    });
    const currentMonthName = months[currentMonth].name
    const currentDate = date.getDate();

    let todayTodos = []
    todayTodos = todoData.filter((e) => parseInt(e.endDate.slice(8, 10)) == currentDate && e.createdMonth == currentMonth);
    let todayComplete = []
    todayComplete = todayTodos.filter((e) => e.completed == true);
    



    const todoStats = [{ name: 'today', completed: todayComplete.length, pending: todayTodos.length - todayComplete.length }
      , { name: currentMonthName, completed: tc.length, pending: todoData.length - tc.length }
    ]

    // Set the updated data to trigger a re-render
    setBData(updatedBData);
    setNData(updatedNData);
    setTData(todoStats);

    // // Example: To check the count for each data type in the current month
    // console.log('Blog count for current month:', updatedBData[currentMonth].value);
    // console.log('Note count for current month:', updatedNData[currentMonth].value);
    // console.log('Todo count for current month:', updatedTData[currentMonth].value);

  }, [blogData, noteData, todoData]);// Re-run when any of the data changes

  const thisMonthNote = noteData.filter((n) => {
    if (!n.createdAt) return false;
    const month = new Date(n.createdAt).getMonth(); // 0 = Jan, 3 = April
    return month === 3; // April is month index 3
  });
  
  



  //Sample data for charts
  // let bData = [
  //   { name: '0', value: 5 },
  //   { name: '1', value: 8 },
  //   { name: '2', value: 15 },
  //   { name: '4', value: 12 },
  //   { name: '5', value: 18 },
  //   { name: '6', value: 23 },
  // ];

  // const nData = [
  //   { name: "Personal", value: 15 },
  //   { name: "Work", value: 22 },
  //   { name: "Ideas", value: 8 },
  //   { name: "Other", value: 5 },
  // ];

  // const tData = [
  //   { name: "Today", completed: 5, pending: 3 },
  //   { name: "Tomorrow", completed: 2, pending: 8 },
  //   { name: "This Week", completed: 10, pending: 12 },
  // ];

  const CHART_COLORS = ["#7e5bef", "#6c4dd1", "#00c6ff", "#94e2ff",'#ff0000','#00ff00','#0000ff'];
  const [addActivityList, setAddActivityList] = useState([]);
  const [tommorrowaddActivityList, settommorrowAddActivityList] = useState([]);
  const addActivity = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const date = new Date(); // Get the current timestamp

    const newActivity = {
      title: title,
      time: time,
      activityDay: activityDay,
      createdAt: date, // Storing full date instead of just day of the month
    };

    try {
      const activityRef = collection(db, 'activities', user.uid, 'userActivities');
      const docRef = await addDoc(activityRef, newActivity);

      setAddActivityList(prev => [
        {
          id: docRef.id,
          ...newActivity,
        },
        ...prev,
      ]);
    

    } catch (e: any) {
      alert(e.message);
    }
  };



  const user = auth.currentUser;
  useEffect(() => {
    const fetchActivities = async () => {
      

      try {
        const activitiesRef = collection(db, "activities", user.uid, "userActivities");

        // Real-time listener (snapshot listener)
        const unsubscribe = onSnapshot(activitiesRef, (querySnapshot) => {
          const activities = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Firestore's Timestamp conversion (if necessary)
            const formattedDate = data.createdAt ? new Date(data.createdAt.seconds * 1000) : null;

            return {
              id: doc.id,
              ...data,
              createdAt: formattedDate,
            };
          });

          // Overwrite the activities list (instead of appending to avoid duplicates)
          setAddActivityList(activities);

          const td=addActivityList.filter((e)=>e.activityDay!='Today')
          settommorrowAddActivityList(td)
         
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
      } catch (e) {
        
      }
    };

    fetchActivities(); // Call the function on mount
  }, []); // Empty dependency array to fetch once on mount

  const deleteActivity = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }
  
    const activityDocRef = doc(db, "activities", user.uid, "userActivities", id);
    try {
      await deleteDoc(activityDocRef);
  
      // Optionally update local state:
      setAddActivityList(prev => prev.filter(activity => activity.id !== id));
      
    } catch (e) {
      alert("Failed to delete activity: " + e.message);
    }
    
  };
    
  



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
                  <div className="text-2xl font-bold">{blogData.length}</div>
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
                    data={bData}
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
                      dataKey="value"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
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
                  <div className="text-2xl font-bold">{noteData.length}</div>
                  <Badge variant="outline" className="text-primary">
                     {thisMonthNote.length} new this month
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total notes created
                </p>
              </div>

              <div className="h-[480px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `    ${(percent * 100).toFixed(0)}  %`
                      }
                      labelLine={false}
                    >
                      {nData.map((entry, index) => (
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
                  <div className="text-2xl font-bold">{todoCompletedNum}/{todoData.length}</div>
                  <Badge variant="outline" className="text-primary">
                    {todoCompletedNum / todoData.length * 100} % completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Task completion rate
                </p>
                <Progress className="mt-2" value={todoCompletedNum / todoData.length * 100} />
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tData}
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
                      fill="red"
                      name="pending"
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
                {/* <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger> */}
              </TabsList>

              <TabsContent value="reminders" className="space-y-4">

                {addActivityList.map((e) => (
                  <div
                    key={e.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary rounded-full p-2">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{e.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          due on {e.activityDay} at {e.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Button size="sm" onClick={()=>deleteActivity(e.id)} variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {/* Format the createdAt timestamp */}
                      <p className="text-xs">
                        Creation Date: {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}




                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={() => setShowActivityForm(!showActivityform)} size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> Add New Reminder
                  </Button>
                </div>
              </TabsContent>
              {showActivityform && (
                <div className="flex flex-col justify-around">
                  <p className="mt-4">please enter your activity</p>
                  <div className="mt-4"></div>
                  <Input onChange={(e) => setTitle(e.target.value)} placeholder="enter activity" className="mb-3" />
                  <Input onChange={(e) => setTime(e.target.value)} placeholder="enter time" />
                  <select
                    className="bg-transparent text-purple-600 mt-4 focus:outline-1 focus:outline-purple-700"
                    value={activityDay}
                    onChange={(e) => setActivityDay(e.target.value)} // 👈 updating only activityDay
                  >
                    <option value="" disabled>Select Day</option>
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Day after tomorrow">Day after tomorrow</option>
                  </select>
                  <Button className="mt-4" onClick={addActivity}>Done</Button>
                </div>
              )}

              
         
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
