import React, { useState, useEffect } from 'react';
import { AquoraLogo } from './AquoraLogo';
import { ArrowUpRight, Phone, Menu, X, ChevronDown, ShieldCheck, Clock, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';

export type PageRoute = 'home' | 'services' | 'projects' | 'pricing' | 'about' | 'reviews' | 'contact';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: () => void;
  onOpenClientPortal: () => void;
  currentUser: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenClientPortal,
  currentUser,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#0c0e12]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-5 md:py-6 bg-[#0c0e12]/60 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark / Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group transition-all duration-300 py-1 px-3 -ml-3 rounded-2xl hover:bg-white/10 cursor-pointer"
              aria-label="Aquora Plumbing Solutions Home"
            >
              <AquoraLogo size="lg" theme="light" />
            </button>

            {/* Zone 2: Multi-Page Capsule Navigation Bar */}
            <nav className="hidden lg:flex items-center bg-white/95 backdrop-blur-md rounded-full pl-6 pr-2 py-1.5 shadow-xl border border-white/40 text-slate-800 font-medium text-sm transition-all hover:bg-white">
              <div className="flex items-center gap-5 mr-4">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'home'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => handleNavClick('services')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'services'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Services
                </button>

                <button
                  onClick={() => handleNavClick('projects')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'projects'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Projects
                </button>

                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'pricing'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Pricing
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'about'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => handleNavClick('reviews')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'reviews'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Reviews & FAQ
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className={`transition-colors whitespace-nowrap cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ${
                    currentPage === 'contact'
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  Contact
                </button>
              </div>

              {/* Client Portal Button in Desktop Nav */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenClientPortal}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                    currentUser
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-950'
                  }`}
                  title="Client Portal & Service Bookings"
                >
                  {currentUser ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="truncate max-w-[85px]">
                        {currentUser.displayName?.split(' ')[0] || 'My Bookings'}
                      </span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Client Portal</span>
                    </>
                  )}
                </button>

                {/* High Contrast Pill Button: Book a Call */}
                <button
                  onClick={onOpenBooking}
                  className="group/btn relative inline-flex items-center justify-between gap-3 bg-slate-950 hover:bg-[#F95700] text-white pl-4 pr-1.5 py-1.5 rounded-full font-bold text-xs tracking-tight transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                >
                  <span className="whitespace-nowrap">Book a Free Call</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-slate-950 group-hover/btn:bg-white group-hover/btn:text-[#F95700] transition-colors duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </span>
                </button>
              </div>
            </nav>

            {/* Zone 3: Emergency Hotline & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:18004597473"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F95700] hover:bg-[#e04e00] text-white font-bold text-xs tracking-tight transition-all shadow-lg active:scale-95"
                title="Immediate 24/7 Plumber Hotline"
              >
                <Phone className="w-3.5 h-3.5 animate-bounce" />
                <span>(800) 459-PIPE</span>
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/90 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Select Page</span>
              <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                <Clock className="w-3.5 h-3.5" />
                <span>24/7 Technicians Active</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-2 text-base font-semibold">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services Catalog' },
                { id: 'projects', label: 'Recent Projects' },
                { id: 'pricing', label: 'Pricing & Estimator' },
                { id: 'about', label: 'About Us' },
                { id: 'reviews', label: 'Reviews & FAQ' },
                { id: 'contact', label: 'Contact & Dispatch' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as PageRoute)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
                    currentPage === item.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Client Portal in Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientPortal();
                }}
                className="w-full text-left p-3 rounded-2xl bg-white/10 text-emerald-400 hover:bg-white/15 transition-colors flex items-center justify-between mt-3 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{currentUser ? `Client Portal (${currentUser.displayName || currentUser.email})` : 'Client Portal & Bookings Login'}</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-slate-900 font-bold text-sm tracking-tight shadow-xl cursor-pointer"
            >
              <span>Book a Free Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="tel:18004597473"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#F95700] text-white font-bold text-sm tracking-tight shadow-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Emergency 24/7 Hotline: (800) 459-PIPE</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
