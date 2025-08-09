import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Clock, Send, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function TeamAnnouncement() {
  const location = useLocation();
  const { teamId } = location.state || {};
  const currentUser = auth.currentUser;

  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        if (!teamId) return;
        const ref = doc(db, "teams", teamId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setAnnouncements(data.announcements || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load announcements");
      }
    };
    fetchAnnouncements();
  }, [teamId]);

  // Save new announcement
  const handleAddAnnouncement = async () => {
    if (!title.trim() || !content.trim()) {
      return toast.error("Please fill in both title and content");
    }
    if (announcements.length >= 5) {
      return toast.error("You can only have up to 5 announcements");
    }
    if (!teamId) {
      return toast.error("Team ID not found");
    }

    setLoading(true);
    try {
      const ref = doc(db, "teams", teamId);
      const newAnnouncement = {
        id: Date.now(),
        title,
        content,
        time: new Date().toISOString(),
        createdBy: currentUser?.displayName || "Unknown",
      };

      const updated = [newAnnouncement, ...announcements];
      await updateDoc(ref, {
        announcements: updated,
      });

      setAnnouncements(updated);
      setTitle("");
      setContent("");
      toast.success("Announcement added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add announcement");
    }
    setLoading(false);
  };

  // Delete announcement
  const handleDeleteAnnouncement = async (id) => {
    try {
      const updated = announcements.filter((a) => a.id !== id);
      await updateDoc(doc(db, "teams", teamId), {
        announcements: updated,
      });
      setAnnouncements(updated);
      toast.success("Announcement deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <section className="rounded-xl border border-cyan-500 shadow-md shadow-purple-500 backdrop-blur-sm p-6 flex items-center gap-4 bg-gradient-to-r from-black to-gray-900 text-white">
        <Bell className="w-8 h-8 text-yellow-400" />
        <div>
          <Fade>
            <h1 className="font-bold text-cyan-400 text-sm">📢 Announcements</h1>
          </Fade>
          <p className="text-sm text-gray-400">Post updates for your team</p>
        </div>
      </section>

      {/* Form to add announcement */}
      <div className=" w-full  md:flex gap-4">
      <Card className="border border-white/10 bg-black/50 backdrop-blur-md p-4">
        <CardHeader>
          <CardTitle className="text-cyan-400">Create Announcement</CardTitle>
          {announcements.length >= 5 && (
            <p className="text-xs text-red-400">
              ⚠ You can only keep 5 announcements. Please delete one to add a new one.
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={announcements.length >= 5}
          />
          <Textarea
            placeholder="Write your announcement..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={announcements.length >= 5}
          />
          <Button
            onClick={handleAddAnnouncement}
            disabled={loading || announcements.length >= 5}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600"
          >
            <Send size={16} /> {loading ? "Posting..." : "Post"}
          </Button>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className=" flex flex-wrap gap-4">
      {announcements.length > 0 ? (
        announcements.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-white/10 shadow-lg hover:shadow-cyan-500/30 bg-black/50 backdrop-blur-md">
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-cyan-400">{a.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {a.content}
                  </CardDescription>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock size={14} /> {new Date(a.time).toLocaleString()}
                    </Badge>
                    <Badge variant="outline">By {a.createdBy}</Badge>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteAnnouncement(a.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </CardHeader>
            </Card>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No announcements yet</p>
      )}
      </div>
      </div>
    </div>
  );
}
