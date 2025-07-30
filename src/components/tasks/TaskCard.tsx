'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Tag,
  MoreHorizontal,
  Edit,
  Trash2,
  Check,
  Clock,
  AlertCircle,
  UserCheck,
  DollarSign
} from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string; // simplified to just the name
  provider: string; // simplified to just the name
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  tags: string[];
  createdAt: string;
  penalty?: string;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updatedData: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  projectDetails
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onEdit,projectDetails }) => {
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const isOverdue = isBefore(dueDate, now) && task.status !== 'Completed';
  const isDueSoon = isAfter(dueDate, now) && isBefore(dueDate, addDays(now, 3));
 

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'Critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Review': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'Completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    onUpdate(task.id, { status: newStatus });
  };

  const handleMarkAsDone = () => {
    onUpdate(task.id, { status: 'Completed' });
  };

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card
        className={cn(
          "bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg",
          isOverdue ? "border-red-500/30 bg-red-500/5" : "border-accent/20",
          task.status === 'Completed' && "opacity-75"
        )}
      >
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className={cn(
                    "text-lg font-semibold",
                    task.status === 'Completed' && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </h3>
                  {isOverdue && <AlertCircle className="h-4 w-4 text-red-500" />}
                  {isDueSoon && <Clock className="h-4 w-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {task.status !== 'Completed' && (
                    <DropdownMenuItem onClick={handleMarkAsDone}>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Done
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", getPriorityColor(task.priority))}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", getStatusColor(task.status))}>
                {task.status}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span className={cn(
                  isOverdue ? "text-red-600 font-medium" :
                  isDueSoon ? "text-green-600 font-medium" : ""
                )}>
                 createdAt: {format(task.createdAt, 'MMM dd, yyyy')}
                </span>
              </div>
               <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span className={cn(
                  isOverdue ? "text-red-600 font-medium" :
                  isDueSoon ? "text-yellow-600 font-medium" : ""
                )}>
                 DeadLine {format(dueDate, 'MMM dd, yyyy')}
                </span>
              </div>
              {task.penalty && isOverdue && (
                <Badge variant="outline" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">
                  <DollarSign className="mr-1 h-2 w-2" />
                  Penalty: {task.penalty}
                </Badge>
              )}
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                    <Tag className="mr-1 h-2 w-2" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Assignee and Provider */}
            <div className="flex items-center justify-between pt-3 border-t border-accent/20">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Assigned to:</span>
                  <span className="font-medium text-foreground">{task.assignee}</span>
                </div>
                <div className="h-4 w-px bg-accent/20" />
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Assigned by:</span>
                  <span className="font-medium text-foreground">{task.provider}</span>
                </div>
              </div>

              {task.status !== 'Completed' && (
                <div className="flex space-x-1">
                  {task.status === 'To Do' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange('In Progress')}
                      className="text-xs"
                    >
                      Start
                    </Button>
                  )}
                  {task.status === 'In Progress' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange('Review')}
                      className="text-xs"
                    >
                      Review
                    </Button>
                  )}
                  {task.status === 'Review' && (
                    <Button
                      size="sm"
                      onClick={handleMarkAsDone}
                      className="text-xs bg-green-600 hover:bg-green-700"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Done
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
