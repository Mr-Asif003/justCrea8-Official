
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckSquare, FolderOpen, Calendar, Users, BarChart3, ArrowRight, Sparkles,Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Brain,
    title: "AI Project Assistant",
    description: "Intelligent suggestions, automated task generation, and smart resource allocation powered by advanced AI.",
    gradient: "from-purple-400 to-pink-600",
    details: "Get 40% faster project completion with AI-powered insights and recommendations.",
    interactive: true
  },
  {
    icon: CheckSquare,
    title: "Smart Task Manager",
    description: "Real-time updates, drag-and-drop interfaces, and collaborative task management with instant notifications.",
    gradient: "from-cyan-400 to-blue-600",
    details: "Kanban boards, Gantt charts, and timeline views all in one place.",
    interactive: true
  },
  {
    icon: FolderOpen,
    title: "Document & Resource Hub",
    description: "Centralized storage, version control, and seamless integration with your favorite tools and platforms.",
    gradient: "from-green-400 to-emerald-600",
    details: "Connect with 50+ tools including Slack, GitHub, Figma, and more.",
    interactive: true
  },
  {
    icon: Calendar,
    title: "Smart Roadmap & Timeline",
    description: "Interactive Gantt charts, milestone tracking, and automated timeline adjustments based on progress.",
    gradient: "from-orange-400 to-red-600",
    details: "Predictive analytics help prevent delays before they happen.",
    interactive: true
  },
  {
    icon: Users,
    title: "Team Roles & Insights",
    description: "Contributor analytics, role-based permissions, and performance insights to optimize team dynamics.",
    gradient: "from-indigo-400 to-purple-600",
    details: "Track productivity patterns and optimize team performance.",
    interactive: true
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time dashboards, predictive analytics, and custom reporting to drive data-informed decisions.",
    gradient: "from-teal-400 to-cyan-600",
    details: "Generate custom reports and export data in multiple formats.",
    interactive: true
  },
  {
    icon: Workflow,
    title: "Personalized Todo",
    description: "Automate repetitive tasks, set up custom workflows, and integrate with third-party services for seamless operations.",
    gradient: "from-yellow-400 to-amber-600",
    details: "Create multi-step workflows that trigger actions across your tools.",
    interactive: true
  },
  {
    icon: Sparkles,
    title: "Personal Notes and Projects Notes",
    description: "Tailor your notes and projects with themes, layouts, and personalized dashboards to suit your workflow.",
    gradient: "from-pink-400 to-red-600",
    details: "Choose from a variety of themes or create your own for a unique look.",
    interactive: true
  },
];

export const FeatureHighlights = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools designed to streamline your workflow and boost team productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:border hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 relative overflow-hidden">
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))`
                  }}
                />
                
                <CardHeader className="relative z-10">
                  <motion.div 
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-xl font-semibold group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                    {feature.title}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredFeature === index ? 'auto' : 0, 
                      opacity: hoveredFeature === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-3 border-t border-cyan-400/20">
                      <p className="text-sm text-cyan-400 font-medium">
                        {feature.details}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>

                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)`,
                    padding: '1px'
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <motion.div
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 border border-cyan-400/30 cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-cyan-400 font-medium text-lg">
              🚀 Explore All Features
            </span>
            <ArrowRight className="ml-2 h-5 w-5 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
