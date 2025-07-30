
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Users, Shield, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export const CTASection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleBookDemo = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to book a demo.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically integrate with your booking system
    toast({
      title: "Demo Booked! 🎉",
      description: "We'll contact you within 24 hours to schedule your personalized demo.",
    });
    setEmail('');
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get started in under 2 minutes"
    },
    {
      icon: Users,
      title: "Unlimited Team",
      description: "No restrictions on team size"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption & compliance"
    },
    {
      icon: Rocket,
      title: "24/7 Support",
      description: "Expert help when you need it"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-cyan-400/10 via-blue-600/10 to-purple-600/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="text-foreground">Your Team's Productivity?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of teams already using JustCrea8 to deliver projects faster, 
            collaborate better, and achieve outstanding results.
          </p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-cyan-400 font-medium">Limited Time Offer</span>
                </motion.div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Start Your Free Trial Today
                </h3>
                <p className="text-muted-foreground mb-8">
                  No credit card required • Cancel anytime • Full access to all features
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto mb-8">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/50 border-cyan-400/30 focus:border-cyan-400"
                />
                <Button 
                  onClick={handleBookDemo}
                  className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white px-8 py-3 group whitespace-nowrap"
                >
                  Book Free Demo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>🔒 We respect your privacy. No spam, unsubscribe at any time.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <Card className="border-0 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center mb-4 mx-auto`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary CTA */}
        <motion.div 
          className="text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-muted-foreground mb-6">
            Need a custom solution for your enterprise?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-3"
          >
            Contact Sales Team
          </Button>
        </motion.div>

        {/* Pulsing Effect for Main CTA */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-600/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};
