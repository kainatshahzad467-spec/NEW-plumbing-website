import React from 'react';
import { InstantEstimator } from '../components/InstantEstimator';
import { Calculator, ShieldCheck, DollarSign, Clock } from 'lucide-react';

interface PricingPageProps {
  onLockRate: (details: {
    serviceTitle: string;
    urgency: 'emergency' | 'sameday' | 'scheduled';
    estimatedPriceRange: string;
    propertyType: string;
    duration: string;
  }) => void;
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onLockRate, onOpenBooking }) => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Upfront Pricing Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transparent Pricing & Rate Calculator
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            No dispatch surprises or mysterious add-on fees. Select your issue below to calculate an exact quote and lock in your price before our van rolls out.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Three Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Zero Hidden Travel Fees</h4>
              <p className="text-xs text-slate-600 mt-0.5">Diagnostic dispatch is free when repair or service is authorized.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Fixed Rate Guarantee</h4>
              <p className="text-xs text-slate-600 mt-0.5">The price you lock on our calculator is the price on your final invoice.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">2-Year Craftsmanship Warranty</h4>
              <p className="text-xs text-slate-600 mt-0.5">All parts and piping retrofits are warranted against material failure.</p>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
          <InstantEstimator
            onOpenBooking={onOpenBooking}
            onLockRate={onLockRate}
          />
        </div>
      </div>
    </div>
  );
};
