
import React from 'react';
import { DollarSign, Star, Code, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const ProjectInfo = ({pd}) => {
  const projectDetails = {
    budget:`${pd.budget} `,
    spent: "$32,500",
    priority: `${pd.priority} `,
    techStack: [`${pd.domain} `],
    completion: `${pd.phaseProgress} `
  };

  const spentPercentage = (32500 / 50000) * 100;

  return (
    <Card className="glass-morphism border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <span>Project Info</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">Budget</span>
            </div>
            <span className="text-sm font-medium">{projectDetails.budget}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent: {projectDetails.spent}</span>
              <span className="text-muted-foreground">{spentPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={spentPercentage} className="h-2" />
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Priority</span>
          </div>
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            {projectDetails.priority}
          </Badge>
        </div>

        {/* Completion */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-medium">Completion</span>
            </div>
            <span className="text-sm font-medium">{projectDetails.completion}%</span>
          </div>
          <Progress value={projectDetails.completion} className="h-2" />
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectDetails.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
