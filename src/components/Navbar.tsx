import React, { useState, useEffect } from 'react';
import { AquoraLogo } from './AquoraLogo';
import { ArrowUpRight, Phone, Menu, X, ChevronDown, ShieldCheck, Clock, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenEstimator?: () => void;
  onOpenAbout?: () => void;
  onOpenClientPortal: () => void;
  currentUser: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenEstimator,
  onOpenAbout,
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#0c0e12]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              className="flex items-center gap-3 group transition-all duration-300 py-1 px-3 -ml-3 rounded-2xl hover:bg-white/10 backdrop-blur-sm"
              aria-label="Aquora Plumbing Solutions Home"
            >
              <AquoraLogo size="lg" theme="light" />
            </a>

            {/* Zone 2: Floating Capsule Navigation Bar */}
            <nav className="hidden lg:flex items-center bg-white/95 backdrop-blur-md rounded-full pl-6 pr-2 py-1.5 shadow-xl border border-white/40 text-slate-800 font-medium text-sm transition-all hover:bg-white">
              <div className="flex items-center gap-6 mr-5">
                <a
                  href="#services"
                  className="text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap"
                >
                  Services
                </a>
                <a
                  href="#projects"
                  className="text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap"
                >
                  Projects
                </a>
                <a
                  href="#pricing-estimator"
                  onClick={(e) => {
                    if (onOpenEstimator) {
                      e.preventDefault();
                      onOpenEstimator();
                    }
                  }}
                  className="text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap"
                >
                  Pricing
                </a>
                <a
                  href="#why-choose-us"
                  className="text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap"
                >
                  About
                </a>

                {/* Dropdown Menu: All Page ▾ */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                    className="flex items-center gap-1 text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap focus:outline-none"
                  >
                    <span>All Page</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2.5 z-50 text-slate-800 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                      <a
                        href="#testimonials"
                        className="block px-4 py-2 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                      >
                        Client Reviews
                      </a>
                      <a
                        href="#emergency-dispatch"
                        className="block px-4 py-2 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                      >
                        24/7 Emergency Dispatch
                      </a>
                      <a
                        href="#faq"
                        className="block px-4 py-2 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                      >
                        Questions & Answers
                      </a>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={onOpenClientPortal}
                        className="w-full text-left px-4 py-2 text-emerald-700 hover:bg-emerald-50 font-semibold transition-colors flex items-center justify-between"
                      >
                        <span>Client Portal / Login</span>
                        <UserIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={onOpenEstimator}
                        className="w-full text-left px-4 py-2 text-[#F95700] hover:bg-orange-50 font-semibold transition-colors"
                      >
                        Instant Cost Estimator →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Portal Button in Desktop Nav */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenClientPortal}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
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
                  className="group relative inline-flex items-center justify-between gap-3 bg-[#111317] hover:bg-black text-white pl-5 pr-1.5 py-1.5 rounded-full font-medium text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-md active:scale-95"
                >
                  <span className="whitespace-nowrap">Book a Call</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/15 group-hover:bg-[#10B981] group-hover:text-black transition-colors duration-200">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </div>
            </nav>

            {/* Mobile Actions Zone */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={onOpenClientPortal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-md"
                aria-label="Client Portal"
              >
                <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentUser ? 'Portal' : 'Login'}</span>
              </button>

              <a
                href="tel:18004597473"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#F95700] text-white shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call Now</span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/10 text-white border border-white/15 backdrop-blur-md focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/85 backdrop-blur-lg pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400">Navigation</span>
              <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                <Clock className="w-3.5 h-3.5" />
                <span>24/7 Technicians On Duty</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-2 text-base font-medium">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                Services
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                Projects
              </a>
              <a
                href="#pricing-estimator"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEstimator) onOpenEstimator();
                }}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#why-choose-us"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                About
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                Customer Reviews
              </a>

              {/* Client Portal in Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientPortal();
                }}
                className="w-full text-left p-2.5 rounded-xl bg-white/10 text-emerald-400 hover:bg-white/15 transition-colors flex items-center justify-between mt-2"
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
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-slate-900 font-bold text-sm tracking-tight shadow-xl"
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
