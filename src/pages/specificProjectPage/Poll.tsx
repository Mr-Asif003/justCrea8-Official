"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Vote,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  CheckCircle,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Timer from "./Timer";
import { auth, db } from "@/Firebase/firebaseConfig";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  deadline: Date;
  minutesDeadline: string;
  createdBy: string;
  createdAt: Date;
  status: "active" | "closed";
  totalVotes: number;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  winningOption: string;
  pollId: string;
  decidedAt: Date;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
];

const Poll = ({ projectDetails, projectMemberDetails }: any) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showCreatePoll, setShowCreatePoll] = useState(false);

  const [newPoll, setNewPoll] = useState({
    title: "",
    description: "",
    options: ["", ""],
    deadline: new Date(),
  });

  const [dateBasedPoll, setDateBasedPoll] = useState(false);
  const [timeBasedPoll, setTimeBasedPoll] = useState(false);
  const [timeBasedPollTime, setTimeBasedPollTime] = useState("");
  const [projectManager,setProjectManager]=useState('')
  const votedUsersRef = useRef<string[]>([]);
  const user = auth.currentUser?.displayName ?? "Anonymous";
 console.log(projectDetails)
  useEffect(() => {
    if (projectDetails?.polls) {
      setPolls(projectDetails.polls);
      setProjectManager(projectDetails.projectManager.uid)
    }
    if (projectDetails?.decisions) {
      setDecisions(projectDetails?.decisions);
    }
  }, [projectDetails]);

  const addPollOption = () => {
    setNewPoll((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const updatePollOption = (index: number, value: string) => {
    setNewPoll((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const createPoll = async () => {
    if (polls.length >= 3) {
      toast.error("You can only create up to 3 polls.");
      return;
    }

    const poll: Poll = {
      id: Date.now().toString(),
      title: newPoll.title,
      description: newPoll.description,
      options: newPoll.options
        .filter((opt) => opt.trim())
        .map((opt, index) => ({
          id: index.toString(),
          text: opt,
          votes: 0,
          voters: [],
        })),
      deadline: newPoll.deadline,
      minutesDeadline: timeBasedPollTime,
      createdBy: user,
      createdAt: new Date(),
      status: "active",
      totalVotes: 0,
    };

    try {
      const projectRef = doc(db, "projects", projectDetails.projectId);
      const updatedPolls = [...polls, poll];
      await updateDoc(projectRef, { polls: updatedPolls });

      setPolls(updatedPolls);
      setShowCreatePoll(false);
      setNewPoll({
        title: "",
        description: "",
        options: ["", ""],
        deadline: new Date(),
      });
      setTimeBasedPollTime("");
      setTimeBasedPoll(false);
      setDateBasedPoll(false);
      toast.success("Poll created successfully!");
    } catch (e) {
      toast.error("Error creating poll. Try again later.");
      console.error("Poll creation error:", e);
    }
  };

  // ✅ Add this function
  const currUserUid=auth.currentUser.uid||'NA';
  const handleDeletePoll = async (pollId: string) => {
   if (
  projectDetails.projectManager.uid !== currUserUid &&
  projectDetails.teamAdmin.uid !== currUserUid
) {
  toast.error(`Only admin or project manager can delete it. UID: `);
  return;
}
    try {
      const filteredPolls = polls.filter((poll) => poll.id !== pollId);
      setPolls(filteredPolls);
      const projectRef = doc(db, "projects", projectDetails.projectId);
      await updateDoc(projectRef, { polls: filteredPolls });
      toast.success("Poll deleted successfully");
    } catch (err) {
      console.error("Failed to delete poll:", err);
      toast.error("Error deleting poll");
    }
  };

  const vote = async (pollId: string, optionId: string) => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to vote.");
      return;
    }

    const currentUser = auth.currentUser.displayName ?? "Anonymous";

    const pollToUpdate = polls.find((p) => p.id === pollId);
    if (!pollToUpdate) return;

    const hasAlreadyVoted = pollToUpdate.options.some((option) =>
      option.voters.includes(currentUser)
    );
    if (hasAlreadyVoted) {
      toast.error("You have already voted on this poll.");
      return;
    }

    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map((option) =>
            option.id === optionId
              ? {
                  ...option,
                  votes: option.votes + 1,
                  voters: [...option.voters, currentUser],
                }
              : option
          ),
          totalVotes: poll.totalVotes + 1,
        };
      }
      return poll;
    });

    setPolls(updatedPolls);

    try {
      const projectRef = doc(db, "projects", projectDetails.projectId);
      await updateDoc(projectRef, { polls: updatedPolls });
      toast.success("Vote submitted!");
    } catch (err) {
      console.error("Error updating vote:", err);
      toast.error("Failed to submit vote");
    }
  };

  const addToDecisions = async (poll: Poll, winningOption: string) => {
    const existingDecisions: Decision[] = Array.isArray(
      projectDetails?.decisions
    )
      ? projectDetails.decisions
      : [];

    if (!Array.isArray(existingDecisions)) {
      console.error("existingDecisions is not an array:", existingDecisions);
      toast.error("Unexpected error with decisions data.");
      return;
    }

    if (existingDecisions.length >= 5) {
      toast.error("Only 5 decisions are allowed.");
      return;
    }

    const decision: Decision = {
      id: Date.now().toString(),
      title: poll.title,
      description: `Decision made based on poll results: ${winningOption}`,
      winningOption,
      pollId: poll.id,
      decidedAt: new Date(),
    };

    try {
      const updatedDecisions = [...existingDecisions, decision];
      const projectRef = doc(db, "projects", projectDetails.projectId);
      await updateDoc(projectRef, { decisions: updatedDecisions });

      setDecisions(updatedDecisions);
      toast.success("Decision added successfully!");
    } catch (e) {
      console.error("Failed to add decision:", e);
      toast.error("Error adding decision");
    }
  };
  const handleDeleteDecision = async (decisionId: string) => {
  try {
    const filteredDecisions = decisions.filter((d) => d.id !== decisionId);
    setDecisions(filteredDecisions);

    const projectRef = doc(db, "projects", projectDetails.projectId);
    await updateDoc(projectRef, { decisions: filteredDecisions });

    toast.success("Decision deleted successfully");
  } catch (err) {
    console.error("Failed to delete decision:", err);
    toast.error("Error deleting decision");
  }
};


  const getPieChartData = (poll: Poll) =>
    poll.options.map((option, index) => ({
      name: option.text,
      value: option.votes,
      color: COLORS[index % COLORS.length],
    }));

  const getBarChartData = (poll: Poll) =>
    poll.options.map((option) => ({
      name: option.text,
      votes: option.votes,
    }));

  return (
    <div className="min-h-screen bg-background p-1">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className=" w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Project Polls & Decisions</h1>
            <p className="text-muted-foreground text-sm">
              Create polls, vote, and make project decisions
            </p>
          </div>
          <Dialog open={showCreatePoll} onOpenChange={setShowCreatePoll}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-2 w-3" />
                Create Poll
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
              <DialogHeader>
                <DialogTitle>Create New Poll</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="title">Poll Title</Label>
                <Input
                  id="title"
                  value={newPoll.title}
                  onChange={(e) =>
                    setNewPoll((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter poll title"
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPoll.description}
                  onChange={(e) =>
                    setNewPoll((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the poll"
                />
                <Label>Poll Options</Label>
                {newPoll.options.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="mt-2"
                  />
                ))}
                <Button variant="outline" onClick={addPollOption}>
                  Add Option
                </Button>

                <Label>Voting Deadline</Label>
                <div className="flex justify-around m-4">
                  <Button
                    onClick={() => {
                      setDateBasedPoll(true);
                      setTimeBasedPoll(false);
                    }}
                  >
                    Date Based
                  </Button>
                  <Button
                    onClick={() => {
                      setTimeBasedPoll(true);
                      setDateBasedPoll(false);
                    }}
                  >
                    Time Based
                  </Button>
                </div>

                {dateBasedPoll && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(newPoll.deadline, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newPoll.deadline}
                        onSelect={(date) =>
                          date &&
                          setNewPoll((prev) => ({ ...prev, deadline: date }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {timeBasedPoll && (
                  <Input
                    type="number"
                    placeholder="Enter deadline in minutes"
                    onChange={(e) => setTimeBasedPollTime(e.target.value)}
                  />
                )}
                <Button onClick={createPoll} className="w-full">
                  Create Poll
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="polls" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="polls">Active Polls</TabsTrigger>
            <TabsTrigger value="decisions">Decisions</TabsTrigger>
          </TabsList>

          <TabsContent value="polls" className="w-full p-2 text-sm space-y-6">
            {polls.map((poll) => {
              const deadlineDate = poll.deadline?.toDate
                ? poll.deadline.toDate()
                : new Date(poll.deadline);

              const isValidDate =
                deadlineDate instanceof Date && !isNaN(deadlineDate);

              return (
                <Card key={poll.id} className="w-full text-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-2">
                        <Vote className="h-5 w-5" />
                        {poll.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePoll(poll.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardTitle>
                    <p className="text-muted-foreground">{poll.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge
                        variant={
                          poll.status === "active" ? "default" : "secondary"
                        }
                      >
                        {poll.status}
                      </Badge>
                      <span className="text-sm flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {isValidDate
                          ? format(deadlineDate, "MMM dd, yyyy")
                          : "Invalid deadline"}
                      </span>
                      <span>Total Votes: {poll.totalVotes}</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Voting Section */}
                      <div className="space-y-4 w-full ">
                        <h4 className="font-semibold">Vote:</h4>
                        {poll.options.map((option) => (
                          <div
                            key={option.id}
                            className="flex flex-col text-sm gap-4"
                          >
                            <div className="flex  flex-col md:flex-row justify-between md:items-center gap-2">
                              <span>😊 {option.text}</span>
                              <div className="flex flex-col md:items-center gap-2">
                                <span>{option.votes} votes</span>
                                <Button
                                  size="sm"
                                  onClick={() => vote(poll.id, option.id)}
                                  disabled={poll.status === "closed"}
                                >
                                  Vote
                                </Button>
                              </div>
                            </div>

                            <Progress
                              className="w-1/2"
                              value={
                                poll.totalVotes > 0
                                  ? (option.votes / poll.totalVotes) * 100
                                  : 0
                              }
                            />

                            {/* ✅ Voter display */}
                            {option.voters.length > 0 && (
                              <div className="ml-4 mt-1 text-sm text-muted-foreground">
                                Voters: {option.voters.join(", ")}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Charts */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <PieChart className="h-4 w-4" />
                          Vote Chart
                        </h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={getPieChartData(poll)}
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {getPieChartData(poll).map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getBarChartData(poll)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="votes" fill="hsl(var(--primary))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div></div>
                      </div>
                    </div>

                    {parseInt(poll.minutesDeadline) > 0 && (
                      <div className="p-4">
                        <Timer
                          initialMinutes={poll.minutesDeadline}
                          autoStart
                          onComplete={() => alert("Time's up!")}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {poll.status && (
                      <Button
                        onClick={() => {
                          const winner = poll.options.reduce((a, b) =>
                            a.votes > b.votes ? a : b
                          );
                          addToDecisions(poll, winner.text);
                        }}
                        className="mt-4 w-full"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Add to Decisions
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="decisions" className="space-y-6">
            {decisions.map((decision) => (
              <Card key={decision.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
  <span className="flex items-center gap-2">
    <CheckCircle className="h-5 w-5" />
    {decision.title}
  </span>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handleDeleteDecision(decision.id)}
  >
    <Trash2 className="h-4 w-4 text-red-500" />
  </Button>
</CardTitle>

                </CardHeader>
                <CardContent>
                  <p>{decision.description}</p>
                  <div className="flex gap-4 mt-2">
                    <Badge>Winning: {decision.winningOption}</Badge>
                    <Badge variant="outline">
                      {decision.implementationStatus}
                    </Badge>
                    {decision.decidedAt && decision.decidedAt.seconds ? (
                      <span>
                        {new Date(
                          decision.decidedAt.seconds * 1000
                        ).toLocaleString()}
                      </span>
                    ) : (
                      <span>No Date</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Poll;
