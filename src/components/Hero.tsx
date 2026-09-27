import React from 'react';
import { ASSETS } from '../data/content';
import { ArrowUpRight, Star, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';
import { PlumbingService } from '../types';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onSearchService?: (query: string) => void;
  onSelectServiceForBooking?: (service: PlumbingService) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenContact,
}) => {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 lg:py-0">
      {/* Background Image with Controlled Dark Luxury Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="Modern architectural plumbing installation with precision fixtures"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />
        {/* Measured dark gradient scrim for WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-transparent to-black/45" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Core Vertical Stack with Controlled Spacing */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Subtle Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 Master Plumber Dispatch</span>
          </div>

          {/* Bold, Compelling Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.12]"
            style={{ letterSpacing: '-0.025em' }}
          >
            Reliable Plumbing Solutions
          </h1>

          {/* Professional Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl">
            Expert plumbing services for homes and businesses. Fast, professional,
            and affordable — because leaks don't wait.
          </p>

          {/* Primary Action Buttons Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Vibrant Pill-Shaped Book a Free Call Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-4 bg-white hover:bg-slate-100 text-slate-950 pl-7 pr-2.5 py-2.5 rounded-full font-semibold text-sm sm:text-base tracking-tight transition-all duration-200 shadow-2xl hover:shadow-white/20 active:scale-95 cursor-pointer"
            >
              <span>Book a Free Call</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white group-hover:bg-[#F95700] transition-colors duration-200">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Glassmorphic 24/7 Hotline Card */}
            <a
              href="tel:18004597473"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white/95 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-lg group cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
              <span>24/7 Hotline: (800) 459-PIPE</span>
            </a>
          </div>

          {/* Trust Indicators neatly placed below the CTA buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-amber-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium text-slate-200 ml-1">
                500+ Verified Reviews
              </span>
            </div>

            <span className="text-slate-500 font-bold hidden sm:inline">·</span>

            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">Licensed Master Plumbers</span>
            </div>

            <span className="text-slate-500 font-bold hidden sm:inline">·</span>

            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Upfront Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
