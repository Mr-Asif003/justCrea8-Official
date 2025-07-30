
import React from 'react';
import { Users, Mail, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const TeamMembers = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      status: "online",
      email: "sarah@justcrea8.com"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "online",
      email: "alex@justcrea8.com"
    },
    {
      id: 3,
      name: "Maya Patel",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "away",
      email: "maya@justcrea8.com"
    },
    {
      id: 4,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "offline",
      email: "david@justcrea8.com"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Data Analyst",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      status: "online",
      email: "lisa@justcrea8.com"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'Project Manager': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'Lead Developer': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'UI/UX Designer': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
      'DevOps Engineer': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      'Data Analyst': 'bg-green-500/10 text-green-600 border-green-500/20'
    };
    return colors[role] || 'bg-muted text-muted-foreground border-muted';
  };

  return (
    <Card className="glass-morphism border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <span>Team Members</span>
          <Badge variant="secondary" className="ml-auto">
            {teamMembers.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{member.name}</p>
              <Badge
                variant="outline"
                className={`text-xs mt-1 ${getRoleColor(member.role)}`}
              >
                {member.role}
              </Badge>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10"
              >
                <Mail className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
