
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamHeader } from "@/components/team/TeamHeader";
import { 
  FileEdit,
  StickyNote,
  CheckSquare,
  LayoutDashboard,
  Calendar,
  ArrowUpRightFromCircle,
  Clock,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import { db,auth } from "@/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function UserHome() {
  // Get the current hour to determine greeting
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";

  //database reference
  const user = auth.currentUser;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setUserEmail(data.email || "");
        setBio(data.bio || "");
      } else {
        console.log("No user document found.");
      }
    };

    fetchUserData();
  }, [user]);

  const motivationalQuotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "It always seems impossible until it's done.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="animate-fade-in ">
      
     <div className="relative p-[3px] w-full flex justify-center mb-10 rounded-md overflow-hidden group">
  {/* Outer animated border */}
  <div className="absolute inset-0 rounded-md border border-transparent 
                  bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 
                  animate-borderMove opacity-80 blur-[2px]"></div>

  {/* Inner static border for definition */}
  <div className="absolute inset-[2px] rounded-md border border-cyan-300/50"></div>

  {/* Glow pulse layer */}
  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 
                  animate-glow opacity-0 group-hover:opacity-100 pointer-events-none"></div>

  {/* Inner content */}
  <div className="relative z-10 p-6 w-full bg-gray-900 rounded-md shadow-lg 
                  shadow-purple-800/40 transition-transform duration-300 group-hover:scale-[1.02]">
    <PageTitle
      title={`${greeting}, ${firstName} ${lastName}`}
      description="Here's an overview of your creative workspace."
    />
  </div>
</div>


      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickAccessCard
          title="Blog Maker"
          icon={<FileEdit className="h-6 w-6" />}
          href="/blog-maker"
          color="bg-gradient-to-br from-pink-500 to-purple-500"
        />
        <QuickAccessCard
          title="Notes"
          icon={<StickyNote className="h-6 w-6" />}
          href="/notes"
          color="bg-gradient-to-br from-yellow-400 to-orange-500"
        />
        <QuickAccessCard
          title="Todo Lists"
          icon={<CheckSquare className="h-6 w-6" />}
          href="/todos"
          color="bg-gradient-to-br from-green-400 to-teal-500"
        />
        <QuickAccessCard
          title="Dashboard"
          icon={<LayoutDashboard className="h-6 w-6" />}
          href="/dashboard"
          color="bg-gradient-to-br from-blue-500 to-indigo-500"
        />
      </div>

      {/* Stats and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
        <QuickAccessCard
        
          title="Project Management"
          icon={<LayoutDashboard className="h-6 w-6" />}
          href="/project"
          color="bg-gradient-to-br from-orange-500 to-orange-800"
        />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 px-4">
              <div className="text-4xl font-bold mb-2">
                {new Date().getDate()}
              </div>
              <div className="font-medium">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', year: 'numeric' })}
              </div>
              <div className="mt-6 text-sm text-muted-foreground italic">
                "{randomQuote}"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
  
    </div>
  );
}

function QuickAccessCard({ title, icon, href, color }: { 
  title: string; 
  icon: React.ReactNode;
  href: string;
  color: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className={`${color} h-2`}></div>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
              {icon}
            </div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <a href={href}>
              <ArrowUpRightFromCircle className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
    </div>
  );
}

function ActivityItem({ 
  title, 
  description, 
  time, 
  type 
}: { 
  title: string;
  description: string;
  time: string;
  type: 'blog' | 'note' | 'task';
}) {
  const iconMap = {
    'blog': <FileEdit className="h-4 w-4" />,
    'note': <StickyNote className="h-4 w-4" />,
    'task': <CheckSquare className="h-4 w-4" />,
  };

  const colorMap = {
    'blog': 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    'note': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    'task': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`${colorMap[type]} p-2 rounded-full`}>
        {iconMap[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{title}</div>
        <div className="text-sm text-muted-foreground truncate">{description}</div>
      </div>
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        {time}
      </div>
    </div>
  );
}
