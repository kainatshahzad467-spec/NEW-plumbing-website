import React, { useState } from 'react';
import { FAQS, TESTIMONIALS_DATA } from '../data/content';
import { Testimonial } from '../types';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageSquare,
  Sparkles,
  Play,
  Star,
  CheckCircle2,
  Clock,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';

interface ReviewsFaqPageProps {
  onOpenVideoModal: (testimonial: Testimonial) => void;
  onOpenBooking: () => void;
}

export const ReviewsFaqPage: React.FC<ReviewsFaqPageProps> = ({ onOpenVideoModal, onOpenBooking }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'video' | 'residential' | 'commercial'>('all');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const filteredReviews = TESTIMONIALS_DATA.filter((item) => {
    if (filter === 'video') return !!item.videoDuration;
    if (filter === 'residential') return item.role.toLowerCase().includes('homeowner') || item.role.toLowerCase().includes('resident');
    if (filter === 'commercial') return item.role.toLowerCase().includes('commercial') || item.role.toLowerCase().includes('restaurant') || item.role.toLowerCase().includes('developer');
    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0b0e14] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-emerald-400" />
            <span>4.98/5 Stars Across 420+ Verified Jobs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Client Reviews & Common Questions
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Hear straight from property managers and homeowners whose homes we restored, and get answers to all your plumbing warranty and pricing questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Reviews Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Customer Experiences</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Real video and written testimonials from verified service visits.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'video', label: '🎥 Video Case Studies' },
                { id: 'residential', label: 'Residential' },
                { id: 'commercial', label: 'Commercial' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    filter === f.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    {rev.videoDuration && (
                      <button
                        onClick={() => onOpenVideoModal(rev)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <Play className="w-3 h-3 fill-emerald-600" />
                        <span>Watch Video ({rev.videoDuration})</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6 font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                    <p className="text-[11px] text-slate-500">{rev.role}</p>
                    <span className="text-[10px] text-emerald-600 font-medium block">{rev.serviceUsed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding emergency arrival, warranties, permits, and payment options.
            </p>

            <div className="relative max-w-md mx-auto pt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. warranty, arrival, weekend)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
