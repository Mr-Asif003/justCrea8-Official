
import React from 'react';
import { FileText, Download, Eye, File, Image, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ResourcesDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Project Requirements.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Sarah Chen",
      uploadedAt: "2 days ago"
    },
    {
      id: 2,
      name: "Design Mockups.fig",
      type: "figma",
      size: "15.2 MB",
      uploadedBy: "Maya Patel",
      uploadedAt: "1 week ago"
    },
    {
      id: 3,
      name: "API Documentation.md",
      type: "markdown",
      size: "156 KB",
      uploadedBy: "Alex Rodriguez",
      uploadedAt: "3 days ago"
    },
    {
      id: 4,
      name: "Demo Video.mp4",
      type: "video",
      size: "45.8 MB",
      uploadedBy: "David Kim",
      uploadedAt: "5 days ago"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-purple-500" />;
      case 'image':
        return <Image className="h-4 w-4 text-green-500" />;
      default:
        return <File className="h-4 w-4 text-blue-500" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'video':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'figma':
        return 'bg-pink-500/10 text-pink-600 border-pink-500/20';
      case 'markdown':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card className="glass-morphism border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Resources & Documents</span>
          <Badge variant="secondary" className="ml-auto">
            {documents.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex-shrink-0">
              {getFileIcon(doc.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{doc.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${getFileTypeColor(doc.type)}`}
                >
                  {doc.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">{doc.size}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                by {doc.uploadedBy} • {doc.uploadedAt}
              </p>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/10"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
