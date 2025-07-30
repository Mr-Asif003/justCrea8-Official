
import React, { useState } from 'react';
import { MoreHorizontal, Edit, Archive, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ProjectHeader = () => {
  const project = {
    name: "AI-Powered Analytics Dashboard",
    tags: ["AI", "DevOps", "Analytics"],
    status: "On Track",
    admin: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
    createdDate: "March 15, 2024",
    teamSize: 8
  };

  return (
    <Card className="glass-morphism border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                {project.name}
              </h1>
              <Badge 
                variant={project.status === "On Track" ? "default" : "destructive"}
                className="bg-primary/10 text-primary border-primary/20"
              >
                {project.status}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/50">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.admin.avatar} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span>Admin: {project.admin.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{project.teamSize} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Created {project.createdDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="hover:bg-primary/10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-sm">
                <DropdownMenuItem className="hover:bg-primary/10">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-destructive/10 text-destructive">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
