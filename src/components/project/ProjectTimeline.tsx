import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TimelineItem {
  phase: string;
  title: string;
  subtitle?: string;
  description?: string;
  date: string;
  status?: 'completed' | 'in-progress' | 'pending' | 'delayed';
  progress?: number;
}

interface ProjectTimelineProps {
  timelines: TimelineItem[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ timelines }) => {
  const getStatusIcon = (status: string = 'pending') => {
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

  const getStatusColor = (status: string = 'pending') => {
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
            {timelines.map((item, index) => {
              const status = item.status || 'pending';
              const progress = item.progress ?? (status === 'completed' ? 100 : status === 'in-progress' ? 50 : 0);

              return (
                <div key={index} className="flex-shrink-0 w-64">
                  <div className="relative">
                    {index < timelines.length - 1 && (
                      <div className="absolute top-6 left-6 w-full h-0.5 bg-gradient-to-r from-primary/30 to-muted transform translate-x-6" />
                    )}

                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                      <div className="flex items-start space-x-3">
                        {getStatusIcon(status)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{item.phase}</h4>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <p className="text-sm mt-1 font-medium line-clamp-2">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                          )}
                          <Badge
                            variant="outline"
                            className={`mt-2 text-xs ${getStatusColor(status)}`}
                          >
                            {status.replace('-', ' ')}
                          </Badge>

                          {(status !== 'pending' && status !== 'delayed') && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-xs mt-2 text-muted-foreground line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
