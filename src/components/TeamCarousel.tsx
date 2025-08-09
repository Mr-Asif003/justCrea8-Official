
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Github, Linkedin, Instagram, MapPin, Calendar, Type } from 'lucide-react';
import admin from '@/assets/images/admin.png'; // Placeholder for team member av
import TypeWriterEffect from 'react-typewriter-effect';

const teamMembers = [
  {
    name: "Asif Khan",
    role: "CEO & Developer",
    avatar: `${admin}`,
    skills: ["Leadership","Development", "Agile", "Strategy","Innovation","Management"],
    projects: 24,
    rating: 4.9,
    experience: "5+ years",
    location: "Bhopal,Madhya Pradesh,India",
    bio: 'I am a B.Tech CSE student (graduating in 2027) with a strong passion for full-stack web and mobile app development, as well as AI/ML.',
    social: {
      github: "https://github.com/Mr-Asif003",
      linkedin: "https://www.linkedin.com/in/asif-khan003",
      insta: "https://www.instagram.com/_.mr_asif_"
    },
    achievements: ["Top Performer 2023", "Team Leadership Award"]
  },
  // {
  //   name: "Marcus Rodriguez",
  //   role: "Lead Developer",
  //   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  //   skills: ["React", "Node.js", "Architecture"],
  //   projects: 18,
  //   rating: 4.8,
  //   experience: "7+ years",
  //   location: "New York, NY",
  //   bio: "Full-stack developer with expertise in modern web technologies and system design.",
  //   social: {
  //     github: "#",
  //     linkedin: "#",
  //     insta: "#"
  //   },
  //   achievements: ["Tech Innovation Award", "Open Source Contributor"]
  // },
  // {
  //   name: "Emily Watson",
  //   role: "UX Designer",
  //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  //   skills: ["Figma", "Research", "Prototyping"],
  //   projects: 31,
  //   rating: 5.0,
  //   experience: "4+ years",
  //   location: "Austin, TX",
  //   bio: "Creative designer focused on user-centered design and innovative solutions.",
  //   social: {
  //     github: "#",
  //     linkedin: "#",
  //     insta: "#"
  //   },
  //   achievements: ["Design Excellence Award", "User Experience Champion"]
  // },
  // {
  //   name: "David Kim",
  //   role: "DevOps Engineer",
  //   avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  //   skills: ["AWS", "Docker", "CI/CD"],
  //   projects: 15,
  //   rating: 4.7,
  //   experience: "6+ years",
  //   location: "Seattle, WA",
  //   bio: "Infrastructure specialist passionate about automation and scalable systems.",
  //   social: {
  //     github: "#",
  //     linkedin: "#",
  //     insta: "#"
  //   },
  //   achievements: ["Infrastructure Excellence", "Automation Pioneer"]
  // },
  // {
  //   name: "Lisa Thompson",
  //   role: "Data Analyst",
  //   avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  //   skills: ["Python", "Analytics", "Visualization"],
  //   projects: 22,
  //   rating: 4.9,
  //   experience: "5+ years",
  //   location: "Chicago, IL",
  //   bio: "Data-driven professional turning complex data into actionable insights.",
  //   social: {
  //     github: "#",
  //     linkedin: "#",
  //     insta: "#"
  //   },
  //   achievements: ["Analytics Innovation", "Data Science Leader"]
  // },
  // {
  //   name: "Alex Johnson",
  //   role: "QA Engineer",
  //   avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  //   skills: ["Automation", "Testing", "Quality"],
  //   projects: 28,
  //   rating: 4.8,
  //   experience: "4+ years",
  //   location: "Denver, CO",
  //   bio: "Quality assurance expert ensuring perfect user experiences through comprehensive testing.",
  //   social: {
  //     github: "#",
  //     linkedin: "#",
  //     insta: "#"
  //   },
  //   achievements: ["Quality Champion", "Test Automation Expert"]
  // }
];

export const TeamCarousel = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section id="teams" className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Meet the visionary behind this project
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Talented professionals working together to deliver exceptional results and drive innovation.
          </p>
        </motion.div>

        <div className=" lg:grid-cols-1 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div 
                      className="relative mb-4"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedMember(index)}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-cyan-400/20 group-hover:ring-cyan-400/50 transition-all duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-background animate-pulse"></div>
                      
                      {/* Floating status */}
                      <motion.div
                        className="absolute -top-2 -right-2 bg-cyan-400 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredMember === index ? 1 : 0 }}
                      >
                        Online
                      </motion.div>
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-2">{member.role}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3 w-3" />
                      {member.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.skills.slice(0, 3).map((skill) => (
                        <motion.div key={skill} whileHover={{ scale: 1.1 }}>
                          <Badge 
                            variant="secondary"
                            className="bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <div className='px-2 mb-4 md:px-32'>
                      <TypeWriterEffect
  textStyle={{
    fontSize: '14px',
    color: 'grey',
    fontFamily: 'serif',
    whiteSpace: 'pre-wrap', // ensures multi-line support if bio is long
  }}
  startDelay={200}
  cursorColor="white"
  
  text={member.bio}
/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <div className="text-2xl font-bold text-cyan-400">{member.projects}</div>
                        <div className="text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                          {member.rating}
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                        <div className="text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <motion.div 
                      className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 10 }}
                      animate={{ y: hoveredMember === index ? 0 : 10 }}
                    >
                      
                      <Button size="sm" onClick={() => window.open(member.social.github, "_blank")} variant="ghost" className="h-8 w-8 p-0 hover:bg-cyan-400/10">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => window.open(member.social.linkedin, "_blank")} variant="ghost" className="h-8 w-8 p-0 hover:bg-cyan-400/10">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => window.open(member.social.insta, "_blank")} variant="ghost" className="h-8 w-8 p-0 hover:bg-cyan-400/10">
                        <Instagram color='pink' size={20} className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
                
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Member Detail Modal */}
        <AnimatePresence>
          {selectedMember !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                className="bg-background rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <img
                    src={teamMembers[selectedMember].avatar}
                    alt={teamMembers[selectedMember].name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-cyan-400/20"
                  />
                  <h3 className="text-2xl font-bold mb-2">{teamMembers[selectedMember].name}</h3>
                  <p className="text-cyan-400 mb-4">{teamMembers[selectedMember].role}</p>
                  <p className="text-muted-foreground mb-6">{teamMembers[selectedMember].bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold">{teamMembers[selectedMember].experience}</div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{teamMembers[selectedMember].projects}</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {teamMembers[selectedMember].achievements.map((achievement, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-cyan-400/10 text-cyan-400">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => setSelectedMember(null)} className="w-full">
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 border border-cyan-400/30 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-cyan-400 font-medium">
              👥 Join our growing team - We're hiring!
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
