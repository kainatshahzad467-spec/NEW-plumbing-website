import React from 'react';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServicesSection } from '../components/ServicesSection';
import { RecentProjects } from '../components/RecentProjects';
import { InstantEstimator } from '../components/InstantEstimator';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { FaqSection } from '../components/FaqSection';
import { PlumbingService, Project, Testimonial } from '../types';
import { PageRoute } from '../components/Navbar';

interface HomePageProps {
  onOpenBooking: (service?: PlumbingService | null) => void;
  onOpenEmergencyBooking: () => void;
  onLockRate: (details: {
    serviceTitle: string;
    urgency: 'emergency' | 'sameday' | 'scheduled';
    estimatedPriceRange: string;
    propertyType: string;
    duration: string;
  }) => void;
  onScrollToEstimator: () => void;
  onOpenVideo: (testimonial: Testimonial) => void;
  onOpenProject: (project: Project) => void;
  onOpenAboutModal: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenEmergencyBooking,
  onLockRate,
  onScrollToEstimator,
  onOpenVideo,
  onOpenProject,
  onOpenAboutModal,
  onNavigate,
}) => {
  return (
    <>
      {/* Hero Section */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onOpenContact={() => onNavigate('contact')}
      />

      {/* Trust & Company Highlights */}
      <WhyChooseUs
        onOpenBooking={() => onOpenBooking()}
        onOpenAboutModal={onOpenAboutModal}
      />

      {/* Services Grid with Category Tabs */}
      <ServicesSection
        onOpenBooking={() => onOpenBooking()}
        onSelectService={(service) => onOpenBooking(service)}
        onScrollToEstimator={onScrollToEstimator}
      />

      {/* Interactive Case Studies Portfolio */}
      <RecentProjects onSelectProject={onOpenProject} />

      {/* Transparent Instant Rate Estimator Calculator */}
      <InstantEstimator
        onOpenBooking={() => onOpenBooking()}
        onLockRate={onLockRate}
      />

      {/* Customer Video Reviews & Verified Testimonials */}
      <TestimonialsSection onOpenVideoModal={onOpenVideo} />

      {/* 24/7 Rapid Emergency Dispatch Banner */}
      <EmergencyBanner
        onOpenBooking={() => onOpenBooking()}
        onOpenEmergencyBooking={onOpenEmergencyBooking}
      />

      {/* Frequently Asked Questions */}
      <FaqSection onOpenBooking={() => onOpenBooking()} />
    </>
  );
};
