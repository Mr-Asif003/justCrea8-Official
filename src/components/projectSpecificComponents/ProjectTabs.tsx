import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { useState } from "react";
import { Plus, Share, MessageCircle } from 'lucide-react';

export default function ProjectTabs() {
  const [announcement, setAnnouncement] = useState("");
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");

  const [announcementList, setAnnouncementList] = useState([
    { id: 1, content: "Project kickoff meeting scheduled for next Monday." }
  ]);
  const [summaryList, setSummaryList] = useState([
    { id: 1, content: "Phase 1 completed, moving to Phase 2 next week." }
  ]);
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, content: "Great job on the latest design iteration!" }
  ]);

  const [announcementBtn, setAnnouncementBtn] = useState(false);
  const [summaryBtn, setSummaryBtn] = useState(false);
  const [feedbackBtn, setFeedbackBtn] = useState(false);

  const handleAnnouncementChange = () => {
    if (announcement.trim() !== "") {
      setAnnouncementList(prev => [...prev, { id: prev.length + 1, content: announcement }]);
      setAnnouncement(""); // Clear input
    }
  };

  const handleSummaryChange = () => {
    if (summary.trim() !== "") {
      setSummaryList(prev => [...prev, { id: prev.length + 1, content: summary }]);
      setSummary("");
    }
  };

  const handleFeedbackChange = () => {
    if (feedback.trim() !== "") {
      setFeedbackList(prev => [...prev, { id: prev.length + 1, content: feedback }]);
      setFeedback("");
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="announcement" className="w-full h-auto text-gray-600 border p-4 rounded shadow-2xl">
        <TabsList>
          <TabsTrigger value="announcement">Announcements</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="announcement">
          <ul className="list-disc ml-6">{announcementList.map((ann) => (
            <li key={ann.id}>{ann.content}</li>
          ))}</ul>
        </TabsContent>

        <TabsContent value="summary">
          <ul className="list-disc ml-6">{summaryList.map((sum) => (
            <li key={sum.id}>{sum.content}</li>
          ))}</ul>
        </TabsContent>

        <TabsContent value="feedback">
          <ul className="list-disc ml-6">{feedbackList.map((feed) => (
            <li key={feed.id}>{feed.content}</li>
          ))}</ul>
        </TabsContent>
      </Tabs>

      {/* Inputs for Tabs */}
      {announcementBtn && (
        <div className="mt-2">
          <Input value={announcement} onChange={(e) => setAnnouncement(e.target.value)} placeholder="Enter announcement" />
          <button onClick={handleAnnouncementChange} className="bg-cyan-600 text-sm mt-2 text-white p-2 rounded-md">Submit</button>
        </div>
      )}

      {summaryBtn && (
        <div className="mt-2">
          <Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Enter summary" />
          <button onClick={handleSummaryChange} className="bg-green-600 text-sm mt-2 text-white p-2 rounded-md">Submit</button>
        </div>
      )}

      {feedbackBtn && (
        <div className="mt-2">
          <Input value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter feedback" />
          <button onClick={handleFeedbackChange} className="bg-yellow-600 text-sm mt-2 text-white p-2 rounded-md">Submit</button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 rounded-lg w-full shadow-sm flex flex-wrap gap-4 justify-around">
        <button onClick={() => setAnnouncementBtn(!announcementBtn)} className="flex justify-center items-center rounded-md text-sm text-cyan-400 border p-2 border-cyan-400">
          <Plus size={16} className="mr-2" /> New Announcement
        </button>
        <button onClick={() => setSummaryBtn(!summaryBtn)} className="flex justify-center items-center rounded-md text-sm border p-2 text-green-400 border-green-400">
          <Share size={16} className="mr-2" /> Share Summary
        </button>
        <button onClick={() => setFeedbackBtn(!feedbackBtn)} className="flex justify-center items-center rounded-md text-sm border p-2 text-yellow-400 border-yellow-400">
          <MessageCircle size={16} className="mr-2" /> Give Feedback
        </button>
      </div>
    </div>
  );
}
