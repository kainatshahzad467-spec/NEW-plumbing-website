import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Navbar, PageRoute } from './components/Navbar';
import { Footer } from './components/Footer';
import { NewsletterSubscription } from './components/NewsletterSubscription';

// Multi-Page Views
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsFaqPage } from './pages/ReviewsFaqPage';
import { ContactPage } from './pages/ContactPage';

// Modals
import { BookingModal, BookingInitialData } from './components/BookingModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { VideoModal } from './components/VideoModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AboutModal } from './components/AboutModal';
import { LegalModal } from './components/LegalModal';
import { PlumbingService, Project, Testimonial } from './types';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
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

  // Sync with browser history / hash if user refreshes or shares URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageRoute[] = ['home', 'services', 'projects', 'pricing', 'about', 'reviews', 'contact'];
      if (validPages.includes(hash as PageRoute)) {
        setCurrentPage(hash as PageRoute);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      description: 'Requested from project breakdown modal.',
      features: ['Priority dispatch', 'Certified master plumber'],
      startingPrice: 'Quote on inspect',
      estimatedTime: '1-3 hrs',
      iconName: 'Wrench',
    });
    setBookingInitialData(null);
    setBookingModalOpen(true);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#07090d] text-slate-100 flex flex-col font-sans selection:bg-[#10B981] selection:text-black">
        {/* Persistent Multi-Page Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
          onOpenClientPortal={() => setClientPortalOpen(true)}
          currentUser={currentUser}
        />

        {/* Dynamic Multi-Page Router View */}
        <main className="flex-grow">
          {currentPage === 'home' && (
            <HomePage
              onOpenBooking={handleOpenBooking}
              onOpenEmergencyBooking={handleOpenEmergencyBooking}
              onLockRate={handleLockRate}
              onScrollToEstimator={() => handleNavigate('pricing')}
              onOpenVideo={handleOpenVideo}
              onOpenProject={handleOpenProject}
              onOpenAboutModal={() => handleNavigate('about')}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onOpenBooking={handleOpenBooking}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'projects' && (
            <ProjectsPage
              onOpenProjectModal={handleOpenProject}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'pricing' && (
            <PricingPage
              onLockRate={handleLockRate}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'reviews' && (
            <ReviewsFaqPage
              onOpenVideoModal={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onOpenBooking={() => handleOpenBooking()}
              onOpenEmergencyBooking={handleOpenEmergencyBooking}
            />
          )}

          {/* Lead Generation & Seasonal Preventative Maintenance Subscription */}
          <NewsletterSubscription onOpenBooking={() => handleOpenBooking()} />
        </main>

        {/* Multi-Page Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenEstimator={() => handleNavigate('pricing')}
          onOpenAbout={() => handleNavigate('about')}
          onOpenLegal={(type) => setLegalModalType(type)}
          onOpenClientPortal={() => setClientPortalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Interactive Modals (Globally accessible on all pages) */}
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
