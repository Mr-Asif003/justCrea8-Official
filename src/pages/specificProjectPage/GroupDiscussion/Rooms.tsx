import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, Pause, Square, SkipForward, Clock, Users, 
  ThumbsUp, MessageCircle, Star, Download, Volume2,
  Settings, Trophy, User, Shuffle, Target
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { db } from '@/Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { realtimeDb } from '@/Firebase/firebaseConfig';

import { getDatabase, ref, set, onValue, off } from "firebase/database";


interface TeamMember {
  id: string;
  name: string;

  participationScore: number;
  timeSpoken: number;
  lastSpoke?: Date;
}

interface Feedback {
  type: 'thumbs-up' | 'clarification' | 'good-point';
  from: string;
  to: string;
  timestamp: Date;
}

interface DiscussionNote {
  speakerId: string;
  note: string;
  timestamp: Date;
}

// const dummyMembers: TeamMember[] = [
//   {
//     id: '1',
//     name: 'Mr. Ak King',
//     participationScore: 85,
//     timeSpoken: 0
//   },
 
// ];

type SelectionMode = 'manual' | 'random' | 'time-based' ;
type DiscussionStatus = 'idle' | 'active' | 'paused' | 'ended';

export default function Rooms({roomId,projectId}) {
  const [topic, setTopic] = useState('');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('manual');
  const [discussionStatus, setDiscussionStatus] = useState<DiscussionStatus>('idle');
  const [currentSpeaker, setCurrentSpeaker] = useState<TeamMember | null>(null);
  const [timePerSpeaker, setTimePerSpeaker] = useState(120); // seconds
  const [remainingTime, setRemainingTime] = useState(0);
  const [speakerHistory, setSpeakerHistory] = useState<TeamMember[]>([]);
  
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [notes, setNotes] = useState<DiscussionNote[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [meetings,setMeetings]=useState([])
  const [members,setMembers]=useState([])
  const [customTime ,setCustomTime]=useState('null')
   useEffect(() => {
      const fetchDetails = async () => {
        const projectRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(projectRef);
        const data = docSnap.data();
        console.log(data)
        if (data?.meetings) {
          setMeetings(data.meetings);
          
            const m=meetings.filter((mt)=>mt.roomId==roomId)
          
            console.log(m)
          
        }
      };
      fetchDetails();
    }, []);
    useEffect(() => {
  if (!roomId || !Array.isArray(meetings)) return;

  const matchedMeeting = meetings.find((m) => m.roomId === roomId);

  if (matchedMeeting && Array.isArray(matchedMeeting.members)) {
    setMembers(matchedMeeting.members);
  } else {
    setMembers([]);
  }
}, [meetings, roomId]);

   //realtime listner....
useEffect(() => {
  if (!roomId) return;

  const refPath = ref(realtimeDb, `discussions/${roomId}`);

  const unsubscribe = onValue(refPath, (snapshot) => {
    const data = snapshot.val();
    if (data?.currentSpeaker) {
      setCurrentSpeaker(data.currentSpeaker);
    } else {
      setCurrentSpeaker(null);
    }

    if (typeof data?.remainingTime === 'number') {
      setRemainingTime(data.remainingTime);
    }
  });

  return () => off(refPath, 'value', unsubscribe);
}, [roomId]);



  // Timer effect
useEffect(() => {
  let interval: NodeJS.Timeout;
  if (discussionStatus === 'active' && remainingTime > 0) {
    interval = setInterval(() => {
      setRemainingTime(prev => {
        const updated = prev - 1;
        if (updated <= 0) {
          handleNextSpeaker();
          return 0;
        }

        // Push to Realtime DB
        const timeRef = ref(realtimeDb, `discussions/${roomId}/remainingTime`);
        set(timeRef, updated);

        return updated;
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [discussionStatus, remainingTime]);

  const startDiscussion = () => {
    if (!topic.trim()) {
      toast({ title: "Please enter a discussion topic", variant: "destructive" });
      return;
    }
    setDiscussionStatus('active');
    selectNextSpeaker();
    toast({ title: "Discussion started!", description: `Topic: ${topic}` });
  };

  const pauseDiscussion = () => {
    setDiscussionStatus('paused');
    toast({ title: "Discussion paused" });
  };

  const resumeDiscussion = () => {
    setDiscussionStatus('active');
    toast({ title: "Discussion resumed" });
  };

  const stopDiscussion = () => {
    setDiscussionStatus('ended');
    setCurrentSpeaker(null);
updateCurrentSpeakerInRealtime(null);

    setRemainingTime(0);
    toast({ title: "Discussion ended" });
  };

  const selectNextSpeaker = () => {
    const availableMembers = members.filter(m => !speakerHistory.includes(m));
    
    if (availableMembers.length === 0) {
      stopDiscussion();
      return;
    }

    let nextSpeaker: TeamMember;

    switch (selectionMode) {
      case 'random':
        nextSpeaker = availableMembers[Math.floor(Math.random() * availableMembers.length)];
        break;
     
      case 'time-based':
        nextSpeaker = availableMembers.sort((a, b) => a.timeSpoken - b.timeSpoken)[0];
        break;
      default:
        nextSpeaker = availableMembers[0];
    }

    setCurrentSpeaker(nextSpeaker);
updateCurrentSpeakerInRealtime(nextSpeaker);

    
    setRemainingTime(timePerSpeaker);
    setSpeakerHistory(prev => [...prev, nextSpeaker]);
    
    // Update member stats
    setMembers(prev => prev.map(m => 
      m.id === nextSpeaker.id 
        ? { ...m, timeSpoken: m.timeSpoken + timePerSpeaker, lastSpoke: new Date() }
        : m
    ));
  };

  const handleNextSpeaker = () => {
    if (currentNote.trim() && currentSpeaker) {
      setNotes(prev => [...prev, {
        speakerId: currentSpeaker.id,
        note: currentNote,
        timestamp: new Date()
      }]);
      setCurrentNote('');
    }
    selectNextSpeaker();
  };

  const handleManualSelect = (member: TeamMember) => {
    if (selectionMode === 'manual' && discussionStatus === 'active') {
    setCurrentSpeaker(member);
updateCurrentSpeakerInRealtime(member);

      setRemainingTime(timePerSpeaker);
      if (!speakerHistory.includes(member)) {
        setSpeakerHistory(prev => [...prev, member]);
      }
    }
  };

  const addFeedback = (type: Feedback['type'], toMember: TeamMember) => {
    const newFeedback: Feedback = {
      type,
      from: 'Current User', // In real app, this would be the current user
      to: toMember.name,
      timestamp: new Date()
    };
    setFeedback(prev => [...prev, newFeedback]);
    toast({ title: `Feedback sent to ${toMember.name}` });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = remainingTime > 0 ? (remainingTime / timePerSpeaker) * 100 : 0;

  const handleCustomTime=()=>[
    setTimePerSpeaker(Number(customTime))
  ]



const updateCurrentSpeakerInRealtime = (speaker: TeamMember | null) => {
  if (!roomId) return;
  const speakerRef = ref(realtimeDb, `discussions/${roomId}`);
  set(speakerRef, speaker ? {
    currentSpeaker: { ...speaker, timestamp: Date.now() },
    remainingTime: timePerSpeaker,
  } : {
    currentSpeaker: null,
    remainingTime: 0,
  });
};


  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Group Discussion</h1>
              {topic && (
                <Badge variant="outline" className="text-sm">
                  {topic}
                </Badge>
              )}
            </div>
            {currentSpeaker && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Currently Speaking</div>
                  <div className="font-semibold">{currentSpeaker.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Time Left</div>
                  <div className="font-mono text-lg">{formatTime(remainingTime)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Setup Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Discussion Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Discussion Topic</label>
                <Input
                  placeholder="Enter discussion topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={discussionStatus === 'active'}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Selection Mode</label>
                <Select value={selectionMode} onValueChange={(value: SelectionMode) => setSelectionMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Manual Select
                      </div>
                    </SelectItem>
                    <SelectItem value="random">
                      <div className="flex items-center gap-2">
                        <Shuffle className="h-4 w-4" />
                        Random
                      </div>
                    </SelectItem>
                    <SelectItem value="time-based">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Time-Based
                      </div>
                    </SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Per Speaker</label>
                <Select value={timePerSpeaker.toString()} onValueChange={(value) => setTimePerSpeaker(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                    <SelectItem value="180">3 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value='0'>custom</SelectItem>
                    
                  </SelectContent>
                </Select>
                {timePerSpeaker==0&&(
                    <>  
                  <Input type='number' value={customTime} onChange={(v)=>setCustomTime(v.target.value)} placeholder='enter seconds in numbers'/>
                    <Button onClick={handleCustomTime} >Add time</Button>
                    
                    </>
                )}
                {Number(customTime)===timePerSpeaker&&(
                  <p className='text-green-400'>time added successfully</p>
                )}

              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Controls</label>
                <div className="flex gap-2">
                  
                    <Button onClick={startDiscussion} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Start
                    </Button>
                  
                  {discussionStatus === 'active' && (
                    <>
                      <Button variant="outline" onClick={pauseDiscussion}>
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={handleNextSpeaker}>
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {discussionStatus === 'paused' && (
                    <Button onClick={resumeDiscussion}>
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  {(discussionStatus === 'active' || discussionStatus === 'paused') && (
                    <Button variant="destructive" onClick={stopDiscussion}>
                      <Square className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Speaker Section */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {currentSpeaker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        Currently Speaking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={currentSpeaker.avatar} />
                            <AvatarFallback>{currentSpeaker.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{currentSpeaker.name}</h3>
                      
                         
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-mono font-bold">
                            {formatTime(remainingTime)}
                          </div>
                          <Progress value={progressPercentage} className="w-24 mt-2" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addFeedback('thumbs-up', currentSpeaker)}
                          className="flex items-center gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Good Point
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addFeedback('clarification', currentSpeaker)}
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Needs Clarification
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addFeedback('good-point', currentSpeaker)}
                          className="flex items-center gap-2"
                        >
                          <Star className="h-4 w-4" />
                          Excellent
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Add Note for This Speaker</label>
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Add a note about this speaker's contribution..."
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                        <Button
  size="sm"
  onClick={() => {
    if (currentNote.trim() && currentSpeaker) {
      setNotes(prev => [...prev, {
        speakerId: currentSpeaker.id,
        note: currentNote,
        timestamp: new Date()
      }]);
      setCurrentNote('');
      toast({ title: "Note added for " + currentSpeaker.name });
    }
  }}
>
  Save Note
</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Team Members Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <motion.div
                      key={member.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        currentSpeaker?.id === member.id
                          ? 'border-primary bg-primary/10'
                          : speakerHistory.includes(member)
                          ? 'border-muted bg-muted/50'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleManualSelect(member)}
                    >
                      <div className="flex items-center gap-3">
                        
                        <div className="flex-1">
                          <h4 className="font-semibold">{member.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              <span className="text-xs">{member.participationScore}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{formatTime(member.timeSpoken)}</span>
                            </div>
                          </div>
                        </div>
                        {speakerHistory.includes(member) && (
                          <Badge variant="secondary">Spoke</Badge>
                        )}
                        {currentSpeaker?.id === member.id && (
                          <Badge variant="default">Speaking</Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Speaker Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {speakerHistory.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No speakers yet</p>
                    ) : (
                      speakerHistory.map((speaker, index) => (
                        <div key={speaker.id} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <span>{speaker.name}</span>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Discussion Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notes.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No notes yet</p>
                    ) : (
                      notes.map((note, index) => {
                        const speaker = members.find(m => m.id === note.speakerId);
                        return (
                          <div key={index} className="p-3 rounded border bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={speaker?.avatar} />
                                <AvatarFallback className="text-xs">
                                  {speaker?.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{speaker?.name}</span>
                            </div>
                            <p className="text-sm">{note.note}</p>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {feedback.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No feedback yet</p>
                    ) : (
                      feedback.slice(-5).map((fb, index) => (
                        <div key={index} className="text-sm p-2 rounded bg-muted/30">
                          <div className="flex items-center gap-2">
                            {fb.type === 'thumbs-up' && <ThumbsUp className="h-3 w-3" />}
                            {fb.type === 'clarification' && <MessageCircle className="h-3 w-3" />}
                            {fb.type === 'good-point' && <Star className="h-3 w-3" />}
                            <span>{fb.to}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Export Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm"><span className='text-orange-600'>Tips:</span> Make your point clear and ask feedback from team members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}