import React, { useEffect, useState } from "react";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import TypeWriterEffect from "react-typewriter-effect";
import { User, CalendarClock, CheckCircle2, CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import pm from "../../assets/images/pm.jpg";
import CreateProjectDialog from "./projectWorkspace.tsx/CreateProjectDialog";
import JoinProjectDialog from "./projectWorkspace.tsx/JoinProjectDailog";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { set } from "date-fns";

export default function SpecificTeams() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { teamId } = location.state || {};
  const [teamData, setTeamData] = useState(null);
  const [members, setMembers] = useState([]);
  const [projectIds, setProjectIds] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // 🔁 Fetch team data and members
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamRef = doc(db, "teams", teamId);
        const dataSnap = await getDoc(teamRef);
        if (dataSnap.exists()) {
          const data = dataSnap.data();
          setTeamData(data);
          setMembers(Array.isArray(data.members) ? data.members : []);
          setProjectIds(data.projects || []);
          
        } else {
          toast.error("Team not found");
        }
      } catch (e) {
        console.error("Error fetching team data", e);
        toast.error("Failed to fetch team data");
      }
    };

    if (teamId) fetchTeam();
  }, [teamId]);

  // 🔁 Fetch project data
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = [];
      for (const pid of projectIds) {
        try {
          const ref = doc(db, "projects", pid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            projects.push({ id: pid, ...snap.data() });
          }
        } catch (err) {
          console.error("Error fetching project:", err);
        }
      }
      setProjectData(projects);
      if (projects.length === 0) {
        toast.info("No projects found for this team.");
      }
      console.log("Projects fetched:", projects);
    };

    if (projectIds.length > 0) fetchProjects();
  }, [projectIds]);

 const handleCreateNav = () => {
  if (!teamId) return toast.error("Team ID not found.");
  setConfirm(true);
  setShowConfirm(false);
  setOpenCreateDialog(true); // just opens it, rendering handled below
};

const handleConfirm = () => {
  setShowConfirm(true);
};

  const handleJoinNav = () => {
    if (!teamId) return toast.error("Team ID not found.");
    setOpenJoinDialog(true); // just opens it, rendering handled below
  };

  const handleNavigation = (projectId) => {
    navigate(`./{projectId}`)
  };

  return (
    <div className="px-6 py-10 space-y-10">
      {/* HEADER */}
      <section className={`rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="flex-1">
          <Fade>
            <h1 className="text-2xl font-bold text-cyan-400 mb-2">
              🚀 {teamData?.teamName || "Loading..."}
            </h1>
          </Fade>
          {teamData?.teamDesc && (
            <TypeWriterEffect
              textStyle={{ fontFamily: "Red Hat Display", fontSize: "16px" }}
              startDelay={200}
              cursorColor="white"
              text={teamData.teamDesc}
              typeSpeed={90}
            />
          )}
          <div className="mt-6 text-gray-400 text-sm">
            <p>🕓 Created: {teamData?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <div className="w-32 h-16 overflow-hidden rounded-lg">
            <img src={pm} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="text-sm text-cyan-300">
            <p>👤 Admin: <strong>{teamData?.admin?.[0]?.name || "N/A"}</strong></p>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            <p>🔗 Team ID: {teamId}</p>
            <p>🔒 Only admin has team password</p>
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-col md:flex-row gap-2">
        {[{ label: "Create Project", action: handleConfirm }, { label: "Join Projects", action: handleJoinNav }].map((item, i) => (
          <div key={i} className={`w-full md:w-1/2 p-6 flex justify-between items-center rounded-xl shadow-xl border backdrop-blur-xl ${theme === "dark" ? "bg-gradient-to-r from-black to-gray-800 border-white/20" : "bg-white/10"}`}>
            <div>
              <Fade>
                <h2 className="text-lg font-semibold text-cyan-500 font-mono">
                  {item.label}
                </h2>
                <p className="text-xs">Start {item.label.includes("Create") ? "building" : "contributing to"} ideas</p>
              </Fade>
            </div>
            <button onClick={item.action} className="bg-black hover:animate-spin p-3 rounded-full">
              <CirclePlus size={20} color="white" />
            </button>
          </div>
        ))}
      </section>
      <section>
        <CreateProjectDialog
  open={openCreateDialog}
  onClose={() => setOpenCreateDialog(false)}
  teamId={teamId}
/>  
      </section>
 
      {/* CONFIRM DIALOG */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
  <DialogTitle className="font-bold text-lg">Confirm Team Members</DialogTitle>
  <DialogContent>
    <p className="text-sm">
      ⚠️ Before proceeding, please make sure that all selected project members have already joined the team and created their accounts in the system.
    </p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowConfirm(false)} color="inherit">
      Cancel
    </Button>
    <Button
     onClick={ handleCreateNav}
    >
      Yes, Continue
    </Button>
  </DialogActions>
</Dialog>




      {/* CREATE PROJECT DIALOG */}
      <section>
        <CreateProjectDialog
  open={openCreateDialog}
  onClose={() => setOpenCreateDialog(false)}
  teamId={teamId}
/>

        
      </section>
    {/* join dailog */}
    <section>
      <JoinProjectDialog
        open={openJoinDialog}
        onClose={() => setOpenJoinDialog(false)}
        teamId={teamId}
      />
    </section>

      {/* PROJECT CARDS */}
      <section className="rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-500 mb-6 font-mono">🚀 Team Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectData.map((p, i) => (
            <Card
              key={i}
              className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${p.priority === 'High' ? 'border-red-600' : 'border-yellow-500'} hover:scale-[1.02] shadow-xl bg-transparent`}
            >
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-purple-500 opacity-10 blur-3xl transition-transform group-hover:scale-125" />
              <CardHeader className="z-10 relative">
                <CardTitle className="text-xl font-bold text-purple-600 group-hover:text-purple-400">
                  🚀 {p.projectName}
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {p.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="z-10 relative mt-3 space-y-2 text-sm">
                <p>👑 <span className="text-purple-400 font-medium">Admin:</span> {p.teamAdmin?.name || 'N/A'}</p>
                <p>📋 <span className="text-cyan-400 font-medium">Manager:</span> {p.projectManager?.name || 'N/A'}</p>
                <p>📅 <span className="text-gray-400 font-medium">Created At:</span> {p.createdAt?.split('T')[0] || 'N/A'}</p>
                <div className="flex justify-between text-sm">
                  <p>🟢 <span className="text-green-500 font-medium">Start:</span> {p.startAt || '—'}</p>
                  <p>🔴 <span className="text-red-400 font-medium">End:</span> {p.endAt || '—'}</p>
                </div>
                <p>🫡 <span className="text-amber-700">Project Id:</span> {p.projectId}</p>
              </CardContent>
              <CardFooter className="relative z-10 mt-4 flex justify-end">
                <Button
                  onClick={() => handleNavigation(p.id)}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm px-5 py-2 shadow-md"
                >
                  🔍 Check
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="rounded-xl p-6 shadow-xl dark:bg-cyan-800">
        <h1 className="text-xl font-serif text-cyan-400 mb-4">📃 Team Members</h1>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 bg-muted/30">
            <TabsTrigger value="details"><User size={16} /> Details</TabsTrigger>
            <TabsTrigger value="upcoming"><CalendarClock size={16} /> Upcoming <Badge variant="outline">3</Badge></TabsTrigger>
            <TabsTrigger value="completed"><CheckCircle2 size={16} /> Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member, i) => (
                <Card key={i} className="border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-cyan-500 text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-xs text-gray-400">UID: {member.uid || "N/A"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">📧 {member.email}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Placeholder Tabs */}
          <TabsContent value="upcoming">
            <Card className="border border-white/10 shadow-md">
              <CardHeader><CardTitle className="text-yellow-400">Upcoming Tasks</CardTitle></CardHeader>
              <CardContent className="text-sm">coming soon...</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card className="border border-white/10 shadow-md">
              <CardHeader><CardTitle className="text-green-400">Completed Projects</CardTitle></CardHeader>
              <CardContent className="text-sm">
                <p>✅ User Login System</p>
                <p>✅ Team Creation UI</p>
                <p>✅ Firebase Auth</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
