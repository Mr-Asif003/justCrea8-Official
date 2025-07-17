import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Button } from '@/components/ui/button';
import { onAuthStateChanged } from "firebase/auth";
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { CirclePlus, Edit } from 'lucide-react';
import pm from '../../assets/images/pm.jpg';
import TypeWriterEffect from 'react-typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/Firebase/firebaseConfig';
import { toast } from 'sonner';

export default function TeamsPage() {
  const { theme } = useTheme();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

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
        console.log(teams)
      } catch (error) {
        console.error("Error fetching teams data:", error);
        toast.error('Unable to fetch team data. Try again later.');
      }
    });

    return () => unsubscribe();
  }, []);

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <Card
            key={index}
            className={`border shadow-xl p-4 rounded-xl transition-all hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-black to-gray-900 text-white'
                : 'bg-white text-black'
            }`}
          >
            <div className="h-32 w-full overflow-hidden rounded-md mb-4">
              <img src={pm} alt="team" className="h-full w-full object-cover" />
            </div>
            <CardHeader className="p-0">
              <CardTitle className="text-lg flex justify-between text-cyan-500">
                <span className="font-semibold">{team.teamName}</span>
                <button onClick={() => handleEditTeam(team.id)} className='hover:opacity-75'>
                  <Edit />
                </button>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {team.teamDesc || 'No description provided.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 space-y-1 text-xs">
              <p>👤 Admin: {team.admin[0]?.name || 'Unknown'}</p>
              <p>🕓 Created At: {team.createdAt || 'N/A'}</p>
              <p>🔗 Team ID: {team.id}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleNavigation(team.id)} className="text-xs px-4 py-1 bg-cyan-600 hover:bg-cyan-700 text-white">View</Button>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
}
