
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ExternalLink, Star, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the shopping experience with modern UI/UX principles.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "Completed",
    team: 8,
    duration: "3 months",
    rating: 4.9,
    category: "Web Development"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and intuitive banking application with biometric authentication.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["React Native", "Security", "UX"],
    status: "In Progress",
    team: 6,
    duration: "4 months",
    rating: 4.8,
    category: "Mobile App"
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Machine learning powered platform for automated content creation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Python", "AI", "Machine Learning"],
    status: "Completed",
    team: 5,
    duration: "6 months",
    rating: 5.0,
    category: "AI/ML"
  },
  {
    id: 4,
    title: "Healthcare Management System",
    description: "Comprehensive platform for patient records and appointment scheduling.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Vue.js", "Node.js", "Healthcare"],
    status: "Planning",
    team: 10,
    duration: "8 months",
    rating: 4.7,
    category: "Enterprise"
  },
  {
    id: 5,
    title: "Smart Home IoT Dashboard",
    description: "Real-time monitoring and control system for connected home devices.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["IoT", "Dashboard", "Real-time"],
    status: "In Progress",
    team: 4,
    duration: "5 months",
    rating: 4.6,
    category: "IoT"
  },
  {
    id: 6,
    title: "Educational Platform",
    description: "Interactive learning management system with gamification elements.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Education", "Gamification", "LMS"],
    status: "Completed",
    team: 7,
    duration: "4 months",
    rating: 4.8,
    category: "Education"
  }
];

export const ProjectShowcases = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProjects(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProjects(searchTerm, category);
  };

  const filterProjects = (term: string, category: string) => {
    let filtered = projects;
    
    if (category !== 'All') {
      filtered = filtered.filter(project => project.category === category);
    }
    
    if (term) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term.toLowerCase()) ||
        project.description.toLowerCase().includes(term.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
    }
    
    setFilteredProjects(filtered);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Project Showcases
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center"
          data-aos="fade-up"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm border-cyan-400/30 focus:border-cyan-400"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600" 
                  : "border-cyan-400/30 hover:bg-cyan-400/10"
                }
              >
                <Filter className="mr-2 h-3 w-3" />
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}
                      className={
                        project.status === 'Completed' 
                          ? 'bg-green-400/80 text-white' 
                          : project.status === 'In Progress'
                          ? 'bg-blue-400/80 text-white'
                          : 'bg-gray-400/80 text-white'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ opacity: 1 }}
                  >
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </motion.div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {project.team}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {project.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      {project.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            data-aos="fade-up"
          >
            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
