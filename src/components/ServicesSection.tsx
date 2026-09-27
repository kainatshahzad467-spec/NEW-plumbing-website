import React, { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../data/content';
import { PlumbingService } from '../types';
import {
  AlertCircle,
  Droplets,
  Pipette,
  Flame,
  Bath,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Calculator,
  X,
  SlidersHorizontal,
} from 'lucide-react';

interface ServicesSectionProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  onSelectService: (service: PlumbingService) => void;
  onOpenBooking: () => void;
  onScrollToEstimator?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  searchQuery = '',
  onClearSearch,
  onSelectService,
  onOpenBooking,
  onScrollToEstimator,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'emergency', label: 'Emergency & Leaks' },
    { id: 'drain', label: 'Drain & Sewer' },
    { id: 'heaters', label: 'Heaters & Fixtures' },
    { id: 'commercial', label: 'Commercial & Code' },
  ];

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5 text-[#F95700]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#10B981]" />;
      case 'Pipette':
        return <Pipette className="w-5 h-5 text-sky-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Bath':
        return <Bath className="w-5 h-5 text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Droplets className="w-5 h-5 text-[#10B981]" />;
    }
  };

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'emergency') {
        matchesCategory = service.id === 's1';
      } else if (activeCategory === 'drain') {
        matchesCategory = service.id === 's2' || service.id === 's3';
      } else if (activeCategory === 'heaters') {
        matchesCategory = service.id === 's4' || service.id === 's5';
      } else if (activeCategory === 'commercial') {
        matchesCategory = service.id === 's6' || service.id === 's2';
      }

      // Search match from Hero query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.features.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-100/70 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-6">
          <div className="max-w-2xl flex flex-col space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-950"
              style={{ letterSpacing: '-0.02em' }}
            >
              Precision Plumbing Capabilities
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Equipped with industrial acoustic detection, thermal imaging, and high-pressure jetters.
              Zero guesswork, fixed upfront pricing.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="group inline-flex items-center justify-between gap-3 bg-slate-950 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm tracking-tight transition-all duration-200 hover:bg-slate-800 shadow-md shrink-0 active:scale-95 self-start lg:self-auto"
          >
            <span>Request Custom Service</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white group-hover:bg-[#10B981] group-hover:text-black transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Search Query Badge (if searched from Hero) */}
          {searchQuery && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-medium animate-in fade-in duration-200">
              <span>Showing results for: <strong className="text-emerald-950 font-bold">"{searchQuery}"</strong></span>
              {onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="p-0.5 rounded-full hover:bg-emerald-200 text-emerald-700 hover:text-emerald-950 transition-colors ml-1 cursor-pointer"
                  title="Clear search filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Services Bento Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 rounded-3xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getServiceIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 mb-2.5 tracking-tight group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Key specs */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom footer with pricing & book action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Starting from</span>
                    <span className="text-lg font-bold text-slate-950">{service.startingPrice}</span>
                    <span className="text-xs text-slate-500 ml-1">· ~{service.estimatedTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onScrollToEstimator && (
                      <button
                        type="button"
                        onClick={onScrollToEstimator}
                        className="p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Estimate price in calculator"
                      >
                        <Calculator className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-base font-semibold text-slate-800">No services matched "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for "leak", "heaters", "drain", or reset filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                if (onClearSearch) onClearSearch();
              }}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
