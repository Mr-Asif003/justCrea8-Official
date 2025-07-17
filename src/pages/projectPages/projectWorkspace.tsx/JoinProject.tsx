import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { auth, db } from '@/Firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Lock, Link2 } from 'lucide-react';
import { Typography } from '@mui/material';

export default function JoinProject({teamId, onClose}) {
  const location = useLocation();

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    projectLink: '',
    password: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: currentUser.uid, ...userDoc.data() });
        } else {
          toast.error('User not found in database');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleJoin = async () => {
  const { projectLink, password } = formData;

  if (!projectLink || !password) {
    toast.error('Please fill all fields.');
    return;
  }

  if (!user) {
    toast.error('User not authenticated.');
    return;
  }

  try {
    const projectRef = doc(db, 'projects', projectLink);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      toast.error('❌ Project not found!');
      return;
    }

    const project = projectSnap.data();

    if (project.password !== password) {
      toast.error('Incorrect password!');
      return;
    }

    const existing = project.projectMembers || [];
    const alreadyJoined = existing.some((m) => m.uid === user.uid);

    if (alreadyJoined) {
      toast.info('You have already joined this project!');
      return;
    }

    const memberPayload = {
      uid: user.uid,
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      githubId: user.githubId || '',
      linkedInId: user.linkedInId || '',
      portfolio: user.portfolio || '',
      bio: user.bio || '',
      joinedAt: new Date().toISOString(),
    };

    // 1. Update the project document: add user to projectMembers
    await updateDoc(projectRef, {
      projectMembers: arrayUnion(memberPayload),
    });

    // 2. Update user's Firestore document: add project to joinedProjects
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      joinedProjects: arrayUnion(projectLink), // assuming projectLink is projectId
    });

    // 3. (Optional) Update team doc with joined project users if needed

    toast.success('🎉 Successfully joined the project!');
    setFormData({ projectLink: '', password: '' });
    if (onClose) onClose();
  } catch (error) {
    console.error('Join error:', error);
    toast.error('Failed to join project.');
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-gray-900 text-white px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-xl space-y-8">

        {/* Header */}
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-500 shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Join Project</h1>
          <p className="text-white/90 text-sm md:text-base">
            Enter the Project Link and Password to join. Collaborate and contribute!
          </p>
        </div>

        {/* Team ID Display */}
        <Typography variant="subtitle2" className="text-gray-400">
          Team ID: <span className="text-cyan-500 font-mono">{teamId || 'Not available'}</span>
        </Typography>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">

          {/* Project Link Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">Project Link</label>
            <Input
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              placeholder="Enter project link"
              className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 font-medium">Project Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter project password"
              className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
            />
          </div>

          {/* Join Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleJoin}
            sx={{
              backgroundColor: '#06b6d4',
              '&:hover': { backgroundColor: '#0891b2' },
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: '12px',
              paddingY: '10px',
              color: 'white',
            }}
          >
            Join Project
          </Button>
        </div>
      </div>
    </div>
  );
}
