'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CirclePlus, Clock, Delete, DeleteIcon, Group } from 'lucide-react';
import { Fade } from 'react-awesome-reveal';
import TypeWriterEffect from 'react-typewriter-effect';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { auth, db } from '@/Firebase/firebaseConfig';
import { toast } from 'sonner';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function GDHome({ projectDetails }) {
  const theme = useTheme();

  const [createBtn, setCreateBtn] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [meetingPassword, setMeetingPassword] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [joinUserName, setJoinUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const navigate = useNavigate();
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    if (projectDetails?.meetings) {
      setMeetings(projectDetails.meetings);
    }
  }, [projectDetails]);

  const handleJoin = () => {
    if (!joinUserName || !enteredPassword) {
      toast.error('Please enter your name and password');
      return;
    }
    if (selectedMeeting.password !== enteredPassword) {
      toast.error('Incorrect password');
      return;
    }
    navigate(`./${selectedMeeting.roomId}`, {
      state: {
        userName: joinUserName,
        roomName: selectedMeeting.title,
      },
    });
  };
  const handleDelete = async (roomIdToDelete) => {
  try {
    const updatedMeetings = meetings.filter(meeting => meeting.roomId !== roomIdToDelete);
    const projectRef = doc(db, 'projects', projectDetails.projectId);

    await updateDoc(projectRef, {
      meetings: updatedMeetings,
    });

    setMeetings(updatedMeetings);
    toast.success('Meeting deleted successfully');
  } catch (error) {
    console.error('Error deleting meeting:', error);
    toast.error('Failed to delete meeting');
  }
};


  const handleCreateRoom = () => {
    if(meetings.length>3){
      toast.success('You can only create atmost 3 rooms ')
     return
    }
    setOpenCreateDialog(true);
  };

  const handleCreateMeetingConfirm = async () => {
    if (!meetingTitle || !meetingStartTime) {
      toast.error('Please fill all required fields.');
      return;
    }

    const newMeeting = {
      title: meetingTitle,
      host: currentUserUid,
      roomId: Math.random().toString(36).slice(2, 10),
      isPublic,
      password: isPublic ? '123' : meetingPassword,
      startTime: meetingStartTime,
    };

    try {
      const projectRef = doc(db, 'projects', projectDetails.projectId);
      await updateDoc(projectRef, {
        meetings: arrayUnion(newMeeting),
      });
      setMeetings(prev => [...prev, newMeeting]);
      toast.success('Room Created Successfully.');
      setOpenCreateDialog(false);
      setMeetingTitle('');
      setIsPublic(true);
      setMeetingPassword('');
      setMeetingStartTime('');
    } catch (e) {
      toast.error('Error creating room');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <header className="bg-gray-900 p-4 text-lg md:text-xl font-serif border w-full shadow-md shadow-cyan-600">
        <div className="flex justify-between">
          <h1 className="font-bold text-cyan-500">Welcome to Group Discussion</h1>
          <Group className="animate-spin" />
        </div>
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display', fontSize: '14px' }}
          startDelay={200}
          cursorColor="white"
          text="Create rooms and meetings and do discussion with your teammates in just one click..."
          typeSpeed={90}
        />
      </header>

      <section className="flex flex-col md:flex-row gap-2">
        <div className="w-auto mt-12  border-orange-700 p-10 py-10 h-auto gap-4 flex justify-between items-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-95 bg-gradient-to-br hover:shadow-cyan-500 rounded-xl shadow-md hover:border-none border backdrop-blur-xl">
          <Fade>
            <div className='p'>
              <h2 className="text-lg font-semibold text-cyan-500 font-mono text-start">Create Meeting</h2>
              <p className="text-xs">start discussing and meeting with you team mates by creating rooms</p>

            </div>
          </Fade>
          <button onClick={handleCreateRoom} className="bg-black hover:animate-spin p-3 rounded-full">
            <CirclePlus size={20} color="white" />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-semibold text-cyan-500 font-mono">Active Meetings</h2>
        {meetings.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active meetings right now.</p>
        ) : (
          meetings.map((meeting, index) => (
            <div
              key={index}
              className="p-4 flex justify-between items-center rounded-xl shadow-sm border backdrop-blur-xl transition-all duration-300 hover:shadow-cyan-500"
            >
              <div>
                <h3 className="text-base font-medium text-white">{meeting.title}</h3>
                <p className="text-xs text-muted-foreground">Host: {meeting.host}</p>
                <div className="flex text-sm gap-2 py-2 items-center text-white">
                  <Clock size={16} /> Start At: {meeting.startTime}
                </div>
                {meeting.host === currentUserUid && (
                  <div className="text-sm mt-2 space-y-1 text-white">
                    <p>Room ID: <span className="font-mono">{meeting.roomId}</span></p>
                    <p>Room Password: <span className="font-mono">{meeting.password}</span></p>
                    <button onClick={() => {
               
                  handleDelete(meeting.roomId)
                }} className='p-2 bg-red-700 rounded-sm'>
                      Delete
          
                    </button>
                  </div>

                )}
              </div>
              <Button
                onClick={() => {
                  setSelectedMeeting(meeting);
                  setOpenJoinDialog(true);
                }}
                className="bg-cyan-600 text-white px-4 py-2 text-sm rounded-md hover:bg-cyan-700"
              >
                Join Room
              </Button>
            </div>
          ))
        )}
      </section>

      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="bg-black text-white border border-cyan-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 font-mono">Create New Meeting</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <Label className="text-white">Meeting Title</Label>
            <Input value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} className="bg-white/10 text-white" />

            <div className="flex items-center justify-between">
              <Label className="text-white">Is Public?</Label>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            {!isPublic && (
              <div>
                <Label className="text-white">Meeting Password</Label>
                <Input type="password" value={meetingPassword} onChange={(e) => setMeetingPassword(e.target.value)} className="bg-white/10 text-white" />
              </div>
            )}

            <Label className="text-white">Start Time</Label>
            <Input type="datetime-local" value={meetingStartTime} onChange={(e) => setMeetingStartTime(e.target.value)} className="bg-white/10 text-white" />
          </div>

          <DialogFooter>
            <Button onClick={handleCreateMeetingConfirm} className="bg-cyan-600 hover:bg-cyan-700 text-white w-full">
              Create Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openJoinDialog} onOpenChange={setOpenJoinDialog}>
        <DialogContent className="bg-black text-white border border-cyan-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 font-mono">Join Meeting</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <Label className="text-white">Your Name</Label>
            <Input value={joinUserName} onChange={(e) => setJoinUserName(e.target.value)} className="bg-white/10 text-white" />

            <Label className="text-white">Meeting Password</Label>
            <Input type="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} className="bg-white/10 text-white" />
          </div>

          <DialogFooter>
            <Button onClick={handleJoin} className="bg-cyan-600 hover:bg-cyan-700 text-white w-full">
              Join Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}