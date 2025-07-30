
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { TrendingUp, TrendingDown, Activity, Clock, Users, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const LiveAnalytics = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [realTimeData, setRealTimeData] = useState([65, 78, 82, 75, 89, 94]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = [...prev];
        newData.push(Math.floor(Math.random() * 30) + 70);
        return newData.slice(-6);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Project Completion %',
        data: realTimeData,
        borderColor: 'rgb(6, 182, 212)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Team Activity',
        data: [45, 52, 68, 71, 83, 87],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Planning', 'On Hold'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(6, 182, 212, 0.1)',
        },
      },
    },
  };

  const metrics = [
    {
      icon: Target,
      label: 'Active Projects',
      value: 24,
      trend: '+12%',
      trendUp: true,
      color: 'text-cyan-400'
    },
    {
      icon: Users,
      label: 'Team Members',
      value: 156,
      trend: '+8%',
      trendUp: true,
      color: 'text-blue-400'
    },
    {
      icon: Activity,
      label: 'Tasks Completed',
      value: 12,
      trend: '+15%',
      trendUp: true,
      color: 'text-purple-400'
    },
    {
      icon: Clock,
      label: 'Avg. Response Time',
      value: 98,
      trend: '-5%',
      trendUp: false,
      color: 'text-green-400',
      suffix: 'min'
    }
  ];

  return (
    <section id="analytics" className="py-20 bg-gradient-to-r from-cyan-400/5 to-blue-600/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-medium">Live Analytics</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Real-Time Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor your team's performance and project progress with live analytics and intelligent insights.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setActiveMetric(index)}
            >
              <Card className={`border-0 bg-background/50 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                activeMetric === index ? 'bg-background/80 shadow-xl shadow-cyan-400/10' : ''
              }`}>
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 ${
                      activeMetric === index ? 'scale-110' : ''
                    } transition-transform duration-300`}
                  >
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </motion.div>
                  
                  <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                    <AnimatedCounter end={metric.value} suffix={metric.suffix || ''} />
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                  
                  <div className={`flex items-center justify-center gap-1 text-xs ${
                    metric.trendUp ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {metric.trend}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div 
            className="lg:col-span-2"
            data-aos="fade-right"
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Project & Team Performance
                  <motion.div
                    className="ml-auto text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    LIVE
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side Stats */}
          <div className="space-y-6">
            <motion.div 
              data-aos="fade-left" 
              data-aos-delay="100"
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 relative">
                    <Doughnut 
                      data={doughnutData} 
                      options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                      }} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          <AnimatedCounter end={90} suffix="%" />
                        </div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              data-aos="fade-left" 
              data-aos-delay="200"
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Team Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Development', value: 94, color: 'bg-cyan-400' },
                    { name: 'Design', value: 87, color: 'bg-blue-400' },
                    { name: 'Testing', value: 76, color: 'bg-purple-400' },
                    { name: 'Documentation', value: 83, color: 'bg-green-400' },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-cyan-400">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
