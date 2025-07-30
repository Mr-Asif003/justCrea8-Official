
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "CTO at TechFlow",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612d2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content: "JustCrea8 has revolutionized how our team collaborates. The AI-powered insights have increased our productivity by 40% and the seamless integration with our existing tools made adoption effortless.",
    rating: 5,
    project: "Enterprise Migration Project"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content: "The real-time analytics dashboard gives us unprecedented visibility into our project health. We can now predict bottlenecks before they happen and make data-driven decisions that keep us ahead of schedule.",
    rating: 5,
    project: "Mobile App Development"
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Team Lead",
    company: "Creative Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content: "What impressed me most is how intuitive the interface is. Our team was up and running within hours, not weeks. The smart task allocation feature has eliminated the guesswork in project planning.",
    rating: 5,
    project: "Brand Redesign Campaign"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Startup Founder",
    company: "NextGen Ventures",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content: "As a startup, we needed something powerful yet affordable. JustCrea8 scales with us perfectly. The team collaboration features have kept our remote team connected and productive across different time zones.",
    rating: 4,
    project: "Product Launch Strategy"
  },
  {
    id: 5,
    name: "Emily Thompson",
    role: "Operations Director",
    company: "Global Consulting",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    content: "The automation capabilities have saved us countless hours. What used to take our team days of manual coordination now happens automatically. It's like having an extra team member dedicated to project management.",
    rating: 5,
    project: "Process Optimization Initiative"
  }
];

export const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-cyan-400/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of teams who have transformed their productivity with JustCrea8.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Card className="border-0 bg-background/50 backdrop-blur-sm shadow-xl">
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center">
                      <Quote className="h-12 w-12 text-cyan-400 mx-auto mb-6 opacity-50" />
                      
                      <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed italic">
                        "{testimonials[currentIndex].content}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonials[currentIndex].rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-cyan-400/20"
                        />
                        <div className="text-left">
                          <h4 className="font-semibold text-lg text-foreground">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-muted-foreground">
                            {testimonials[currentIndex].role}
                          </p>
                          <p className="text-sm text-cyan-400 font-medium">
                            {testimonials[currentIndex].company}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Project: {testimonials[currentIndex].project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {isAutoPlaying ? '⏸️ Pause auto-play' : '▶️ Resume auto-play'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
