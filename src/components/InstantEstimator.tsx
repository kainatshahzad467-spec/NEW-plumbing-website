import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, Info, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface InstantEstimatorProps {
  onOpenBooking: () => void;
  onLockRate?: (details: {
    serviceTitle: string;
    urgency: 'emergency' | 'sameday' | 'scheduled';
    estimatedPriceRange: string;
    propertyType: string;
    duration: string;
  }) => void;
}

export const InstantEstimator: React.FC<InstantEstimatorProps> = ({ onOpenBooking, onLockRate }) => {
  const { addToast } = useToast();
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [issueType, setIssueType] = useState<string>('drain');
  const [urgency, setUrgency] = useState<'standard' | 'emergency'>('standard');
  const [copied, setCopied] = useState(false);

  const basePrices: Record<string, { base: number; label: string; fullService: string; time: string }> = {
    drain: {
      base: 195,
      label: 'Clogged Drain / Hydro-Jet',
      fullService: 'High-Pressure Hydro-Jet Drain Clearing',
      time: '1 - 2 Hours',
    },
    leak: {
      base: 240,
      label: 'Burst Pipe / Active Leak',
      fullService: '24/7 Emergency Leak Resolution',
      time: '1 - 3 Hours',
    },
    heater: {
      base: 450,
      label: 'Water Heater Diagnostic',
      fullService: 'High-Efficiency Tankless Water Heaters',
      time: '2 - 4 Hours',
    },
    fixture: {
      base: 175,
      label: 'Luxury Faucet / Fixtures',
      fullService: 'High-End Bathroom & Fixture Trim',
      time: '1 - 2 Hours',
    },
    sewer: {
      base: 850,
      label: 'Sewer Line Video / Relining',
      fullService: 'Trenchless Pipe Relining (CIPP)',
      time: '3 - 5 Hours',
    },
  };

  const currentIssue = basePrices[issueType];
  const propertyMultiplier = propertyType === 'commercial' ? 1.4 : 1.0;
  const urgencyMultiplier = urgency === 'emergency' ? 1.25 : 1.0;

  const estimatedMin = Math.round(currentIssue.base * propertyMultiplier * urgencyMultiplier);
  const estimatedMax = Math.round(estimatedMin * 1.35);
  const priceRangeString = `$${estimatedMin} – $${estimatedMax}`;

  const handleLockInRate = () => {
    if (onLockRate) {
      onLockRate({
        serviceTitle: currentIssue.fullService,
        urgency: urgency === 'emergency' ? 'emergency' : 'sameday',
        estimatedPriceRange: priceRangeString,
        propertyType: propertyType === 'commercial' ? 'Commercial / Hospitality' : 'Residential Home',
        duration: currentIssue.time,
      });
    } else {
      onOpenBooking();
    }
  };

  const handleCopyQuote = () => {
    const quoteSummary = `Aquora Quote Estimate: ${currentIssue.fullService} (${propertyType}) - ${priceRangeString}. Est duration: ${currentIssue.time}. Guaranteed fixed cap.`;
    navigator.clipboard.writeText(quoteSummary);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Quote Summary Copied',
      message: `Locked quote of ${priceRangeString} copied to clipboard!`,
      duration: 3500,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="pricing-estimator" className="py-20 bg-slate-50 text-slate-900 relative border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Upfront Flat-Rate Calculator</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950"
              style={{ letterSpacing: '-0.02em' }}
            >
              Estimate Your Project Cost
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              No hidden trip surcharges. Our transparent pricing reflects standard master plumber hourly rates,
              certified OEM parts, and warranty coverage. What you see is our guaranteed estimate range.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Written fixed quotes before work commences</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes 12-month parts and labor guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Master plumber dispatch with mobile warehouse inventory</span>
              </div>
            </div>

            {/* Quick Quote Share action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Quote Copied to Clipboard!' : 'Copy Itemized Quote'}</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative">
            <div className="space-y-6">
              {/* Option 1: Property Type */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    1. Property Type
                  </label>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {propertyType === 'commercial' ? 'Commercial Code Tier' : 'Standard Residential'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPropertyType('residential')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      propertyType === 'residential'
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Residential Home / Condo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPropertyType('commercial')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      propertyType === 'commercial'
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Commercial / Hospitality
                  </button>
                </div>
              </div>

              {/* Option 2: Service Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  2. Select Issue Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(basePrices).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIssueType(key)}
                      className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                        issueType === key
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{val.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Urgency */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  3. Service Timeline
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      urgency === 'standard'
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Standard Scheduled
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('emergency')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      urgency === 'emergency'
                        ? 'bg-[#F95700] text-white border-[#F95700] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    24/7 Priority (~30 Mins)
                  </button>
                </div>
              </div>

              {/* Result Preview Box */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Estimated Investment</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {priceRangeString}
                    </span>
                    <span className="text-xs text-[#10B981] font-semibold">Fixed Cap</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Est. Duration: {currentIssue.time} · Includes Diagnostics & Labor
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLockInRate}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm tracking-tight transition-all shadow-lg active:scale-95 shrink-0"
                >
                  <span>Lock in this Rate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
