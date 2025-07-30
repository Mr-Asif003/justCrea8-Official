'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CalendarIcon,
  User,
  Tag,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Schema
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.date({ required_error: 'Due date is required' }),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['To Do', 'In Progress', 'Review', 'Completed']),
  tags: z.array(z.string()).default([]),
  penalty: z.string().optional()
});

type TaskFormData = z.infer<typeof taskSchema>;

interface Member {
  uid: string;
  name: string;
}

interface TaskFormProps {
  task?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  projectMemberDetails?: Member[];
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  isEditing = false,
  projectMemberDetails = []
}) => {
  const [newTag, setNewTag] = useState('');
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  // Safely update team members
  useEffect(() => {
    if (Array.isArray(projectMemberDetails)) {
      setTeamMembers(projectMemberDetails);
    }
  }, [projectMemberDetails]);

  // Form hook
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? { ...task, dueDate: new Date(task.dueDate) }
      : {
          title: '',
          description: '',
          assignee: '',
          dueDate: new Date(),
          priority: 'Medium',
          status: 'To Do',
          tags: [],
          penalty: ''
        }
  });

  // Form submit
  const handleSubmit = (data: TaskFormData) => {
    const formattedData: TaskFormData = {
      ...data,
      dueDate: format(data.dueDate, 'yyyy-MM-dd') as unknown as Date
    };
    onSubmit(formattedData);
  };

  // Tag logic
  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !form.getValues('tags').includes(trimmed)) {
      form.setValue('tags', [...form.getValues('tags'), trimmed]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      'tags',
      form.getValues('tags').filter(t => t !== tag)
    );
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter task description..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assignee */}
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <User className="inline mr-2 h-4 w-4" />
                  Assignee
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teamMembers?.map(member => (
                      <SelectItem key={member.uid} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Penalty */}
          <FormField
            control={form.control}
            name="penalty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <DollarSign className="inline mr-2 h-4 w-4" />
                  Penalty
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $100 or 1 day" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date, Priority, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    <CalendarIcon className="inline mr-2 h-4 w-4" />
                    Due Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    <AlertCircle className="inline mr-2 h-4 w-4" />
                    Priority
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Low', 'Medium', 'High', 'Critical'].map(level => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['To Do', 'In Progress', 'Review', 'Completed'].map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <FormLabel className="text-base font-semibold">
              <Tag className="inline mr-2 h-4 w-4" />
              Tags
            </FormLabel>
            <div className="flex flex-wrap gap-2">
              {form.watch('tags').map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-2 pt-6 border-t border-accent/20">
            <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
