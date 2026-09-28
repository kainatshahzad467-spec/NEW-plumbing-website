import React, { useState, useMemo } from 'react';
import { FAQS } from '../data/content';
import { ChevronDown, HelpCircle, Search, Sparkles, X } from 'lucide-react';

interface FaqSectionProps {
  onOpenBooking?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return FAQS;
    const q = faqSearch.toLowerCase().trim();
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [faqSearch]);

  return (
    <section id="faq" className="py-20 bg-slate-100/70 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparency & Policies</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950 mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light max-w-xl mx-auto">
            Everything you need to know about our response times, licensing, upfront pricing, and ironclad 12-month warranties.
          </p>

          {/* Interactive Search Bar for FAQs */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. warranty, fee, response time)..."
              value={faqSearch}
              onChange={(e) => {
                setFaqSearch(e.target.value);
                setOpenIdx(0);
              }}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
            {faqSearch && (
              <button
                type="button"
                onClick={() => setFaqSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear FAQ search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FAQs List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-semibold text-slate-950 tracking-tight pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 font-light leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-800">No questions matched "{faqSearch}"</p>
            <button
              onClick={() => setFaqSearch('')}
              className="mt-3 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold"
            >
              Show all FAQs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
