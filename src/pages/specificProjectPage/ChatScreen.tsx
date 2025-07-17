import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

const teamMessagesInitial = [
  { name: "Alice", text: "We should start testing by Friday", time: "10:30 AM", avatar: "https://i.pravatar.cc/100?u=1" },
  { name: "Bob", text: "Agree. I'll finish the report today.", time: "10:32 AM", avatar: "https://i.pravatar.cc/100?u=2" },
  { name: "Carol", text: "Can we finalize the feature list first?", time: "10:35 AM", avatar: "https://i.pravatar.cc/100?u=3" },
];

const pollOptionsInitial = [
  { id: 1, text: "Friday Deployment" },
  { id: 2, text: "Monday Deployment" },
  { id: 3, text: "Next Sprint" },
];

const decisions = [
  "Sprint ends on Thursday",
  "Deployment moved to Friday",
  "Feature freeze from tomorrow",
];

export default function TeamChatWithPoll() {
  const [pollVotes, setPollVotes] = useState({});
  const [input, setInput] = useState("");
  const [teamMessages, setTeamMessages] = useState(teamMessagesInitial);
  const [pollOptions, setPollOptions] = useState(pollOptionsInitial);
  const [newOption, setNewOption] = useState("");
  const [voterName, setVoterName] = useState("");

  const handleVote = (id) => {
    if (!voterName.trim()) return alert("Please enter your name before voting.");
    setPollVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSend = () => {
    if (input.trim()) {
      setTeamMessages((prev) => [
        ...prev,
        {
          name: "You",
          text: input,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: "https://i.pravatar.cc/100?u=999"
        }
      ]);
      setInput("");
    }
  };

  const handleAddPollOption = () => {
    if (newOption.trim()) {
      const newId = pollOptions.length + 1;
      setPollOptions([...pollOptions, { id: newId, text: newOption }]);
      setNewOption("");
    }
  };

  return (
    <div className="w-full h-screen p-4 ">
      {/* Chat Section */}
      <div className="w-full h-[90%] border-cyan-300 p-4 flex flex-col justify-between shadow-xl">
        <div className="space-y-4 overflow-y-auto h-[75%] pr-2">
          {teamMessages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3 text-white">
              <Avatar>
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-indigo-700 p-3 rounded-lg w-fit max-w-md shadow">
                <div className="font-semibold">{msg.name}</div>
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-gray-300 mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat Input */}
        <div className="flex items-center gap-2 ">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-800 text-white border-gray-600"
          />
          <Button onClick={handleSend} className="bg-indigo-600 text-white hover:bg-indigo-700">
            Send
          </Button>
        </div>
      </div>

     
      
    </div>
  );
}