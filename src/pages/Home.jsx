
import React, { useEffect, useState } from 'react';


import { HeroSection } from '@/components/HeroSection';
import { FeatureHighlights } from '@/components/FeatureHighlights';
import { LiveAnalytics } from '@/components/LiveAnalytics';
import { TeamCarousel } from '@/components/TeamCarousel';
import { ProjectShowcases } from '@/components/ProjectShowcases';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';
import { CTASection } from '@/components/CTASection';

import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { NewsletterModal } from '@/components/NewsletterModal';
const Home = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  

    // Show newsletter modal after 5 seconds
    
    

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeatureHighlights />
      <LiveAnalytics />
      <TeamCarousel />
      <ProjectShowcases />
      <TestimonialsSlider />
      <CTASection />
      
      <ScrollToTop />
      <NewsletterModal open={showNewsletter} onOpenChange={setShowNewsletter} />
    </div>
  );
};

export default Home;
