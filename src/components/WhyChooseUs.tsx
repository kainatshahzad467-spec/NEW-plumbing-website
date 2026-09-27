import React, { useState } from 'react';
import { ASSETS } from '../data/content';
import { Users2, WalletCards, ArrowUpRight, ShieldCheck, Check, Award, Clock } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenAboutModal: () => void;
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenAboutModal, onOpenBooking }) => {
  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[#FFFFFF] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs sm:text-sm font-normal text-slate-500 tracking-wider uppercase mb-2">
            /WHY CHOOSE US
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Why Choose Our Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            We combine expertise, reliability, and care to deliver the best experience every time.
          </p>
        </div>

        {/* Grid Layout matching Image 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top Row: 2 Cards Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Insured Professionals */}
              <div className="bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-slate-200/80 rounded-3xl p-6 sm:p-7 transition-all duration-200 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 mb-6">
                    <Users2 className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    Insured Professionals
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our plumbers are trained experts who follow rigorous industry safety and code standards.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>$2M General Liability Policy</span>
                </div>
              </div>

              {/* Card 2: Transparent Pricing */}
              <div className="bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-slate-200/80 rounded-3xl p-6 sm:p-7 transition-all duration-200 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 mb-6">
                    <WalletCards className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    Transparent Pricing
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We believe in honesty. Every service comes with upfront quotes and absolutely no hidden fees.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>Fixed-Price Guarantee</span>
                </div>
              </div>
            </div>

            {/* Bottom Card: Deep Black Full-Width Card */}
            <div className="bg-[#121212] text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-3 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Work Backed by Customer Satisfaction
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We ensure everything works perfectly and you're completely satisfied before we leave.
                  If an issue arises within 12 months, we fix it promptly at zero cost.
                </p>
              </div>

              <div className="relative z-10 pt-8 flex items-center justify-between flex-wrap gap-4">
                {/* White Pill Button: Know more about us */}
                <button
                  onClick={onOpenAboutModal}
                  className="group/btn relative inline-flex items-center justify-between gap-4 bg-white hover:bg-slate-100 text-slate-950 pl-6 pr-2 py-2 rounded-full font-semibold text-sm tracking-tight transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>Know more about us</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white group-hover/btn:bg-[#F95700] transition-colors duration-200">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </span>
                </button>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#10B981]" />
                    <span>State Licensed #48921-PL</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    <span>24/7 Availability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5): Large Technician Portrait Photo */}
          <div className="lg:col-span-5 relative">
            <div className="h-full min-h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 relative group">
              <img
                src={ASSETS.technician}
                alt="Aquora certified insured technician in hardhat and safety vest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating Badge on photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    On-Site Lead Specialist
                  </p>
                  <p className="text-base font-bold text-slate-900">
                    Carlos Mendoza
                  </p>
                  <p className="text-xs text-slate-600">
                    Master Plumber · 14 Years Exp
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-xl bg-[#111317] hover:bg-[#F95700] text-white text-xs font-semibold tracking-tight transition-colors shadow-sm"
                >
                  Request Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
