import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Users, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";

interface Invite {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  time: string;
}

interface TeamSidebarProps {
  onClose?: () => void;
  teamData?: {
    memberEmails?: Invite[] | string[];
    announcements?: Announcement[];
  };
}

export const TeamSidebar = ({ onClose, teamData }: TeamSidebarProps) => {
  const [pendingInvites, setPendingInvites] = useState<Invite[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Load team data when prop changes
  useEffect(() => {
    if (Array.isArray(teamData?.memberEmails)) {
      // If it's just strings, convert to dummy objects
      const invites: Invite[] = teamData.memberEmails.map((m: any, idx) =>
        typeof m === "string"
          ? { id: String(idx), name: m, email: m, role: "member" }
          : m
      );
      setPendingInvites(invites);
    } else {
      setPendingInvites([]);
    }

    if (Array.isArray(teamData?.announcements)) {
      setAnnouncements(teamData.announcements);
    } else {
      setAnnouncements([]);
    }
  }, [teamData]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-6"
    >
      {onClose && (
        <div className="flex justify-between items-center xl:hidden p-4">
          <h2 className="text-lg font-semibold">Team Updates</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Pending Invites */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-primary" />
            All sent Invites
            {pendingInvites.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {pendingInvites.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingInvites.length > 0 ? (
            pendingInvites.map((invite) => (
              <motion.div
                key={invite.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" alt={invite.name} />
                  <AvatarFallback className="text-xs">
                    {invite.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{invite.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {invite.email}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {invite.role}
                  </Badge>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pending invites
            </p>
          )}
        </CardContent>
      </Card>

      {/* Team Announcements */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Megaphone className="w-5 h-5 text-primary" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((a) => (
              <div key={a.id} className="border p-3 rounded-lg">
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-muted-foreground">{a.content}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No announcements yet</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Send Team Message
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Schedule Meeting
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Export Team Data
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
