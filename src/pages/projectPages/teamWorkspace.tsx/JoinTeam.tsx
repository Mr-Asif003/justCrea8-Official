import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/Firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { toast } from 'sonner';
import { Lock, KeyRound, Backpack, CircleArrowRight, CircleArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JoinTeam() {
  const [form, setForm] = useState({ teamId: '', password: '' });
  const [loading, setLoading] = useState(false);
   const navigate=useNavigate()
 const currentUser = auth?.currentUser;
  const handleJoin = async () => {
    const { teamId, password } = form;
    if (!teamId || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const teamRef = doc(db, 'teams', teamId.trim());
      const teamSnap = await getDoc(teamRef);

      if (!teamSnap.exists()) {
        toast.error('Team ID not found');
        setLoading(false);
        return;
      }

      const teamData = teamSnap.data();
      if (teamData.password !== password.trim()) {
        toast.error('Incorrect password');
        setLoading(false);
        return;
      }

   
      const email = currentUser?.email;
      const uid = currentUser?.uid;
      const name = currentUser?.displayName || 'Unnamed';
 console.log(email)
      if (!uid || !email) {
        toast.error('User not authenticated');
        setLoading(false);
        return;
      }

      if (!teamData.memberEmails.includes(email)) {
        toast.error('Your email is not authorized to join this team');
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        joinedTeams: arrayUnion(teamId),
      });

      const updatedContributors = Array.isArray(teamData.members?.contributors)
        ? [...teamData.members.contributors]
        : [];

      const alreadyAdded = updatedContributors.some((m) => m.uid === uid);
      if (!alreadyAdded) {
        updatedContributors.push({ email, uid, name });
      }

      const updatedEmails = teamData.memberEmails.includes(email)
        ? teamData.memberEmails
        : [...teamData.memberEmails, email];

      await updateDoc(teamRef, {
        'members.contributors': updatedContributors,
        memberEmails: updatedEmails,
      });

      toast.success('Successfully joined the team!');
      setForm({ teamId: '', password: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to join. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-950 to-gray-900 text-white px-4 py-10  sm:flex items-start justify-center">
     
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Join Team</h1>
          <p className="text-white/90 text-sm md:text-base">
            Enter your Team ID and password to join a project. Only authorized users can access the team.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
          {/* Team ID */}
          <div className="relative">
            <Input
              placeholder=" "
              value={form.teamId}
              onChange={(e) => setForm({ ...form, teamId: e.target.value })}
              className="peer bg-white/10 text-white placeholder-transparent border border-white/20 focus:ring-cyan-500 px-12 py-4 rounded-xl w-full"
            />
            <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <label className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
              Team ID
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type="password"
              placeholder=" "
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="peer bg-white/10 text-white placeholder-transparent border border-white/20 focus:ring-cyan-500 px-12 py-4 rounded-xl w-full"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <label className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
              Team Password
            </label>
          </div>

          {/* Join Button */}
          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-md font-semibold rounded-xl transition-all duration-300 py-3"
            onClick={handleJoin}
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Team'}
          </Button>
        </div>
      </div>
    </div>
  );
}
