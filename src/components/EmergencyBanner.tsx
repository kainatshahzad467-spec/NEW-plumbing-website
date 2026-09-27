import React, { useState } from 'react';
import { Phone, Clock, ShieldCheck, MapPin, Zap, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface EmergencyBannerProps {
  onOpenBooking: () => void;
  onOpenEmergencyBooking?: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onOpenBooking,
  onOpenEmergencyBooking,
}) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('1-800-459-7473');
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Emergency Hotline Copied',
      message: '(800) 459-PIPE (1-800-459-7473) copied to clipboard.',
      duration: 3500,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="emergency-dispatch" className="relative py-14 bg-[#111317] border-t border-b border-white/10 overflow-hidden">
      {/* Subtle pulsing background glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#F95700]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#171a22] to-[#12141a] border border-white/15 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F95700]/20 text-[#F95700] border border-[#F95700]/30 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#F95700] animate-ping" />
                <span>Priority Emergency Dispatch</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                14 Mobile Service Vans Active In Metro
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.2]">
              Active Water Leak or Sewer Backup Right Now?
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Our on-call master plumbers are actively rolling across the greater metropolitan area.
              Average time from dispatch call to arrival is <strong className="text-white font-medium">28 minutes</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                No Overtime Surges
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-300" />
                Available 24/7/365
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-300" />
                All Metro Zip Codes Covered
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:18004597473"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#F95700] hover:bg-[#e04e00] text-white font-bold text-base tracking-tight shadow-xl transition-all duration-200 active:scale-95"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>(800) 459-PIPE</span>
            </a>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
              title="Copy Phone Number"
              aria-label="Copy emergency phone number"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>

            <button
              onClick={onOpenEmergencyBooking || onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm tracking-tight shadow-lg transition-all duration-200 active:scale-95"
            >
              <span>Dispatch Online (~30m)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
