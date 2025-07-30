import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, X, Clock, Users, Megaphone } from "lucide-react";


interface TeamSidebarProps {
  onClose?: () => void;
}

export const TeamSidebar = ({ onClose }: TeamSidebarProps) => {
  const pendingInvites = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "contributor" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "mentor" },
  ];

  const announcements = [
    {
      id: 1,
      title: "Team Meeting Tomorrow",
      content: "Don't forget about our weekly standup at 10 AM EST",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "New Project Templates",
      content: "We've added new project templates to help you get started faster",
      time: "1 day ago"
    },
  ];

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
            Pending Invites
            {pendingInvites.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {pendingInvites.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingInvites.map((invite) => (
            <motion.div
              key={invite.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt={invite.name} />
                <AvatarFallback className="text-xs">
                  {invite.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{invite.name}</p>
                <p className="text-xs text-muted-foreground truncate">{invite.email}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {invite.role}
                </Badge>
              </div>
            </motion.div>
          ))}
          
          {pendingInvites.length === 0 && (
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
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-border/30 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-2 mb-2">
                <Bell className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{announcement.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {announcement.content}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {announcement.time}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
            Send Team Message
          </Button>
          <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
            Schedule Meeting
          </Button>
          <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30">
            Export Team Data
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};