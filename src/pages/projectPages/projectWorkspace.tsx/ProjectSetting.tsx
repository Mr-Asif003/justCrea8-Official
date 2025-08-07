import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/Firebase/firebaseConfig';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const ProjectSettings = ({projectDetails}) => {
 
  const navigate = useNavigate();
   
  const [projectData, setProjectData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMemberUid, setNewMemberUid] = useState('');

  useEffect(() => {
    if (!projectId || !teamId) return;
    const fetchData = async () => {
      try {
        const projectSnap = await getDoc(doc(db, 'projects', projectId));
        const teamSnap = await getDoc(doc(db, 'teams', teamId));
        if (projectSnap.exists() && teamSnap.exists()) {
          setProjectData(projectSnap.data());
          const allMembers = [
            ...teamSnap.data()?.admin || [],
            ...teamSnap.data()?.members?.contributors || [],
            ...teamSnap.data()?.members?.mentors || [],
          ];
          setTeamMembers(allMembers);
        } else {
          toast.error('Project or Team not found');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, [projectId, teamId]);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        projectName: projectData.projectName,
        description: projectData.description,
      });
      toast.success('Project updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update project');
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      toast.success('Project deleted');
      navigate('/project/home');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  const handleAddMember = async () => {
    if (!newMemberUid) return toast.error('Select a member');
    try {
      const userSnap = await getDoc(doc(db, 'users', newMemberUid));
      const userData = userSnap.data();
      if (!userSnap.exists()) return toast.error('User not found');

      const updatedMembers = [...(projectData.projectMembers || []), {
        uid: newMemberUid,
        name: userData.name,
        email: userData.email,
      }];
      const updatedUids = [...(projectData.memberUids || []), newMemberUid];

      await updateDoc(doc(db, 'projects', projectId), {
        projectMembers: updatedMembers,
        memberUids: updatedUids,
      });

      setProjectData(prev => ({
        ...prev,
        projectMembers: updatedMembers,
        memberUids: updatedUids,
      }));

      setNewMemberUid('');
      toast.success('Member added');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add member');
    }
  };

  if (!projectData) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Project Settings</h1>

      <Card className="p-6 space-y-4 border shadow-sm">
        <Label>Project Name</Label>
        <Input
          value={projectData.projectName}
          onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}
        />
        <Label>Project Description</Label>
        <Textarea
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
        />
        <div className="flex gap-4">
          <Button onClick={handleUpdate}>Save Changes</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete Project</Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4 border shadow-sm">
        <h2 className="text-lg font-semibold">Add Members</h2>

        <div className="flex items-end gap-4">
          <div className="w-full">
            <Label>Select Member</Label>
            <Select onValueChange={setNewMemberUid} value={newMemberUid}>
              <SelectTrigger>
                <SelectValue placeholder="Select member to add" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.uid} value={member.uid}>
                    {member.name} ({member.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddMember}>Add</Button>
        </div>

        <div>
          <h3 className="font-medium mt-6">Current Members:</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {projectData.projectMembers?.map((m) => (
              <li key={m.uid}>
                {m.name} ({m.email})
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ProjectSettings;
