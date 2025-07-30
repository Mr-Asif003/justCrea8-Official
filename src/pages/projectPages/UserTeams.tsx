import React, { useEffect, useState } from 'react';
import {
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardHeader,
} from '@mui/material';
import { Button } from '@/components/ui/button';
import { onAuthStateChanged } from "firebase/auth";
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { CirclePlus, Edit, Users, Calendar, Hash } from 'lucide-react';
import pm from '../../assets/images/pm.jpg';
import TypeWriterEffect from 'react-typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/Firebase/firebaseConfig';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function TeamsPage() {
  const { theme } = useTheme();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleNavigation = (id) => {
    setSnackbar({ open: true, message: 'Navigating to selected team ' });
    navigate(`./teamId`, {
      state: {
        teamId: id,
      },
    });
  };

  const handleEditTeam = (id) => {
    navigate(`/project/updateteam`, {
      state: {
        teamId: id,
      },
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const data = userDoc?.data() || {};

        const created = Array.isArray(data.createdTeams) ? data.createdTeams : [];
        const joined = Array.isArray(data.joinedTeams) ? data.joinedTeams : [];

        const uniqueteamIds = [...new Set([...created, ...joined])];

        toast.success('Team data successfully fetched');

        const teamDocs = await Promise.all(
          uniqueteamIds.map(async (teamId) => {
            const teamRef = doc(db, "teams", teamId);
            const teamSnap = await getDoc(teamRef);
            return teamSnap.exists() ? { id: teamId, ...teamSnap.data() } : null;
          })
        );

        const rev = [...teamDocs].reverse();
        setTeams(rev.filter(Boolean));
      } catch (error) {
        console.error("Error fetching teams data:", error);
        toast.error('Unable to fetch team data. Try again later.');
      }
    });

    return () => unsubscribe();
  }, []);

const handleDeleteConfirm = async () => {
  if (!selectedTeamId) return;

  try {
    const teamRef = doc(db, "teams", selectedTeamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      toast.error("Team not found.");
      return;
    }

    const teamData = teamSnap.data();
    const currentUserUID = auth.currentUser?.uid;

    if (teamData.createdBy !== currentUserUID) {
      toast.error("Only the team creator can delete this team.");
      return;
    }

    const projectIds = Array.isArray(teamData.projects) ? teamData.projects : [];

    if (projectIds.length === 0) {
      console.warn("No projects found to delete for this team.");
    }

    for (const projectId of projectIds) {
      if (!projectId) continue;
      try {
        await deleteDoc(doc(db, "projects", projectId));
        
      } catch (error) {
        console.error(`Failed to delete project ${projectId}:`, error);
      }
    }

    // Finally, delete the team
    await deleteDoc(teamRef);
    setTeams((prev) => prev.filter((team) => team.id !== selectedTeamId));
    toast.success("Team and associated projects deleted.");
  } catch (error) {
    console.error("Error deleting team:", error);
    toast.error("Failed to delete team.");
  } finally {
    setShowDeleteDialog(false);
    setSelectedTeamId(null);
  }
};




  return (
    <div className="px-6 py-10 space-y-10">
      <h2 className="text-2xl font-bold text-cyan-400">🢑 Your Teams</h2>

      <section className={`bg-gradient-to-r border-white/20 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black to-gray-900 border-white/20 text-white'
          : 'bg-white/10 text-black'
      }`}>
        <div className="flex-1">
          <Fade>
            <h1 className="text-2xl font-bold text-cyan-400 mb-2">🚀 Your Team Workspace</h1>
          </Fade>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display', fontSize: '16px' }}
            startDelay={200}
            cursorColor="white"
            text="Manage all your teams in one place with JustCrea8."
            typeSpeed={90}
          />
          <div className="mt-6 text-gray-400 text-sm flex gap-6">
            <p>🕓 Last Updated: {teams[0]?.createdAt}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="bg-cyan-800 text-white w-32 h-16 flex items-center justify-center text-sm md:text-lg rounded-lg">
            <img src={pm} className='w-full object-cover rounded-sm' alt="pm" />
          </div>
          <div className="text-sm mt-2 text-cyan-300">
            <p>👤 Total Teams: {teams.length}</p>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            <p>🔗 View and manage your teams below</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {teams.map((team) => (
          <Card key={team.id} className="bg-background/60 mt-4 hover:bg-background/90 backdrop-blur-sm transition-all shadow-md  hover:translate-y-2 bg-gradient-to-br border hover:border-sky-400  hover:shadow-purple-500  ">
            <CardContent className="flex items-center justify-end p-2">
        
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditTeam(team.id)}
                  className="text-xs p-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
            <CardContent className="p-5">
              <div className="w-16 h-16 rounded-full bg-cyan-400 text-cyan-800 font-bold flex items-center justify-center text-xl mx-auto">
                {team.teamName?.[0]?.toUpperCase() || 'T'}
              </div>
              <h3 className="text-center text-xl font-semibold mt-4 text-foreground">
                {team.teamName}
              </h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                {team.teamDesc || 'No description provided.'}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-cyan-500" />
                <span className="font-medium">{team.admin?.[0]?.name || 'Admin'}</span>
                <span className="text-xs text-muted-foreground">({team.admin?.[0]?.email})</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>{new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground truncate">
                <Hash className="w-4 h-4 text-cyan-500" />
                <span className="truncate">{team.id}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
              <Button
                onClick={() => {
                  setSelectedTeamId(team.id);
                  setShowDeleteDialog(true);
                }}
                className="text-xs px-4 py-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
              <Button
                onClick={() => handleNavigation(team.id)}
                className="text-xs px-4 py-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className={`bg-gradient-to-r border-white/20 rounded-xl shadow-md p-6 flex flex-col gap-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-black to-gray-900 text-white'
          : 'bg-white/10 text-black'
      }`}>
        <h1 className="font-serif text-xl text-cyan-400 mb-4">Teams Activity</h1>
        <Tabs defaultValue="teamdetails" className="w-full">
          <TabsList className='justify-around'>
            <TabsTrigger value="teamdetails" className='text-xs md:text-sm'>Details</TabsTrigger>
            <TabsTrigger value="upcoming" className='text-xs md:text-sm'>Upcoming</TabsTrigger>
            <TabsTrigger value="completed" className='text-xs md:text-sm'>Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="teamdetails">
            <Card>
              <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
                <p>🧠 You are part of {teams.length} teams.</p>
                <p>💡 Manage team roles, track activities, and join new projects here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming">
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                <p>📌 No upcoming events. Stay tuned!</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card>
              <CardContent className="p-4 text-sm text-muted-foreground">
                <p>✅ You’ve completed 3 collaborative sprints this month!</p>
                <p>🎉 Keep up the great teamwork!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Are you sure?</DialogTitle>
          <p className="text-sm text-muted-foreground">
            This will delete the team and all associated projects. This action is irreversible.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
}
