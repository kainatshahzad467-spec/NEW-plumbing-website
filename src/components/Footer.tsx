import React, { useState } from 'react';
import { AquoraLogo } from './AquoraLogo';
import { Phone, Mail, MapPin, ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronUp } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEstimator?: () => void;
  onOpenAbout?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
  onOpenClientPortal?: () => void;
  onNavigate?: (page: 'home' | 'services' | 'projects' | 'pricing' | 'about' | 'reviews' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenEstimator,
  onOpenAbout,
  onOpenLegal,
  onOpenClientPortal,
  onNavigate,
}) => {
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setSaving(true);
    try {
      // Save subscriber in Firestore
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: newsletterEmail.trim(),
        voucherCode: 'AQUORA50',
        createdAt: new Date().toISOString(),
      });
    } catch {
      // Offline fallback
    }

    setSubscribed(true);
    setSaving(false);
    addToast({
      type: 'success',
      title: '$50 Service Voucher Issued!',
      message: `Promo code AQUORA50 claimed for ${newsletterEmail}. Use during checkout or dispatch.`,
      duration: 7000,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090c] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Emergency Callout */}
          <div className="lg:col-span-2 space-y-4">
            <AquoraLogo size="lg" theme="light" />
            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Aquora Plumbing Solutions is a premier commercial and residential mechanical contractor.
              Dedicated to non-invasive diagnostics, rapid emergency dispatch, and lifetime craftsmanship.
            </p>

            <div className="pt-2">
              <a
                href="tel:18004597473"
                className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#10B981]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981] group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                    24/7 Emergency Dispatch Center
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-[#10B981] transition-colors">
                    (800) 459-PIPE / (800) 459-7473
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>State Lic. #48921-PL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#10B981]" />
                <span>$2M Bonded</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 font-normal">
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('about') : (onOpenAbout && onOpenAbout())}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  About Aquora
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Plumbing Services
                </button>
              </li>
              {onOpenClientPortal && (
                <li>
                  <button
                    onClick={onOpenClientPortal}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-left flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span>Client Portal & Live Tracker</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('projects')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Recent Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('pricing')}
                  className="text-[#F95700] hover:text-[#ff6e21] transition-colors font-medium text-left cursor-pointer"
                >
                  Rate Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('reviews')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Reviews & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact & Dispatch Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Discount Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              $50 Service Voucher
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Subscribe for seasonal maintenance alerts and receive an instant $50 digital credit on any service call.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#10B981]"
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs tracking-tight transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>{saving ? 'Claiming...' : 'Claim $50 Voucher'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 text-xs text-white space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Voucher Active: AQUORA50</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  $50 discount automatically eligible for your next scheduled service.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aquora Plumbing Solutions LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-slate-400 cursor-pointer focus:outline-none"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-slate-400 cursor-pointer focus:outline-none"
            >
              Terms of Service
            </button>
            <span className="text-emerald-500 font-medium hidden sm:inline">EPA WaterSense Partner</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Back to Top"
              aria-label="Scroll back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
