import React from 'react';
import { ASSETS } from '../data/content';
import { PlumbingService } from '../types';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onSearchService?: (query: string) => void;
  onSelectServiceForBooking?: (service: PlumbingService) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden pt-28 pb-20 lg:py-0">
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

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Core Vertical Stack with Controlled Spacing */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Bold, Compelling Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.12] lg:whitespace-nowrap"
            style={{ letterSpacing: '-0.025em' }}
          >
            Reliable Plumbing Solutions
          </h1>

          {/* Professional Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-2xl">
            Expert plumbing services for homes and businesses. Fast, professional,
            and affordable — because leaks don't wait.
          </p>
        </div>
      </div>
    </section>
  );
};
