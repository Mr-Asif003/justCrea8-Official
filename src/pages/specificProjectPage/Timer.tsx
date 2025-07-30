'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Timer = ({ initialMinutes = 5, onComplete ,autoStart}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60).toString().padStart(2, '0');
    const seconds = (secs % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

    useEffect(() => {
    if (autoStart) {
      setIsRunning(true);
    }
  }, [autoStart]);
 
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      if (onComplete) onComplete();
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, secondsLeft]);
 
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(initialMinutes * 60);
  };

  return (
    <Card className="w-full max-w-sm shadow-xl mx-auto bg-background border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">⏱ Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-5xl font-mono tracking-widest text-primary">
          {formatTime(secondsLeft)}
        </div>
        <div className="flex gap-2">
          {!autoStart&&(
               <Button variant="outline" onClick={handleStartPause}>
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="ml-1">{isRunning ? 'Pause' : 'Start'}</span>
          </Button>
          )}
          <Button variant="ghost" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            <span className="ml-1">Reset</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timer;
