
import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const ProjectTimeline = () => {
  const milestones = [
    {
      id: 1,
      title: "Project Setup & Planning",
      date: "Mar 15, 2024",
      status: "completed",
      progress: 100
    },
    {
      id: 2,
      title: "Backend Development",
      date: "Apr 1, 2024",
      status: "completed",
      progress: 100
    },
    {
      id: 3,
      title: "Frontend Integration",
      date: "Apr 15, 2024",
      status: "in-progress",
      progress: 75
    },
    {
      id: 4,
      title: "Testing & QA",
      date: "May 1, 2024",
      status: "pending",
      progress: 0
    },
    {
      id: 5,
      title: "Deployment",
      date: "May 15, 2024",
      status: "pending",
      progress: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'delayed':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in-progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delayed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card className="glass-morphism border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Project Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4 min-w-max">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex-shrink-0 w-64">
                <div className="relative">
                  {index < milestones.length - 1 && (
                    <div className="absolute top-6 left-6 w-full h-0.5 bg-gradient-to-r from-primary/30 to-muted transform translate-x-6" />
                  )}
                  
                  <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(milestone.status)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {milestone.date}
                        </p>
                        
                        <Badge 
                          variant="outline" 
                          className={`mt-2 text-xs ${getStatusColor(milestone.status)}`}
                        >
                          {milestone.status.replace('-', ' ')}
                        </Badge>
                        
                        {milestone.status !== 'pending' && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
