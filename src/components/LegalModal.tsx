import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, isOpen, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#13161c] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Consumer Privacy & Data Protection</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">Privacy Policy</h3>
            <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At Aquora Plumbing Solutions LLC, we respect your privacy. This policy explains how we collect, use, and protect your information when you request plumbing services, instant estimates, or emergency dispatches.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">1. Information We Collect</h4>
              <p>
                We only collect information necessary to perform plumbing services: name, phone number, physical property address, and service notes provided through our booking and estimator engines.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">2. How We Use Your Data</h4>
              <p>
                Your information is used strictly to dispatch technicians, provide accurate estimates, and communicate emergency arrival times. We never sell, rent, or trade your personal data to third-party marketers.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">3. Security</h4>
              <p>
                All data transmission between your browser and our dispatch portal is secured via industry-standard TLS encryption.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Contractor Service Agreement</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">Terms of Service & Guarantees</h3>
            <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Welcome to Aquora Plumbing Solutions. By scheduling an emergency dispatch or estimating work through our platform, you agree to the following master service conditions:
              </p>
              <h4 className="text-sm font-bold text-white pt-2">1. Transparent Pricing & Guarantees</h4>
              <p>
                All estimates generated through our transparency calculator are binding ranges based on customer-provided job specifications. Exact scopes are verified by a licensed technician on-site prior to any work starting.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">2. Emergency Dispatch Protocol</h4>
              <p>
                Emergency priority dispatches aim for arrival within 28 minutes within designated metropolitan coverage areas. Travel times may vary due to extreme weather or traffic anomalies.
              </p>
              <h4 className="text-sm font-bold text-white pt-2">3. Warranty & Workmanship</h4>
              <p>
                All qualified installations carry a minimum 1-year labor warranty and manufacturer parts warranties. Trenchless CIPP relining carries a 50-year structural warranty.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
