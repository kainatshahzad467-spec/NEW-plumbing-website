import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import { PlumbingService } from '../types';
import { PageRoute } from '../components/Navbar';
import {
  Wrench,
  CheckCircle2,
  Search,
  ArrowUpRight,
  Calculator,
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (service?: PlumbingService | null) => void;
  onNavigate: (page: PageRoute) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'emergency' | 'drain' | 'water_heaters' | 'commercial'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'emergency') return service.badge?.toLowerCase().includes('emergency') || service.title.toLowerCase().includes('leak');
    if (activeCategory === 'drain') return service.title.toLowerCase().includes('drain') || service.title.toLowerCase().includes('sewer');
    if (activeCategory === 'water_heaters') return service.title.toLowerCase().includes('heater');
    if (activeCategory === 'commercial') return service.title.toLowerCase().includes('commercial') || service.title.toLowerCase().includes('backflow');
    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Master Plumbing Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Comprehensive Plumbing Services
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            From residential emergency burst pipe repairs to high-capacity commercial tankless installations. Transparent pricing with zero surprise charges.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g., drain, heater, leak, commercial)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-400 focus:bg-white/15 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'emergency', label: '🚨 Emergency Rapid Dispatch' },
            { id: 'drain', label: 'Drains & Hydro-Jetting' },
            { id: 'water_heaters', label: 'Water Heaters & Boilers' },
            { id: 'commercial', label: 'Commercial & Municipal Code' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wrench className="w-6 h-6 text-emerald-600" />
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                    Starting from
                  </span>
                  <span className="text-lg font-bold text-slate-950">{service.startingPrice}</span>
                  <span className="text-xs text-slate-500 ml-1">· ~{service.estimatedTime}</span>
                </div>

                <button
                  onClick={() => onOpenBooking(service)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs tracking-tight transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Estimator Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Need an instant transparent quote?
            </span>
            <h3 className="text-2xl font-bold">Use Our Live Instant Price Estimator</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Calculate repair costs for drains, tankless heaters, burst pipes, and bathroom renovations in seconds.
            </p>
          </div>
          <button
            onClick={() => onNavigate('pricing')}
            className="px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#0ea371] text-slate-950 font-bold text-sm tracking-tight transition-all shadow-lg active:scale-95 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Price Estimator →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
