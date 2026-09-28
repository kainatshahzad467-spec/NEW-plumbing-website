import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, Clock, Wrench, FileCheck2, ArrowRight, Phone } from 'lucide-react';
import { ASSETS } from '../data/content';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Master Plumbers Since 2011</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Precision. Unmatched Trust.
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Aquora Plumbing Solutions was established to replace amateur guesswork with master-level precision, non-invasive diagnostic cameras, and transparent pricing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Story & Team Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Homeowners and Commercial Enterprises Choose Aquora
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              Plumbing problems are high-stress emergencies. A burst pipe or a malfunctioning sewage line can destroy hardwood floors, disrupt commercial kitchens, and cost thousands within hours.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              That's why every single Aquora service van is operated by state-licensed technicians equipped with high-pressure rotary hydro-jetters, thermal imaging leak cameras, and precision pipe cutters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>$2,000,000 Bonded & Insured</span>
                </div>
                <p className="text-xs text-slate-500">
                  Comprehensive umbrella liability for luxury residential estates and high-rise HOAs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>State Lic. #48921-PL</span>
                </div>
                <p className="text-xs text-slate-500">
                  Compliant with municipal building codes, backflow certifications, and EPA lead standards.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5]">
              <img
                src={ASSETS.technician}
                alt="Aquora certified master plumber on site"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    On-Site Dispatch Quality
                  </span>
                  <h4 className="text-lg font-bold">Carlos Mendoza</h4>
                  <p className="text-xs text-slate-300">Master Plumbing Inspector · 14 Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
            The Aquora Operational Guarantee
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                01
              </span>
              <h4 className="font-bold text-slate-900 text-base">Zero Surge Pricing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether you call on a Tuesday morning or a rainy 2:00 AM Sunday, our hourly and service rates remain steady and upfront.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                02
              </span>
              <h4 className="font-bold text-slate-900 text-base">Diagnostic Transparency</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We feed optical fiber cameras down your line and show you the exact live monitor footage before recommending any pipe replacements.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                03
              </span>
              <h4 className="font-bold text-slate-900 text-base">Respect For Your Home</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our technicians wear sanitized disposable boot covers, lay heavy protective neoprene runners, and leave your floors spotless.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
                04
              </span>
              <h4 className="font-bold text-slate-900 text-base">Direct Master Dispatch</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You never talk to an outsourced call center. Our dispatch desk is staffed by certified tradespeople who diagnose your issue in real time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to schedule your appointment?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Speak with a master plumber or book online in under 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm tracking-tight transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              Book Service Now
            </button>
            <a
              href="tel:18004597473"
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>(800) 459-PIPE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
