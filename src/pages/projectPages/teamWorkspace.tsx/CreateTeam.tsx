import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import { auth, db } from '@/Firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';

export default function CreateTeam() {
  const currentUser = auth?.currentUser;
  const currentUserUID = currentUser?.uid;
  const currentUserEmail = currentUser?.email;

  const [addMentor, setAddMentor] = useState(false);
  const [createData, setCreateData] = useState({
    teamName: '',
    teamDesc: '',
    password: '',
    adminEmail: currentUserEmail || '',
    contributors: [''],
    mentors: [''],
  });

  const handleAddContributor = () => {
    setCreateData((prev) => ({
      ...prev,
      contributors: [...prev.contributors, ''],
    }));
  };

  const handleDeleteContributor = (idx) => {
    setCreateData((prev) => ({
      ...prev,
      contributors: prev.contributors.filter((_, i) => i !== idx),
    }));
  };

  const handleAddMentor = () => {
    setCreateData((prev) => ({
      ...prev,
      mentors: [...prev.mentors, ''],
    }));
  };

  const handleDeleteMentor = (idx) => {
    setCreateData((prev) => ({
      ...prev,
      mentors: prev.mentors.filter((_, i) => i !== idx),
    }));
  };

  const handleCreateTeam = async () => {
    try {
      const teamRef = collection(db, 'teams');

      const members = [];

      members.push({
        name: currentUser?.displayName || 'Admin',
        email: createData.adminEmail,
        uid: currentUserUID,
      });

      createData.contributors.forEach((email, i) => {
        if (email.trim()) {
          members.push({
            name: `Contributor ${i + 1}`,
            email: email.trim(),
            uid: '',
          });
        }
      });

      createData.mentors.forEach((email, i) => {
        if (email.trim()) {
          members.push({
            name: `Mentor ${i + 1}`,
            email: email.trim(),
            uid: '',
          });
        }
      });

      const newTeam = {
        teamName: createData.teamName,
        teamDesc: createData.teamDesc,
        password: createData.password,
        createdBy: currentUserUID,
        createdAt: new Date().toISOString(),
        memberEmails: members.map((m) => m.email),
        members: members,
        admin: [
          {
            name: currentUser?.displayName || 'Admin',
            email: createData.adminEmail,
            uid: currentUserUID,
          },
        ],
        projects: [],
      };

      const docRef = await addDoc(teamRef, newTeam);
      await updateDoc(docRef, { teamId: docRef.id });

      const userRef = doc(db, 'users', currentUserUID);
      await updateDoc(userRef, {
        createdTeams: arrayUnion(docRef.id),
        joinedTeams: arrayUnion(docRef.id),
      });

      toast.success('🎉 Team created successfully!');
      setCreateData({
        teamName: '',
        teamDesc: '',
        password: '',
        adminEmail: currentUserEmail || '',
        contributors: [''],
        mentors: [''],
      });
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to create team');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-gray-900 text-white px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-8">

        {/* Header */}
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-500 shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">🚀 Create Team</h1>
          <p className="text-white/90 text-sm md:text-base">
            Fill in the team details and start building your dream project team!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">

          <Input
            placeholder="Team Name"
            value={createData.teamName}
            onChange={(e) => setCreateData({ ...createData, teamName: e.target.value })}
            className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
          />

          <Input
            placeholder="Team Description or Hashtag"
            value={createData.teamDesc}
            onChange={(e) => setCreateData({ ...createData, teamDesc: e.target.value })}
            className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
          />

          <Input
            placeholder="Team Password"
            value={createData.password}
            onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
            className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
          />

          {/* Contributors */}
          <div className="space-y-3">
            <h2 className="text-gray-300 font-semibold">Contributors</h2>
            {createData.contributors.map((email, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => {
                    const updated = [...createData.contributors];
                    updated[idx] = e.target.value;
                    setCreateData({ ...createData, contributors: updated });
                  }}
                  placeholder={`Contributor ${idx + 1} Email`}
                  className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteContributor(idx)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              variant="outlined"
              sx={{ borderColor: '#06b6d4', color: '#06b6d4' }}
              onClick={handleAddContributor}
            >
              + Add Contributor
            </Button>
          </div>

          {/* Mentors */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-300 font-semibold">Mentors (Optional)</h2>
              <Button
                variant="outlined"
                onClick={() => setAddMentor(!addMentor)}
                sx={{ color: '#06b6d4', borderColor: '#06b6d4' }}
              >
                {addMentor ? 'Hide' : 'Add'}
              </Button>
            </div>

            {addMentor &&
              createData.mentors.map((email, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={email}
                    onChange={(e) => {
                      const updated = [...createData.mentors];
                      updated[idx] = e.target.value;
                      setCreateData({ ...createData, mentors: updated });
                    }}
                    placeholder={`Mentor ${idx + 1} Email`}
                    className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteMentor(idx)}
                  >
                    Delete
                  </Button>
                </div>
              ))}

            {addMentor && (
              <Button
                variant="outlined"
                onClick={handleAddMentor}
                sx={{ borderColor: '#06b6d4', color: '#06b6d4' }}
              >
                + Add Mentor
              </Button>
            )}
          </div>

          {/* Create Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateTeam}
            sx={{
              backgroundColor: '#9333ea',
              '&:hover': { backgroundColor: '#6b21a8' },
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              paddingY: '10px',
              borderRadius: '12px',
              color: 'white',
            }}
          >
            🚀 Create Team
          </Button>
        </div>
      </div>
    </div>
  );
}
