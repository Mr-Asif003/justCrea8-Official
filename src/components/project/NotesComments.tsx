
import React, { useState } from 'react';
import { MessageSquare, Send, Pin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export const NotesComments = () => {
  const [newComment, setNewComment] = useState('');

  const comments = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
      },
      content: "Great progress on the authentication system! The security implementation looks solid.",
      timestamp: "2 hours ago",
      pinned: true
    },
    {
      id: 2,
      author: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      content: "I've completed the API integration. Moving on to the frontend components next.",
      timestamp: "5 hours ago",
      pinned: false
    },
    {
      id: 3,
      author: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      },
      content: "The new design mockups are ready for review. Please check the updated wireframes.",
      timestamp: "1 day ago",
      pinned: false
    }
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Card className="glass-morphism border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Notes & Comments</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex space-x-3 p-3 rounded-lg ${
                comment.pinned 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'bg-card/50 backdrop-blur-sm border border-primary/10'
              } hover:border-primary/30 transition-all duration-300`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>
                  {comment.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-sm">{comment.author.name}</p>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  {comment.pinned && (
                    <Pin className="h-3 w-3 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <Textarea
            placeholder="Add a comment or note..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] bg-card/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
