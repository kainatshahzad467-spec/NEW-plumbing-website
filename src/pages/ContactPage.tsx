import React from 'react';
import { Phone, Mail, Clock, MapPin, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
  onOpenEmergencyBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onOpenEmergencyBooking }) => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>24/7 Live Master Dispatch Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact & Immediate Dispatch
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Need urgent emergency service or have a scheduled remodel in mind? Our dispatch engineers are active 24/7/365.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Emergency Hotline Card */}
          <div className="bg-[#12151b] text-white p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#F95700]/20 text-[#F95700] text-xs font-bold border border-[#F95700]/30 inline-block">
                🚨 Immediate 30-Min Rapid Response
              </span>
              <h3 className="text-xl font-bold">24/7 Emergency Line</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                For active pipe ruptures, gas leaks, sewage backups, or commercial flooding. Call our priority dispatch center directly.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:18004597473"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#F95700] hover:bg-[#e04e00] text-white font-bold text-center text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call (800) 459-PIPE</span>
              </a>

              <button
                onClick={onOpenEmergencyBooking}
                className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-tight transition-all border border-white/15 cursor-pointer"
              >
                Request Priority Emergency Dispatch
              </button>
            </div>
          </div>

          {/* Standard Scheduling */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-block">
                Standard Appointments
              </span>
              <h3 className="text-xl font-bold text-slate-900">Online Service Booking</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Schedule drain cleaning, water heater maintenance, fixture installations, or annual safety backflow inspections.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-sm tracking-tight transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Service Online (Free Consult)
            </button>
          </div>

          {/* Regional Dispatch Office */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</span>
              <h3 className="text-xl font-bold text-slate-900">Aquora Dispatch Hub</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>742 Evergreen Mechanical Way, Suite 400<br />Metro Plumbing District</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>dispatch@aquoraplumbing.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Desk Hours: 24/7 / 365 Days</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>State Contractor License #48921-PL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>EPA Certified & Backflow Certified #9921</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
