import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { RecentProjects } from './components/RecentProjects';
import { InstantEstimator } from './components/InstantEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal, BookingInitialData } from './components/BookingModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { VideoModal } from './components/VideoModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AboutModal } from './components/AboutModal';
import { LegalModal } from './components/LegalModal';
import { PlumbingService, Project, Testimonial } from './types';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [clientPortalOpen, setClientPortalOpen] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<PlumbingService | null>(null);
  const [bookingInitialData, setBookingInitialData] = useState<BookingInitialData | null>(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenBooking = (service?: PlumbingService | null) => {
    setSelectedServiceForBooking(service || null);
    setBookingInitialData(null);
    setBookingModalOpen(true);
  };

  const handleOpenEmergencyBooking = () => {
    setSelectedServiceForBooking(null);
    setBookingInitialData({
      serviceType: '24/7 Emergency Leak Resolution',
      urgency: 'emergency',
      notes: 'Priority Emergency Dispatch requested from emergency banner (~30m arrival).',
      step: 2,
    });
    setBookingModalOpen(true);
  };

  const handleLockRate = (details: {
    serviceTitle: string;
    urgency: 'emergency' | 'sameday' | 'scheduled';
    estimatedPriceRange: string;
    propertyType: string;
    duration: string;
  }) => {
    setSelectedServiceForBooking(null);
    setBookingInitialData({
      serviceType: details.serviceTitle,
      urgency: details.urgency,
      notes: `Locked Rate Quote: ${details.estimatedPriceRange} (${details.propertyType}). Estimated duration: ${details.duration}. Diagnostics & labor included.`,
      step: 3,
    });
    setBookingModalOpen(true);
  };

  const handleScrollToEstimator = () => {
    const el = document.getElementById('pricing-estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenVideo = (testimonial: Testimonial) => {
    setActiveTestimonial(testimonial);
    setVideoModalOpen(true);
  };

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
    setProjectModalOpen(true);
  };

  const handleBookServiceFromModal = (serviceTitle: string) => {
    setSelectedServiceForBooking({
      id: 'custom',
      title: serviceTitle,
      description: 'Scheduled from customer showcase',
      features: ['Upfront fixed quote guaranteed'],
      startingPrice: 'Diagnostic Included',
      estimatedTime: 'Prompt Arrival',
      iconName: 'Wrench',
    });
    setBookingInitialData(null);
    setBookingModalOpen(true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#10B981]/30 selection:text-slate-950">
        {/* Sticky Glass Navbar with Client Portal */}
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenAbout={() => setAboutModalOpen(true)}
          onOpenEstimator={handleScrollToEstimator}
          onOpenClientPortal={() => setClientPortalOpen(true)}
          currentUser={currentUser}
        />

        {/* Main Landing Page Flow */}
        <main className="flex-1">
          {/* Section 1: Hero */}
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenContact={() => handleOpenBooking()}
          />

          {/* Section 2: Why Choose Us */}
          <WhyChooseUs
            onOpenAboutModal={() => setAboutModalOpen(true)}
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* Section 3: Precision Plumbing Services */}
          <ServicesSection
            onSelectService={(service) => handleOpenBooking(service)}
            onOpenBooking={() => handleOpenBooking()}
            onScrollToEstimator={handleScrollToEstimator}
          />

          {/* Section 4: Recent Projects */}
          <RecentProjects
            onSelectProject={(project) => handleOpenProject(project)}
          />

          {/* Section 5: Transparent Instant Estimator Engine */}
          <InstantEstimator
            onOpenBooking={() => handleOpenBooking()}
            onLockRate={handleLockRate}
          />

          {/* Section 6: Testimonials */}
          <TestimonialsSection
            onOpenVideoModal={(testimonial) => handleOpenVideo(testimonial)}
          />

          {/* Section 7: 24/7 Emergency Dispatch Banner */}
          <EmergencyBanner
            onOpenBooking={() => handleOpenBooking()}
            onOpenEmergencyBooking={handleOpenEmergencyBooking}
          />

          {/* Section 8: Frequently Asked Questions */}
          <FaqSection onOpenBooking={() => handleOpenBooking()} />
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenEstimator={handleScrollToEstimator}
          onOpenAbout={() => setAboutModalOpen(true)}
          onOpenLegal={(type) => setLegalModalType(type)}
          onOpenClientPortal={() => setClientPortalOpen(true)}
        />

        {/* Interactive Modals */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedServiceForBooking(null);
            setBookingInitialData(null);
          }}
          preselectedService={selectedServiceForBooking}
          initialData={bookingInitialData}
          currentUser={currentUser}
          onOpenClientPortal={() => setClientPortalOpen(true)}
        />

        {/* Firebase Client Portal & Login Modal */}
        <ClientPortalModal
          isOpen={clientPortalOpen}
          onClose={() => setClientPortalOpen(false)}
          currentUser={currentUser}
          onOpenBooking={() => handleOpenBooking()}
        />

        <VideoModal
          testimonial={activeTestimonial}
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          onBookService={handleBookServiceFromModal}
        />

        <ProjectDetailModal
          project={activeProject}
          isOpen={projectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          onBookService={handleBookServiceFromModal}
        />

        <AboutModal
          isOpen={aboutModalOpen}
          onClose={() => setAboutModalOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />

        <LegalModal
          type={legalModalType}
          isOpen={!!legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </ToastProvider>
  );
}
