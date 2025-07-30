import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, MoreVertical, Edit, Trash2, MessageCircle, Folder } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  joinDate: string;
  projects: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "Admin", variant: "destructive" as const },
      "project-manager": { label: "Project Manager", variant: "default" as const },
      contributor: { label: "Contributor", variant: "secondary" as const },
      mentor: { label: "Mentor", variant: "outline" as const },
    };
    
    return roleConfig[role as keyof typeof roleConfig] || { label: role, variant: "secondary" as const };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const roleBadge = getRoleBadge(member.role);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-background`} />
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {member.email}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Member
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Member
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={roleBadge.variant} className="text-xs">
                {roleBadge.label}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Folder className="w-3 h-3" />
                {member.projects} projects
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Joined {member.joinDate}
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-primary/10 hover:border-primary/30">
                View Profile
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-primary/10 hover:border-primary/30">
                Assign Task
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};