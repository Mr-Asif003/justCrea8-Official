import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function RecentActivityCard({ title, user, time, description }) {
  return (
    <Card className="bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-cyan-400">{title}</CardTitle>
        <CardDescription className="text-sm">
          By <span className="font-semibold">{user}</span> • {time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}