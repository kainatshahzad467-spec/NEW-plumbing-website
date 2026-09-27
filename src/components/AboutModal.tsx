import React from 'react';
import { X, ShieldCheck, Award, Users, CheckCircle2, Clock, Wrench, FileCheck2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#13161c] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close about modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Plumbing Master Contractor</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              About Aquora Plumbing Solutions
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Founded on the principle that property owners deserve honest, master-level craftsmanship
              without predatory surge pricing or amateur guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>$2M Fully Bonded & Insured</span>
              </div>
              <p className="text-xs text-slate-400">
                Complete liability coverage protecting residential estates, high-rise HOAs, and commercial restaurant facilities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Wrench className="w-4 h-4" />
                <span>State Licensed Master Plumbers</span>
              </div>
              <p className="text-xs text-slate-400">
                License #48921-PL. Every lead technician possesses a minimum of 10 years verified field diagnostic experience.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Our 4 Pillars of Operational Rigor:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong className="text-white">Non-Invasive Diagnostics First:</strong> We use acoustic sensors and thermal pipe cameras before cutting into walls or digging yards.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong className="text-white">Written Fixed Pricing:</strong> You approve the exact dollar amount in writing before any tool is engaged. No hidden surprises.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong className="text-white">Clean Work Guarantee:</strong> Shoe covers, neoprene floor mats, and complete chemical-free cleanup after every service call.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong className="text-white">12-Month Ironclad Guarantee:</strong> If a repaired line backs up or leaks again, our crew returns immediately at zero expense.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Emergency Dispatch 24/7 · (800) 459-PIPE
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-lg"
            >
              Book Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
